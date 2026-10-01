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

**Progressive disclosure** — by default the six tool schemas stay *out of the system prompt*
until the `browser-skill` skill has actually been invoked. The skill's catalog entry is the only
advertisement at first, so a session that never loads the skill sees no `browser_*` tools at all:

```text
skill({ name: "browser-skill" })   # once per process; reveals the whole suite
```

The reveal is idempotent and survives session resume (the plugin scans durable history for a past
successful invocation). Set `lazyTools: false` to register the full suite at load instead.

**Client half** — `lib/client.cjs`, a CommonJS module-loader bundle the Web shell materializes.
It registers a `browser_inspect` tool view (screenshot cards) and a `shell.overlay` seat for the
live observation sidebar. React and the `@deepseek-ai/dsh-client-ui-primitives` are supplied by
the shell, not bundled.

## Requirements

- The `bsk` CLI on `PATH` (the plugin shells out to it; it does not embed a browser).
- A running daemon — **provided for you**. The plugin hosts one itself when none answers, so
  there is nothing to start by hand.

### Why the plugin hosts the daemon

`bsk` normally auto-spawns its daemon as an independent, detached process
(`CREATE_BREAKAWAY_FROM_JOB`). A host that runs every command inside a `KILL_ON_JOB_CLOSE` Job
without `JOB_OBJECT_LIMIT_BREAKAWAY_OK` — dsh's own sandbox does exactly this — makes that
impossible, and `bsk` deliberately refuses rather than leaving a daemon pinned to a doomed Job:

```text
cannot start an independent Windows daemon; the host may prohibit Job Object
breakaway ... Run `bsk daemon start --foreground` in a persistent host task
outside the per-command Job ... 拒绝访问。 (os error 5)
```

Rather than defeat the restriction, the plugin uses the form it allows: `bsk daemon start
--foreground` as a child of the plugin, inside the same Job, never asking to break away. It is
stopped when the plugin unloads, which is what the Job was asking for anyway.

Consequences worth knowing:

- A daemon started any other way (an independent terminal, a service, another agent) is left
  completely alone — hosting runs only when nothing answers, and only the child the plugin
  started is ever stopped.
- Once hosting is in effect, every `bsk` call gets `BSK_AUTO_START=0`, so a tool call never
  re-runs the breakaway probe this host is known to refuse.
- The hosted daemon keeps `bsk`'s default 30-minute idle timeout and is rebuilt on demand, so an
  idle gap costs nothing at the next tool call.
- Set `hostDaemon: false` to opt out and manage the daemon yourself.

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