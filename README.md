# dsh-browser-skill

A [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) plugin that exposes
[BrowserSkill](https://github.com/wxg-prc-cpg/browser-skill) browser automation to the model as
`browser_*` tools, plus a Web UI half that renders screenshots and a live observation overlay.

Ported from the BrowserSkill monorepo's `packages/dsh-plugin-browserskill`, retargeted from
dsh `0.1.5-rc.3` to `0.2.0-rc.2`.

## What it ships

**Host half** — six tools, registered under the Cordis plugin id `dsh-browser-skill`:

| Tool | Purpose |
| --- | --- |
| `browser_session` | Start, list, and stop browser sessions (profiles, headless, CDP attach) |
| `browser_tabs` | List, open, close, and activate tabs |
| `browser_page` | Navigate, wait, and read the current page |
| `browser_interact` | Click, type, fill, scroll, and run key sequences |
| `browser_inspect` | Observe, screenshot, read HTML/console/network, snapshot |
| `browser_assist` | Recover from a stuck session; summarize what the browser knows |

**Skill** — `skill/SKILL.md` plus five references, telling the model when and how to drive the
tools. `scripts/check-skill.mjs` asserts every shipped tool is documented and vice versa.

**Client half** — `lib/client.cjs`, a CommonJS module-loader bundle the Web shell materializes.
It registers a `browser_inspect` tool view (screenshot cards) and a `shell.overlay` seat for the
live observation sidebar. React and the `@deepseek-ai/dsh-client-ui-primitives` are supplied by
the shell, not bundled.

## Requirements

- The `bsk` CLI on `PATH` (the plugin shells out to it; it does not embed a browser).
- A running daemon. Start it yourself with `bsk daemon start` — the plugin will not auto-start
  one, because a daemon spawned under a Windows Job Object fails to detach (`os error 5`).

## Install

```sh
dsh plugin --profile <name> add file:/path/to/dsh-browser-skill
```

The package declares both `dsh.bundle.patch` (host) and `dsh.client` (Web UI), so adding it as a
profile bundle is sufficient.

## Development

```sh
pnpm install
pnpm run verify     # typecheck + build + tests + skill check + publint
```

Individual steps:

| Script | Does |
| --- | --- |
| `pnpm run build` | Regenerates embedded skill content, then builds both faces into `lib/` |
| `pnpm run typecheck` | `tsc --noEmit` over the whole tree, both faces |
| `pnpm test` | Builds, then runs the vitest suite (host and client) |
| `pnpm run check:skill` | Asserts shipped tools and `SKILL.md` agree |

## Two things worth knowing before you change anything

**1. The client face's external list is fixed by the shell.**
`tsdown.config.ts` keeps a hardcoded `CLIENT_EXTERNALS` table. The authoritative list lives at
`packages/client/web/src/platform.ts` in the DSH checkout (`platformModules`). If it drifts, the
client bundle will either bundle something the shell also provides (two React copies) or emit a
`require()` the loader cannot satisfy. Re-read that file before editing the table.

**2. Tool views are discriminated on `phase`, and `result.call` is nullable.**
In dsh 0.2 a tool view receives
`{ phase: 'preparing' | 'start' | 'result', block, ... }`. Only `start` and `result` carry
dispatched arguments, and on `result` the call head is backfilled as `call: ToolResultNode['call']`,
which is `null` when log-window truncation left the original `tool/call` outside the window.
Narrow through `props` itself rather than destructuring `block` first, or TypeScript will widen
the result to `any` and silently stop checking it.

## Layout

```
src/                 host half (tools, sessions, runner, skill loader)
src/client/          Web UI half (tool view, observation overlay, store)
skill/               SKILL.md + references, embedded into the host bundle at build time
scripts/             skill content generation and validation
tests/               vitest; tests/client/* exercise the real built client bundle
cordis.patch.yml     the profile bundle patch entry
```

## Notes on the dsh peer range

Peer ranges are `>=0.2.0-rc.1 <0.3.0-0`. The `-0` is load-bearing: without it semver admits
`0.3.0-rc.1`, which is a different minor line than the one these tools were ported against.