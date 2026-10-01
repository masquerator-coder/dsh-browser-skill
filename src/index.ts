/**
 * dsh-browser-skill — a DeepSeek Harness bundle that registers
 * BrowserSkill (`bsk`) browser automation as model-visible tools.
 *
 * Each tool spawns `bsk <cmd> --json`, parses the structured output, and
 * returns a canonical JSON value. The plugin tracks the sessions it starts so
 * one agent conversation can drive several browsers at once; unloading the
 * plugin stops every tracked session and kills any in-flight bsk children.
 *
 * @module dsh-browser-skill
 */

import type { Context } from "@deepseek-ai/cordis";
import Schema from "@deepseek-ai/schemastery";
import { armArchiveCleanup } from "./archive-cleanup";
import { registerBrowserTools } from "./browser-tools";
import { DaemonHost } from "./daemon-host";
import { armLazyTools } from "./lazy-tools";
import { ObservationService } from "./observation";
import { registerObservationRoutes } from "./observation-http";
import { KeyedExecutor } from "./queue";
import { type BskRunner, createBskRunner } from "./runner";
import { SessionStarts } from "./session-starts";
import { SessionRegistry } from "./sessions";
import { armAgentScopedBskSkill, registerBskSkill } from "./skill";
import { DiskStartJournal, defaultStartJournalDirectory, type StartJournal } from "./start-journal";
import type { PluginConfig, ToolDeps } from "./tools";

export const name = "dsh-browser-skill";
export const inject = ["tools"];

/** Runtime configuration schema (validated and defaulted by Cordis). */
export const Config = Schema.object({
  bskPath: Schema.string()
    .default("bsk")
    .description("Path to the bsk CLI binary (defaults to resolving `bsk` from PATH)."),
  sessionStateDirectory: Schema.string().description(
    "Directory for durable browser start recovery records; defaults to BSK_HOME/dsh-starts scoped by working directory and CLI.",
  ),
  defaultTimeoutMs: Schema.number()
    .default(120_000)
    .description(
      "Default command execution timeout in milliseconds. Collecting output after exit may take up to 2 additional seconds.",
    ),
  maxSessions: Schema.number()
    .default(5)
    .description("Maximum number of concurrent browser sessions started through this plugin."),
  observationEnabled: Schema.boolean()
    .default(true)
    .description("Track per-session observation state (action/url/thumbnail) for the PiP overlay."),
  thumbnailIntervalMs: Schema.number()
    .default(1500)
    .description("Thumbnail refresh cadence for active sessions (milliseconds)."),
  idleIntervalMs: Schema.number()
    .default(8000)
    .description("Thumbnail refresh cadence for idle sessions; also the recent-activity window."),
  lazyTools: Schema.boolean()
    .default(true)
    .description(
      "Reveal the browser_* tools only after the browser-skill skill is invoked (default true); " +
        "false registers the full suite at load.",
    ),
  hostDaemon: Schema.boolean()
    .default(true)
    .description(
      "When no bsk daemon answers, host one as a child of this plugin via " +
        "`bsk daemon start --foreground` (default true). Required on hosts that run " +
        "commands in a Job Object without breakaway, where bsk's own detached " +
        "auto-start is refused; the daemon is stopped when the plugin unloads.",
    ),
  daemonReadyTimeoutMs: Schema.number()
    .default(15_000)
    .description("How long to wait for a hosted daemon to become ready (milliseconds)."),
});

export type Config = PluginConfig;

/** Test seams: swap the process runner (unit tests never spawn a real bsk). */
export interface ApplyOptions {
  runnerFactory?: (bskPath: string) => BskRunner;
  startJournal?: StartJournal;
}

