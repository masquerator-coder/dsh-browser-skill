// Validate the packaged skill directory: frontmatter, link routing, the entry
// size budget, and that every model-facing browser tool is documented.
// Also verifies the built lib/ resolves the skill resourceBase correctly, so a
// published package cannot ship a skill whose references 404 at runtime.
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DSH_BROWSER_TOOLS, validateSkillDirectory } from "./validate-skill.mjs";

const pkg = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { name, description, files } = validateSkillDirectory(join(pkg, "skill"), {
  maxEntryBytes: 4_500,
  browserTools: DSH_BROWSER_TOOLS,
});

// The plugin registers `resourceBase` as `new URL("../skill/", import.meta.url)`
// from the built lib/index.mjs. Confirm that resolves to this same directory.
const libEntry = join(pkg, "lib", "index.mjs");
if (existsSync(libEntry)) {
  const resolved = fileURLToPath(new URL("../skill/", `file:///${libEntry.replaceAll("\\", "/")}`));
  assert.equal(
    resolve(resolved),
    join(pkg, "skill"),
    "built lib/ must resolve resourceBase to the package skill/ directory",
  );
}

console.log(
  `skill "${name}" ok: ${files.size} files, ${DSH_BROWSER_TOOLS.length} tools documented\n  ${description}`,
);