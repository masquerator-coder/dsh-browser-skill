// Daemon hosting: the zero-setup path for hosts that forbid Job Object
// breakaway. These tests never touch a real daemon — a fake runner answers the
// `status` probe and a fake spawn records the foreground child — so what is
// asserted is the plugin's decision policy and its ownership discipline:
// host only when nothing answers, never adopt someone else's daemon, and kill
// only the child this instance started.

import type { ChildProcess } from "node:child_process";
import { EventEmitter } from "node:events";
import { describe, expect, it, vi } from "vitest";
import { DaemonHost } from "../src/daemon-host";

interface SpawnCall {
  command: string;
  args: string[];
  options: { env?: NodeJS.ProcessEnv; stdio?: unknown } | undefined;
}

/** A minimal ChildProcess stand-in: emits the events DaemonHost subscribes to. */
class FakeChild extends EventEmitter {
  pid = 4242;
  exitCode: number | null = null;
  stderr = new EventEmitter();
  killed = false;

  kill(): boolean {
    this.killed = true;
    this.exitCode = 0;
    this.emit("exit", 0);
    return true;
  }
}

function fakeSpawn(child: FakeChild, calls: SpawnCall[]) {
  return ((command: string, args: string[], options: SpawnCall["options"]) => {
    calls.push({ command, args, options });
    return child as unknown as ChildProcess;
  }) as never;
}

/** A runner whose `status` answer is scripted per call. */
function statusRunner(codes: number[]) {
  const calls: string[][] = [];
  let index = 0;
  return {
    calls,
    run: vi.fn(async (args: string[]) => {
      calls.push(args);
      const code = codes[Math.min(index, codes.length - 1)] ?? 1;
      index += 1;
      return { code, stdout: JSON.stringify({ pid: 999 }), stderr: "" };
    }),
  };
}

describe("DaemonHost", () => {
  it("leaves an already-answering daemon alone and spawns nothing", async () => {
    const calls: SpawnCall[] = [];
    const child = new FakeChild();
    const runner = statusRunner([0]);
    const host = new DaemonHost({
      bskPath: "bsk",
      runner,
      spawnImpl: fakeSpawn(child, calls),
      warn: () => {},
    });

    await expect(host.start()).resolves.toEqual({ kind: "already-running" });
    expect(calls).toHaveLength(0);
    expect(runner.calls).toEqual([["status"]]);
  });

  it("hosts a foreground daemon when no daemon answers", async () => {
    const calls: SpawnCall[] = [];
    const child = new FakeChild();
    const runner = statusRunner([1, 1, 0]);
    const host = new DaemonHost({
      bskPath: "bsk",
      runner,
      spawnImpl: fakeSpawn(child, calls),
      readyTimeoutMs: 3000,
      warn: () => {},
    });

    await expect(host.start()).resolves.toEqual({ kind: "hosted", pid: 4242 });
    expect(calls.map((call) => call.args)).toEqual([["daemon", "start", "--foreground"]]);
    await expect(host.waitUntilReady()).resolves.toBe(true);
  });

  it("suppresses bsk's own auto-start on the hosted child", async () => {
    const calls: SpawnCall[] = [];
    const child = new FakeChild();
    const host = new DaemonHost({
      bskPath: "bsk",
      runner: statusRunner([1]),
      spawnImpl: fakeSpawn(child, calls),
      warn: () => {},
    });

    await host.start();

    // Auto-start would re-run the Job-breakaway probe this host refuses.
    expect(calls[0]?.options?.env?.BSK_AUTO_START).toBe("0");
  });

  it("survives a spawn failure without throwing", async () => {
    const warnings: string[] = [];
    const host = new DaemonHost({
      bskPath: "bsk",
      runner: statusRunner([1]),
      spawnImpl: (() => {
        throw new Error("EPERM");
      }) as never,
      warn: (message) => warnings.push(message),
    });

    const status = await host.start();
    expect(status.kind).toBe("unavailable");
    expect(warnings.join("\n")).toContain("EPERM");
  });

  it("stays silent when the OS refused the spawn, since the probe already reported it", async () => {
    const warnings: string[] = [];
    const host = new DaemonHost({
      bskPath: "bsk",
      runner: statusRunner([1]),
      spawnImpl: (() => {
        throw Object.assign(new Error("spawn UNKNOWN"), { code: "UNKNOWN", errno: -4094 });
      }) as never,
      warn: (message) => warnings.push(message),
    });

    const status = await host.start();
    expect(status.kind).toBe("unavailable");
    // One failure must not print two warnings carrying the same bare
    // "spawn UNKNOWN"; the startup probe's guidance is the useful one.
    expect(warnings).toEqual([]);
  });

  it("stops only its own child, and only once", async () => {
    const child = new FakeChild();
    const host = new DaemonHost({
      bskPath: "bsk",
      runner: statusRunner([1]),
      spawnImpl: fakeSpawn(child, []),
      warn: () => {},
    });

    await host.start();
    expect(host.hosting).toBe(true);

    await host.dispose();
    expect(child.killed).toBe(true);
    expect(host.hosting).toBe(false);

    // A second dispose must not reach for a daemon it no longer owns.
    child.killed = false;
    await host.dispose();
    expect(child.killed).toBe(false);
  });

  it("reports not-ready instead of hanging when the daemon never answers", async () => {
    const host = new DaemonHost({
      bskPath: "bsk",
      runner: statusRunner([1]),
      spawnImpl: fakeSpawn(new FakeChild(), []),
      readyTimeoutMs: 300,
      warn: () => {},
    });

    await host.start();
    await expect(host.waitUntilReady()).resolves.toBe(false);
  });

  it("is a no-op after dispose", async () => {
    const calls: SpawnCall[] = [];
    const host = new DaemonHost({
      bskPath: "bsk",
      runner: statusRunner([1]),
      spawnImpl: fakeSpawn(new FakeChild(), calls),
      warn: () => {},
    });

    await host.dispose();
    await expect(host.start()).resolves.toEqual({ kind: "unavailable", detail: "disposed" });
    expect(calls).toHaveLength(0);
  });
});