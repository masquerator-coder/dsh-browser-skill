import Schema from "@deepseek-ai/schemastery";
import "@deepseek-ai/dsh-tools";
import { ChildProcess, SpawnOptionsWithoutStdio } from "node:child_process";
import { Context } from "@deepseek-ai/cordis";
//#region src/runner.d.ts
/** A failed `bsk` invocation (non-zero exit, timeout, or spawn failure). */
declare class BskError extends Error {
  readonly code?: string;
  readonly hint?: string;
  readonly exitCode?: number | null;
  readonly timedOut: boolean;
  constructor(message: string, options?: {
    code?: string;
    hint?: string;
    exitCode?: number | null;
    timedOut?: boolean;
  });
}
interface BskRunResult {
  /** Process exit code, or null when killed by a signal / never started. */
  code: number | null;
  stdout: string;
  stderr: string;
  timedOut: boolean;
  aborted: boolean;
}
interface BskRunOptions {
  signal?: AbortSignal;
  /** Execution timeout; after exit, output collection has a separate 2s limit. */
  timeoutMs?: number;
  /** Opaque routing tag (e.g. a session id) enabling per-tag kills. */
  tag?: string;
}
/** Minimal spawn signature so tests can substitute a fake child process. */
type SpawnImpl = (command: string, args: string[], options?: SpawnOptionsWithoutStdio) => ChildProcess;
interface BskRunner {
  /** Run `bsk <args...> --json` and collect its output. */
  run(args: string[], options?: BskRunOptions): Promise<BskRunResult>;
  /** Kill every still-running child (used when the plugin unloads). */
  killAll(): void;
  /** Kill running children carrying this tag; returns the number matched. */
  killFor(tag: string): number;
  /**
   * Declare that this plugin hosts (or confirmed) the daemon, which suppresses
   * `BSK_AUTO_START` on every later command. See ./daemon-host.
   */
  setHostedDaemon(hosted: boolean): void;
}
declare function createBskRunner(bskPath: string, spawnImpl?: SpawnImpl): BskRunner;
//#endregion
//#region src/start-journal.d.ts
interface StartRecord {
  requestId: string;
  owners: string[];
  startedAtMs: number;
  cleanup: boolean;
  /** An explicit stop stays retryable until its caller acknowledges completion. */
  stop?: "pending" | "closed";
  /** A failed implicit waiter advances this revision; other callers cannot consume its retry. */
  defaultStopRevision?: number;
  session?: {
    sessionId: string;
    browserInstanceId: string;
  };
}
interface StartJournal {
  records: Map<string, StartRecord>;
  save(): void;
  release(): void;
}
//#endregion
//#region src/queue.d.ts
/**
 * Per-key FIFO executor. The bsk daemon serializes commands per session (a
 * second command while one is unfinished is rejected), so every plugin
 * command — model-facing tool calls AND observation captures — funnels
 * through one queue per session. A queued task rejects early if its abort
 * signal fires before it starts; once running, cancellation is owned by the
 * task's own signal handling (the runner kills the child).
 */
declare class KeyedExecutor {
  private readonly tails;
  /** Run `fn` after every previously queued task for `key` settled. */
  run<T>(key: string, fn: () => Promise<T>, signal?: AbortSignal): Promise<T>;
}
//#endregion
//#region src/sessions.d.ts
/**
 * Tracks the bsk sessions this plugin created and the "current" session
 * pointer used when a tool call omits its optional `session` arg. The pointer
 * moves to whatever session was most recently started, stopped, or operated
 * on, so a model can run several browsers side by side without repeating the
 * id on every call.
 *
 * Strict ownership boundary (the bsk daemon may be shared with other agents,
 * terminals, or dsh instances): the registry ONLY ever holds sessions created
 * by this plugin's browser_session start action. Tools cannot see or act on any
 * other session — an explicit `session` argument naming a foreign id is an
 * error, the list tool shows owned sessions only, and stop/unload cleanup
 * can never touch a session this plugin did not create.
 */
