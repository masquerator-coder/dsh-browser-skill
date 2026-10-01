import { createRequire } from "node:module";
import path from "node:path";
import { defineConfig } from "vitest/config";

const require = createRequire(import.meta.url);
// react is external in the shipped client bundle (the dsh shell provides it),
// so the tests must exercise the same copy the bundle expects rather than
// whatever a transitive dependency hoisted.
const reactDir = path.dirname(require.resolve("react/package.json"));
const reactDomDir = path.dirname(require.resolve("react-dom/package.json"));

export default defineConfig({
  resolve: {
    alias: {
      react: reactDir,
      "react-dom": reactDomDir,
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    server: {
      deps: {
        // dsh client packages ship ESM with CSS imports; run them through the
        // transform pipeline (where CSS is stubbed) instead of Node's loader.
        inline: [/@deepseek-ai\//],
      },
    },
  },
});