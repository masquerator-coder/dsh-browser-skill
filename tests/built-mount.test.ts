// Real end-to-end load: mount the BUILT plugin (lib/index.mjs) into a real
// Cordis Context that provides a recording `tools` service, then assert the
// browser_* tools actually register. No LLM, no browser, no network.
//
// This is the strongest check that runs without a live host: it exercises the
// published artifact's own module graph (not the TypeScript sources), so a
// missing external, a bad export, or an `apply()` that silently returns early
// fails here. `pnpm build` must run first; `pnpm test` does that.
import { existsSync } from "node:fs";
import { Context } from "@deepseek-ai/cordis";
import { beforeAll, describe, expect, it } from "vitest";

const LIB_ENTRY = new URL("../lib/index.mjs", import.meta.url);

interface ToolDef {
  execute: unknown;
  parameters: unknown;
  output?: { render?: unknown };
}

let plugin: { name: string; inject: string[]; apply: (ctx: Context, cfg: object) => void };

beforeAll(async () => {
  if (!existsSync(LIB_ENTRY)) {
    throw new Error("lib/index.mjs is missing — run `pnpm build` before the test suite");
  }
  plugin = (await import(LIB_ENTRY.href)) as typeof plugin;
});

/** Mount the built plugin with `lazyTools: false` so the whole suite registers eagerly. */
function mountWithRecordingTools(config: object = {}): Map<string, ToolDef> {
  const registered = new Map<string, ToolDef>();
  const ctx = new Context();
  ctx.provide("tools", {
    register(def: ToolDef & { name: string }) {
      registered.set(def.name, def);
      return () => {
        registered.delete(def.name);
      };
    },
  });
  plugin.apply(ctx, { lazyTools: false, ...config });
  return registered;
}

describe("built plugin mounts into a real host", () => {
  it("exports the Cordis plugin contract the loader requires", () => {
    expect(plugin.name).toBe("dsh-browser-skill");
    expect(plugin.inject).toContain("tools");
    expect(typeof plugin.apply).toBe("function");
  });

  it("registers the six browser tools against a recording tools service", () => {
    const registered = mountWithRecordingTools();

    expect([...registered.keys()].sort()).toEqual([
      "browser_assist",
      "browser_inspect",
      "browser_interact",
      "browser_page",
      "browser_session",
      "browser_tabs",
    ]);
  });

  it("gives every tool the mandatory dsh output contract", () => {
    const registered = mountWithRecordingTools();

    for (const [name, def] of registered) {
      expect(typeof def.execute, `${name}.execute`).toBe("function");
      expect(def.output, `${name}.output`).toBeDefined();
      expect(typeof def.output?.render, `${name}.output.render`).toBe("function");
      expect(def.parameters, `${name}.parameters`).toBeDefined();
    }
  });

  it("registers nothing at load time when lazyTools keeps the suite behind the skill", () => {
    const registered = mountWithRecordingTools({ lazyTools: true });

    expect(registered.size).toBe(0);
  });
});