interface TrackedSession {
  sessionId: string;
  /** Stable lifecycle handle, retained even if the short session ID is reused. */
  requestId?: string;
  browserInstanceId?: string;
  startedAtMs: number;
  /** Always true: only plugin-created sessions enter the registry at all. */
  owned: boolean;
  state: "starting" | "active" | "cleanup";
}
type NewSession = Omit<TrackedSession, "owned" | "state">;
declare class SessionRegistry {
  private readonly maxSessions;
  private readonly sessions;
  private currentId;
  /**
   * bsk session id → the DSH session ids that may clean it up: the agent
   * session that started it plus every ancestor along the seed lineage, so
   * archiving a conversation at ANY level of the chain reaps its browsers
   * (see archive-cleanup.ts).
   */
  private readonly dshOwners;
  /**
   * Slots reserved by in-flight starts. reserveStart/completeStart/abandonStart
   * run synchronously around the async spawn, so concurrent starts can never
   * both pass the capacity check (check-and-reserve is atomic on the event loop).
   */
  private pendingStarts;
  constructor(maxSessions: number);
  /**
   * Reserve a start slot synchronously, BEFORE spawning.
   * @throws when the configured concurrency cap (tracked + in-flight) is reached.
   */
  reserveStart(recoveredPending?: number): void;
  /** Give back a reservation after a start that never produced a session. */
  abandonStart(): void;
  /**
   * Register a freshly started session, consuming its reservation, and make
   * it current.
   */
  completeStart(session: NewSession): void;
  /** Own a resource without exposing it to ordinary browser commands. */
  trackStart(session: NewSession, state?: "starting" | "cleanup"): void;
  /** Publish only after initialization and the daemon claim have succeeded. */
  activate(sessionId: string): void;
  markForCleanup(sessionId: string): void;
  private selectCurrent;
  isUsable(sessionId: string): boolean;
  stateFor(sessionId: string): TrackedSession["state"] | undefined;
  assertUsable(sessionId: string, toolName: string): void;
  /** Forget a session; falls back to the most recent remaining one. */
  remove(sessionId: string): void;
  /**
   * Record which DSH conversation(s) a freshly started bsk session belongs
   * to (the starting agent's session plus its ancestors). No-op without ids
   * — e.g. a start whose caller carried no agent identity.
   */
  trackOwner(sessionId: string, dshSessionIds: readonly string[]): void;
  /** bsk session ids owned by the given DSH conversation (or its descendants). */
  ownedByDsh(dshSessionId: string): string[];
  /** The DSH conversation ids owning one bsk session (empty when untracked). */
  dshOwnersOf(sessionId: string): string[];
  /** Mark an owned session as most recently used (recency order refresh). */
  private touch;
  /** The current session id, if any. */
  current(): string | undefined;
  /** Owned sessions in least- to most-recently-used order. */
  list(): TrackedSession[];
  /** Ids of owned sessions — the exact set unload cleanup is allowed to stop. */
  ownedIds(): string[];
  /** Whether the session was created by this plugin. */
  isOwned(sessionId: string): boolean;
  requestFor(sessionId: string): string | undefined;
  size(): number;
  /** Shared not-yours error for foreign or unknown session ids. */
  private foreignError;
  /**
   * Resolve the session a tool call acts on: an explicit `session` argument
   * must name an owned session (and becomes current); omitted falls back to
   * the current session. Foreign ids are rejected, never adopted.
   * @throws on foreign/unknown ids, or when no session exists.
   */
  resolve(explicit: string | undefined, toolName: string): string;
  /**
   * Stop can also reach starting/cleanup resources. If no usable session is
   * current, default to the most recent owned resource so cleanup is retryable.
   * A rejected stop never moves the current pointer.
   */
  resolveForStop(explicit: string | undefined): string;
}
//#endregion
//#region src/observation.d.ts
/** One owned session's live observation record (wire-stable shape). */
interface SessionObservation {
  sessionId: string;
  /** Last settled page URL, when any navigation completed. */
  url?: string;
  /** Current action ('idle' when nothing is in flight). */
  action: string;
  /** Epoch ms when the current action started (elapsed time is client-side). */
  since: number;
  /** Latest thumbnail id (ephemeral, plugin-owned; never bytes on the wire). */
  thumbnailAttachmentId?: string;
  /** Summary of the most recent failed action (drives the red status dot). */
  lastError?: string;
  /**
   * The daemon reports this session as gone (e.g. daemon restart): the strip
   * greys it out until it is stopped/removed. No more frames are requested.
   */
  dead?: boolean;
  /**
   * The DSH conversations this session belongs to (the starting agent's
   * session plus its seed-lineage ancestors), recorded at start. Scoped
   * surfaces (the native sidebar tab) filter by it; absent means untracked
   * ownership — visible only in the global (unscoped) view.
   */
  dshSessionIds?: string[];
}
/** Initial snapshot or incremental change carried to subscribers (SSE on the wire). */
type ObservationEvent = {
  type: "snapshot";
  sessions: SessionObservation[];
  available: boolean;
} | {
  type: "upsert" | "remove" | "reset";
  session?: SessionObservation;
} | {
  type: "availability";
  available: boolean;
};
interface ObservationOptions {
  enabled: boolean;
  /** Fast cadence while a session is active or recently was. */
  thumbnailIntervalMs: number;
  /** Slow cadence for idle sessions; also the "recently active" window. */
  idleIntervalMs: number;
}
/** Injectable clock/scheduler bits for tests. */
interface ObservationScheduler {
  setTimeout: (fn: () => void, ms: number) => unknown;
  clearTimeout: (handle: unknown) => void;
  now: () => number;
}
declare class ObservationService {
  private readonly deps;
  private readonly scratchNamespace;
  private readonly observations;
  private readonly listeners;
  private thumbnailViewers;
  private readonly captureTimers;
  private readonly captureInFlight;
  /** Captures intentionally cancelled to make way for foreground work. */
  private readonly capturePreempted;
  /** Number of queued/running model-facing calls that currently outrank thumbnails. */
  private readonly foregroundDepth;
  private readonly captureFailures;
  private readonly lastActivity;
  /** Ephemeral frame id → PNG bytes. Only the live ring members are present. */
  private readonly frames;
  /** sessionId → oldest-first frame ids, length ≤ FRAME_RING_SIZE. */
  private readonly rings;
  /** sessionId → sha256 of the current frame (skip republish when unchanged). */
  private readonly hashes;
  /** sessionId → last issued sequence number. */
  private readonly seqs;
  /** Consecutive capture failures across ALL sessions (daemon-level signal). */
  private globalFailures;
  private available;
  private disposed;
  constructor(deps: {
    ctx: Context;
    runner: BskRunner;
    registry: SessionRegistry;
    queue: KeyedExecutor;
    options: ObservationOptions;
    scheduler?: ObservationScheduler;
  });
  private get scheduler();
  /** One-time state read; use subscribe for an ordered snapshot and subsequent changes. */
  getState(): SessionObservation[];
  /** Whether the browser side looks reachable (drives the "browser unavailable" state). */
  isAvailable(): boolean;
  private setAvailable;
  /**
   * Subscribe to an ordered initial snapshot and subsequent changes. On an
   * active service, listener receives the snapshot synchronously before this
   * method returns. Subscribing after disposal is a no-op.
   *
   * `thumbnails` defaults to true for compatibility: this subscription counts
   * as a screenshot viewer for the service's owned sessions. Pass false for
   * state-only observation. The first viewer starts capture scheduling.
   *
   * @returns An idempotent unsubscribe function releasing this subscription's
   * screenshot demand. When the last viewer leaves, scheduled/queued captures
   * are cancelled/skipped; an already running capture may finish.
   */
  subscribe(listener: (event: ObservationEvent) => void, { thumbnails }?: {
    thumbnails?: boolean;
  }): () => void;
  private emit;
  private put;
  /** Register a fresh owned session (called from browser_session action=start). */
  addSession(sessionId: string, url?: string): void;
  /** Drop a session (called from browser_session action=stop). */
  removeSession(sessionId: string): void;
  /**
   * Give model-facing work priority over the best-effort thumbnail lane.
   * The first lease cancels a pending timer and gracefully interrupts an
   * active bsk screenshot; the last release schedules one fresh frame.
   */
  acquireForeground(sessionId: string): () => void;
  /** Mark an action starting on a session (tool entry instrumentation). */
  beginAction(sessionId: string, action: string): void;
  /**
   * Mark the current action settling (tool exit instrumentation). Triggers an
   * immediate thumbnail refresh — action-driven first, timer as fallback.
   */
  endAction(sessionId: string, error?: string): void;
  /** Record the settled page URL (navigate success / start with url). */
  setUrl(sessionId: string, url: string): void;
  /**
   * Interrupt the in-flight call of one session (default: the registry's
   * current). Kills exactly the bsk children this plugin spawned for that
   * session — same user-visible semantics as the chat Stop button (the in-flight
   * tool call fails; the agent flow may continue).
   * @returns whether an in-flight call was actually interrupted.
   */
  interrupt(sessionId?: string): boolean;
  /**
   * Read one captured thumbnail from the in-process ring. Powers the plugin's
   * own HTTP thumbnail route — frames are plugin-owned runtime data, never
   * referenced by any session log, so the session-authorized client RPC
   * cannot serve them.
   */
  readThumbnail(attachmentId: string): Promise<{
    data: Uint8Array;
    mediaType: string;
  } | undefined>;
  /** Tear down all state and timers (plugin dispose). */
  dispose(): void;
  private cancelCapture;
  private canCapture;
  private restingAction;
  /** Schedule the next capture for a session; `delayMs` 0 means "as soon as the event loop allows". */
  private scheduleCapture;
  /**
   * Capture one frame: `bsk screenshot --json` through the runner, bytes into
   * the in-process ring, id onto the observation. Runs OUTSIDE the tool
   * instrumentation on purpose — no action events, no registry writes.
   * Failures keep the previous frame and back off silently.
   */
  private capture;
  /** Insert a new frame, or no-op when the PNG bytes match the current one. */
  private publishFrame;
  private dropSessionFrames;
}
//#endregion
//#region src/session-starts.d.ts
interface StopOptions {
  sessionId?: string;
  /** Exact target for recovery, including starts that never returned a session ID. */
  requestId?: string;
  signal?: AbortSignal;
}
interface StopResult {
  stopped: string;
  requestId: string;
  alreadyClosed: boolean;
}
/** The one lifecycle owner for pending, live, and failed-cleanup starts. */
declare class SessionStarts {
  private readonly deps;
  readonly journal: StartJournal;
  private closing;
  private timer?;
  private readonly cleaning;
  private readonly reserved;
  constructor(deps: ToolDeps, journal?: StartJournal);
  begin(owners: string[]): StartRecord;
  prepare(record: StartRecord, signal: AbortSignal): Promise<void>;
  assertStarting(record: StartRecord): void;
  register(record: StartRecord, reply: {
    session_id: string;
    browser_instance_id: string;
  }): void;
  private adopt;
  claim(record: StartRecord, signal: AbortSignal): Promise<void>;
  /** Accept a durable stop; aborting its caller only cancels waiting, never cleanup. */
  stop({ sessionId, requestId, signal }?: StopOptions): Promise<StopResult>;
  private resolveStop;
  private requestCleanup;
  fail(record: StartRecord): Promise<void>;
  private cancel;
  private cancelOnce;
  private releaseResource;
  private completeCleanup;
  private forget;
  private ownsRegisteredSession;
  /** Forget passive session disappearance, preserving unacknowledged stop receipts. */
  forgetStopped(): void;
  reconcile(): Promise<void>;
  pendingCleanup(): number;
  archive(owner: string): void;
  private schedule;
  dispose(): Promise<void>;
}
//#endregion
//#region src/tools.d.ts
/** Plugin configuration resolved from the Schemastery schema in index.ts. */
interface PluginConfig {
  bskPath: string;
  /** Optional durable start journal directory (isolated by host/profile when configured). */
  sessionStateDirectory?: string;
  defaultTimeoutMs: number;
  maxSessions: number;
  observationEnabled: boolean;
  thumbnailIntervalMs: number;
  idleIntervalMs: number;
  /**
   * Lazy tool-schema injection: when true (default), the browser_* tools are
   * registered only after the `browser-skill` skill has been successfully
   * invoked (skill catalog entry advertises alone until then); when false,
   * the suite is registered at apply time (legacy always-on behavior).
   */
  lazyTools: boolean;
  /**
   * Host the bsk daemon as a plugin-owned foreground child when none answers.
   * Needed on hosts that forbid Job Object breakaway, where bsk's own detached
   * auto-start is refused. See ./daemon-host.
   */
  hostDaemon: boolean;
  /** Budget for a hosted daemon to become ready. */
  daemonReadyTimeoutMs: number;
}
interface ToolDeps {
  ctx: Context;
  runner: BskRunner;
  registry: SessionRegistry;
  config: PluginConfig;
  observation: ObservationService;
  /** Per-session FIFO: the daemon rejects a second command while one is unfinished. */
  queue: KeyedExecutor;
  starts?: SessionStarts;
}
//#endregion
//#region src/archive-cleanup.d.ts
/**
 * The DSH session ids that own a tool call's browser sessions: the calling
 * agent's own session first, followed by ancestors along the seed lineage. Empty
 * when the call carried no agent identity (those sessions outlive any
 * archive cleanup by design — nothing can name their owner).
 */
