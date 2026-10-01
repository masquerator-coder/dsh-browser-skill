/**
 * Plugin-owned daemon hosting: the zero-setup path for hosts that forbid Job
 * Object breakaway.
 *
 * `bsk` normally auto-spawns its daemon as an independent, detached process
 * (`CREATE_BREAKAWAY_FROM_JOB` on Windows). A host that runs every command
 * inside a `KILL_ON_JOB_CLOSE` Job without `JOB_OBJECT_LIMIT_BREAKAWAY_OK` —
 * dsh's own sandbox does exactly this — makes that impossible, and `bsk`
 * deliberately refuses rather than leaving a daemon pinned to a doomed Job:
 *
 *   cannot start an independent Windows daemon; the host may prohibit Job
 *   Object breakaway ... 拒绝访问。 (os error 5)
 *
 * The user-visible symptom is every browser tool failing with install-looking
 * guidance even though `bsk` is installed correctly.
 *
 * We do not try to defeat the restriction. Instead we host the daemon the way
 * the restriction actually allows: `bsk daemon start --foreground` runs the
 * daemon loop in a child of this plugin, inside the same Job, and never asks
 * to break away. It is then reaped together with the host, which is the
 * behavior the Job was asking for in the first place.
 *
 * A daemon started any other way (an independent terminal, a service, another
 * agent) is left completely alone: hosting only ever runs when no daemon
 * answers.
 *
 * @module daemon-host
 */

import { type ChildProcess, spawn } from "node:child_process";

/** Structural view of the runner seam this module drives. */
export interface DaemonCommandRunner {
  run(args: string[], options?: { timeoutMs?: number }): Promise<{ code: number | null; stdout: string; stderr: string }>;
}

export interface DaemonHostOptions {
  /** Path to the `bsk` CLI, as configured for the plugin. */
  bskPath: string;
  /** Command runner used for status probes. */
  runner: DaemonCommandRunner;
  /** Child-spawn seam; tests substitute a fake. Defaults to `node:child_process`. */
  spawnImpl?: typeof spawn;
  /** How long to wait for a hosted daemon to answer `status`. */
  readyTimeoutMs?: number;
  /** Diagnostic sink; defaults to `console.warn`. */
  warn?: (message: string) => void;
}

/** Outcome of one hosting attempt, for logging and tests. */
export type DaemonHostStatus =
  /** A daemon was already answering; nothing was started. */
  | { kind: "already-running" }
  /** We started the daemon and it is answering. */
  | { kind: "hosted"; pid: number | undefined }
  /** `bsk` could not be probed; the tools will surface their own guidance. */
  | { kind: "unavailable"; detail: string };

interface BskStatusBody {
  pid?: unknown;
  ws_port?: unknown;
}

function parsePid(stdout: string): number | undefined {
  try {
    const body = JSON.parse(stdout) as BskStatusBody;
    return typeof body.pid === "number" ? body.pid : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Owns at most one foreground daemon child. `start()` is idempotent and safe to
 * call from a lifecycle hook; `dispose()` kills only the child this instance
 * spawned, never a daemon owned by anyone else.
 */
export class DaemonHost {
  private child: ChildProcess | undefined;
  private disposed = false;
  private readonly spawnImpl: typeof spawn;

  constructor(private readonly options: DaemonHostOptions) {
    this.spawnImpl = options.spawnImpl ?? spawn;
  }

  /** True when this instance is holding a live daemon child. */
  get hosting(): boolean {
    return this.child !== undefined && this.child.exitCode === null;
  }

  /**
   * Ensure a daemon is reachable, hosting one only when none answers.
   *
   * Never throws: a hosting failure degrades to the previous behavior (the
   * tools report the daemon guidance themselves), because a browser plugin
   * must not be able to abort host startup.
   */
  async start(): Promise<DaemonHostStatus> {
    if (this.disposed) return { kind: "unavailable", detail: "disposed" };
    if (this.hosting) return { kind: "hosted", pid: this.child?.pid };

    if (await this.probe()) return { kind: "already-running" };
    // The probe may itself have triggered an auto-spawn on a host that allows
    // breakaway; re-check before spawning a second daemon.
    if (await this.probe()) return { kind: "already-running" };

    return this.host();
  }

  /** Stop the daemon child this instance started, if any. */
  async dispose(): Promise<void> {
    this.disposed = true;
    const child = this.child;
    this.child = undefined;
    if (child === undefined || child.exitCode !== null) return;
    await new Promise<void>((resolve) => {
      const settle = () => resolve();
      child.once("exit", settle);
      try {
        child.kill();
      } catch {
        settle();
      }
      // The daemon may ignore a soft kill while draining sessions; do not let
      // plugin unload hang on it.
      const force = setTimeout(() => {
        try {
          child.kill("SIGKILL");
        } catch {
          // Already gone.
        }
        settle();
      }, 3000);
      force.unref?.();
    });
  }

  /** True when some daemon answers `status` (ours or anyone else's). */
  private async probe(): Promise<boolean> {
    try {
      const result = await this.options.runner.run(["status"], { timeoutMs: 8000 });
      return result.code === 0;
    } catch {
      return false;
    }
  }

  private host(): DaemonHostStatus {
    const warn = this.options.warn ?? ((message: string) => console.warn(message));
    let child: ChildProcess;
    try {
      child = this.spawnImpl(this.options.bskPath, ["daemon", "start", "--foreground"], {
        windowsHide: true,
        // A hosted daemon must not recurse into automatic startup, and must
        // never be told to cancel itself when our stdio closes.
        env: { ...process.env, BSK_AUTO_START: "0" },
        stdio: ["ignore", "ignore", "pipe"],
      });
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      warn(`[dsh-browser-skill] could not host the bsk daemon: ${detail}`);
      return { kind: "unavailable", detail };
    }

    this.child = child;
    child.on("error", (error: Error) => {
      warn(`[dsh-browser-skill] hosted bsk daemon failed: ${error.message}`);
    });
    child.stderr?.on("data", (chunk: Buffer | string) => {
      const text = String(chunk).trim();
      if (text !== "") warn(`[dsh-browser-skill] bsk daemon: ${text}`);
    });
    child.on("exit", (code) => {
      if (this.child === child) this.child = undefined;
      if (code !== 0 && !this.disposed) {
        warn(`[dsh-browser-skill] hosted bsk daemon exited with code ${code}`);
      }
    });

    return { kind: "hosted", pid: child.pid };
  }

  /** Wait until the hosted daemon answers `status`, or the budget runs out. */
  async waitUntilReady(): Promise<boolean> {
    const timeoutMs = this.options.readyTimeoutMs ?? 15_000;
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      if (await this.probe()) return true;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    return false;
  }
}

/** Parse the `pid` field out of a `bsk status --json` payload. */
export { parsePid };