export function apply(
  ctx: Context,
  config: Partial<PluginConfig> = {},
  options: ApplyOptions = {},
): void {
  const resolved: PluginConfig = {
    bskPath: config.bskPath ?? "bsk",
    sessionStateDirectory: config.sessionStateDirectory,
    defaultTimeoutMs: config.defaultTimeoutMs ?? 120_000,
    maxSessions: config.maxSessions ?? 5,
    observationEnabled: config.observationEnabled ?? true,
    thumbnailIntervalMs: config.thumbnailIntervalMs ?? 1500,
    idleIntervalMs: config.idleIntervalMs ?? 8000,
    lazyTools: config.lazyTools ?? true,
    hostDaemon: config.hostDaemon ?? true,
    daemonReadyTimeoutMs: config.daemonReadyTimeoutMs ?? 15_000,
  };
  const runner = options.runnerFactory?.(resolved.bskPath) ?? createBskRunner(resolved.bskPath);
  const registry = new SessionRegistry(resolved.maxSessions);
  const queue = new KeyedExecutor();
  const observation = new ObservationService({
    ctx,
    runner,
    registry,
    queue,
    options: {
      enabled: resolved.observationEnabled,
      thumbnailIntervalMs: resolved.thumbnailIntervalMs,
      idleIntervalMs: resolved.idleIntervalMs,
    },
  });

  const deps: ToolDeps = { ctx, runner, registry, config: resolved, observation, queue };
  const journal =
    options.startJournal ??
    new DiskStartJournal(
      resolved.sessionStateDirectory ?? defaultStartJournalDirectory(resolved.bskPath),
    );
  if (journal instanceof DiskStartJournal) journal.recover();
  const starts = (deps.starts = new SessionStarts(deps, journal));
  void starts.reconcile().catch((error) => console.warn("Browser start recovery failed", error));

  // Progressive disclosure of the BSK agent skill (catalog entry resident,
  // body on demand) through the official skill seam; silent no-op when the
  // composition lacks it. With lazyTools on, the skill entry is initially the
  // ONLY model-visible advertisement — the tool suite reveals itself on a
  // successful skill invocation (or a session whose history already has one).
  const unregisterSkill = registerBskSkill(ctx);
  // A same-name CLI skill left in ~/.agents is discovered in the nearer preset
  // layer and shadows the global registration above. Re-register through every
  // exact agent context at startup so DSH always loads the browser_* protocol
  // instructions; the shared CLI skill remains untouched for other agents.
  const disarmAgentSkill = armAgentScopedBskSkill(ctx);
  const registerSuite = () => registerBrowserTools(deps);
  const removeSuite = resolved.lazyTools ? armLazyTools(ctx, registerSuite) : registerSuite();
  // Route registration rides ctx.inject: the webServer service may be provided
  // AFTER this plugin loads, and in headless compositions it never appears (the
  // callback simply never runs, leaving the rest of the plugin unaffected).
  let removeRoutes: () => void = () => {};
  ctx.inject(["webServer"], (injected) => {
    removeRoutes = registerObservationRoutes(injected, observation, starts);
    return () => removeRoutes();
  });
  // Reap a conversation's browsers when the conversation itself is archived:
  // archived sessions are hidden from every surface, so their Agent Windows
  // would otherwise linger unreachable until idle timeout or unload.
  const disarmArchiveCleanup = armArchiveCleanup(ctx, starts);

  // Non-blocking install probe: warn early when bsk is missing instead of
  // failing the first tool call with a bare spawn error. Uses --version on
  // purpose — it answers without starting the daemon (`bsk status` would
  // ensure-spawn one, an expensive side effect for a probe).
  runner.run(["--version"], { timeoutMs: 10_000 }).then(
    () => {},
    (error: unknown) => {
      const detail = error instanceof Error ? error.message : String(error);
      console.warn(
        `[${name}] bsk probe failed (${detail}); browser tools will report install guidance until the bsk CLI is available`,
      );
    },
  );

  // Zero-setup daemon hosting. `bsk` auto-spawns its daemon as an independent,
  // detached process, which a host that runs commands in a Job Object without
  // breakaway (dsh's own sandbox) refuses with `os error 5`. Rather than
  // defeating that restriction, host the daemon the way it allows: a
  // foreground child of this plugin, inside the same Job, reaped on unload. A
  // daemon owned by anyone else is never touched — hosting runs only when
  // nothing answers, and only the child we started is ever killed.
  const daemonHost = new DaemonHost({
    bskPath: resolved.bskPath,
    runner,
    readyTimeoutMs: resolved.daemonReadyTimeoutMs,
    warn: (message) => console.warn(message),
  });
  if (resolved.hostDaemon) {
    void daemonHost
      .start()
      .then(async (status) => {
        if (status.kind === "unavailable") return;
        // Suppress bsk's own auto-start from here on: it can only fail on this
        // host, and every tool call would pay for the probe.
        runner.setHostedDaemon(true);
        if (status.kind === "hosted") {
          const ready = await daemonHost.waitUntilReady();
          if (!ready) {
            console.warn(
              `[${name}] hosted bsk daemon did not become ready within ${resolved.daemonReadyTimeoutMs}ms`,
            );
          }
        }
      })
      .catch((error: unknown) => {
        const detail = error instanceof Error ? error.message : String(error);
        console.warn(`[${name}] bsk daemon hosting failed (${detail})`);
      });
  }

  // Unload cleanup: kill in-flight children, then stop every session this
  // plugin OWNS (created via browser_session action=start). Referenced or unknown
  // sessions belonging to other programs on the shared daemon are never
  // touched; per-stop failures (already stopped externally, daemon restart)
  // are swallowed so one stale handle cannot abort the rest.
  ctx.effect(() => {
    return () => {
      removeSuite();
      disarmAgentSkill();
      unregisterSkill();
      removeRoutes();
      disarmArchiveCleanup();
      removeSuite();
      return daemonHost.dispose().then(() => starts.dispose()).then(() => observation.dispose());
    };
  });
}

export { armArchiveCleanup, ownerSessionIds } from "./archive-cleanup";
export { registerBrowserTools } from "./browser-tools";
export type { ObservationEvent, ObservationOptions, SessionObservation } from "./observation";
export { ObservationService } from "./observation";
export { registerObservationRoutes } from "./observation-http";
export { KeyedExecutor } from "./queue";
export type { BskRunner, BskRunResult, SpawnImpl } from "./runner";
export { BskError, createBskRunner } from "./runner";
export { SessionRegistry } from "./sessions";
export type { PluginConfig, ToolDeps } from "./tools";