declare function ownerSessionIds(ctx: Context, agentId: string | undefined): string[];
/**
 * Watch conversation archival and stop the bsk sessions it opened. Returns
 * the disposer (plugin unload). In compositions without the workspace
 * domain (headless), the event simply never fires — and a context without
 * the events mixin degrades to a no-op like the other optional seams.
 */
declare function armArchiveCleanup(ctx: Context, starts: Pick<SessionStarts, "archive">): () => void;
//#endregion
//#region src/browser-tools.d.ts
/** Register the complete six-tool browser suite; returns its combined disposer. */
declare function registerBrowserTools(deps: ToolDeps): () => void;
//#endregion
//#region src/observation-http.d.ts
/**
 * Register the observation routes. No-op (with a console note) when the
 * composition has no web server.
 * @returns disposer removing the routes.
 */
declare function registerObservationRoutes(ctx: Context, observation: ObservationService, lifecycle: Pick<SessionStarts, "stop">): () => void;
//#endregion
//#region src/index.d.ts
declare const name = "dsh-browser-skill";
declare const inject: string[];
/** Runtime configuration schema (validated and defaulted by Cordis). */
declare const Config: Schema<Schemastery.ObjectS<NoInfer<{
  bskPath: Schema<string, string, "defined">;
  sessionStateDirectory: Schema<string, string, "plain">;
  defaultTimeoutMs: Schema<number, number, "defined">;
  maxSessions: Schema<number, number, "defined">;
  observationEnabled: Schema<boolean, boolean, "defined">;
  thumbnailIntervalMs: Schema<number, number, "defined">;
  idleIntervalMs: Schema<number, number, "defined">;
  lazyTools: Schema<boolean, boolean, "defined">;
  hostDaemon: Schema<boolean, boolean, "defined">;
  daemonReadyTimeoutMs: Schema<number, number, "defined">;
}>>, Schemastery.ObjectT<NoInfer<{
  bskPath: Schema<string, string, "defined">;
  sessionStateDirectory: Schema<string, string, "plain">;
  defaultTimeoutMs: Schema<number, number, "defined">;
  maxSessions: Schema<number, number, "defined">;
  observationEnabled: Schema<boolean, boolean, "defined">;
  thumbnailIntervalMs: Schema<number, number, "defined">;
  idleIntervalMs: Schema<number, number, "defined">;
  lazyTools: Schema<boolean, boolean, "defined">;
  hostDaemon: Schema<boolean, boolean, "defined">;
  daemonReadyTimeoutMs: Schema<number, number, "defined">;
}>>, "plain">;
type Config = PluginConfig;
/** Test seams: swap the process runner (unit tests never spawn a real bsk). */
interface ApplyOptions {
  runnerFactory?: (bskPath: string) => BskRunner;
  startJournal?: StartJournal;
}
declare function apply(ctx: Context, config?: Partial<PluginConfig>, options?: ApplyOptions): void;
//#endregion
export { ApplyOptions, BskError, type BskRunResult, type BskRunner, Config, KeyedExecutor, type ObservationEvent, type ObservationOptions, ObservationService, type PluginConfig, type SessionObservation, SessionRegistry, type SpawnImpl, type ToolDeps, apply, armArchiveCleanup, createBskRunner, inject, name, ownerSessionIds, registerBrowserTools, registerObservationRoutes };