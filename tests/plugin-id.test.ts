// dsh keys the plugin by `export const name`, which must stay identical to the
// published package name: the host resolves the patch entry by that specifier,
// and the client bundle registers itself under the same id.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { name } from "../src/index";

const pkg = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "package.json"), "utf8"),
) as {
  name: string;
  dsh: {
    bundle?: { patch?: string };
    client?: { platform?: string; inject?: string[]; external?: string[] };
  };
};

describe("plugin identity", () => {
  it("uses the published package name as the Cordis plugin id", () => {
    expect(name).toBe("dsh-browser-skill");
    expect(name).toBe(pkg.name);
  });

  it("declares the bundle patch the profile loader stacks", () => {
    expect(pkg.dsh.bundle?.patch).toBe("./cordis.patch.yml");
  });

  it("declares the web client half the shell materializes", () => {
    expect(pkg.dsh.client?.platform).toBe("web");
    expect(pkg.dsh.client?.inject).toEqual([
      "@deepseek-ai/dsh-client-ui-tool",
      "@deepseek-ai/dsh-client-ui-layout",
    ]);
    expect(pkg.dsh.client?.external).toEqual(["@deepseek-ai/dsh-client-ui-primitives"]);
  });

  it("publishes the client bundle under the package name the loader keys on", () => {
    // tsdown reads the __ModuleLoader__ id from package.json, and `name` above
    // must equal it, or the host resolves the patch entry to a different id
    // than the bundle registers under and the client half never loads.
    const built = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "..", "lib", "client.cjs"),
      "utf8",
    );
    // Assert the id value rather than the banner's exact formatting.
    const registered = /window\.__ModuleLoader__\.load\(\{\s*id:\s*("(?:[^"\\]|\\.)*")/.exec(built);
    expect(registered?.[1]).toBe(JSON.stringify(pkg.name));
  });
});