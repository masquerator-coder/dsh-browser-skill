// @vitest-environment happy-dom
// browser_inspect keyed toolview: view-model derivation from frozen blocks,
// image/path-only/running/error rendering, the registration key, and the
// session-bound attachment loader.

import type { RunningToolCall, ToolResultNode } from "@deepseek-ai/dsh-client-ui-chat/client";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  BrowserInspectToolView,
  type BrowserInspectToolViewProps,
  viewModelOf,
} from "../../src/client/BrowserInspectToolView";
import { apply } from "../../src/client/index";

const ATTACHMENT = {
  attachmentId: "sha256:abc123",
  mediaType: "image/png",
  bytes: 8,
  width: 800,
  height: 457,
  name: "screenshot-s1.png",
} as never;

/**
 * dsh 0.2 discriminates a tool view on `phase`, and only `start`/`result` carry
 * dispatched arguments. `RunningToolCall` splits into `preparing` (identity
 * only) and `start` (arguments available), so the fixtures build the whole
 * phase props rather than a bare block.
 */
function runningBlock(argsRaw: string): RunningToolCall {
  return {
    phase: "start",
    callId: "c1",
    name: "browser_inspect",
    argsRaw,
    turn: 1,
    step: 1,
    time: 0,
    subCalls: [],
  } as never;
}

function settledBlock(argsRaw: string, content: unknown[], isError = false): ToolResultNode {
  return {
    kind: "tool-result",
    seq: 1,
    time: 0,
    callId: "c1",
    call: { name: "browser_inspect", argsRaw },
    callTime: 0,
    content,
    isError,
    subCalls: [],
  } as never;
}

/** Wrap a phase block the way the slot runtime hands it to a toolview. */
function phaseProps(
  phase: "preparing" | "start" | "result",
  block: unknown,
  extra: Record<string, unknown> = {},
): BrowserInspectToolViewProps {
  return {
    phase,
    block,
    callId: "c1",
    toolName: "browser_inspect",
    openFile: () => {},
    ...extra,
  } as unknown as BrowserInspectToolViewProps;
}

const IMAGE_TEXT = "[session s1] screenshot of tab 7 (800x457px)";
const PATH_TEXT = "[session s1] screenshot saved to /tmp/shot.png (800x457px, 8 bytes)";

afterEach(cleanup);

describe("viewModelOf", () => {
  it("keeps a DSH 0.2 preparing call renderable before arguments exist", () => {
    const model = viewModelOf(phaseProps("preparing", { callId: "c1", name: "browser_inspect" }));
    expect(model.state).toBe("running");
    expect(model.command).toBe("browser_inspect (c1)");
    expect(model.image).toBeNull();
    expect(model.output).toBeNull();
  });

  it("derives the running model from the call frame", () => {
    const model = viewModelOf(
      phaseProps("start", runningBlock('{"action":"screenshot","session":"s1"}')),
    );
    expect(model.state).toBe("running");
    expect(model.command).toBe("bsk screenshot --session s1");
    expect(model.image).toBeNull();
  });

  it("marks settled results carrying an image block", () => {
    const block = settledBlock('{"action":"screenshot"}', [
      { type: "text", text: IMAGE_TEXT },
      { type: "image", attachment: ATTACHMENT },
    ]);
    const model = viewModelOf(phaseProps("result", block));
    expect(model.state).toBe("ok");
    expect(model.image).toBe(ATTACHMENT);
    expect(model.output).toBe(IMAGE_TEXT);
    expect(model.command).toBe("bsk screenshot --session (current)");
  });

  it("keeps the path-only form image-free", () => {
    const model = viewModelOf(
      phaseProps(
        "result",
        settledBlock('{"action":"screenshot"}', [{ type: "text", text: PATH_TEXT }]),
      ),
    );
    expect(model.state).toBe("ok");
    expect(model.image).toBeNull();
    expect(model.summary).toBe(PATH_TEXT);
  });

  it("marks error results", () => {
    const model = viewModelOf(
      phaseProps(
        "result",
        settledBlock('{"action":"screenshot"}', [{ type: "text", text: "Error: boom" }], true),
      ),
    );
    expect(model.state).toBe("error");
  });

  it("renders non-screenshot inspect actions as ordinary terminal calls", () => {
    const model = viewModelOf(
      phaseProps(
        "result",
        settledBlock('{"action":"observe","session":"s1"}', [
          { type: "text", text: "page observation" },
        ]),
      ),
    );
    expect(model.title).toBe("Observe");
    expect(model.command).toBe("bsk observe --session s1");
    expect(model.image).toBeNull();
  });

  it("preserves action-specific arguments in diagnostic command cards", () => {
    const model = viewModelOf(
      phaseProps(
        "start",
        runningBlock(
          '{"action":"console","session":"s1","tabId":7,"since":4,"limit":20,"maxTextChars":500,"includeStack":true}',
        ),
      ),
    );
    expect(model.command).toBe(
      "bsk console --session s1 --tab-id 7 --since 4 --limit 20 --max-text-chars 500 --include-stack",
    );
  });

  it("falls back to identity when window truncation left the call head outside", () => {
    // `result` backfills `call` as null; the row still renders from callId.
    const truncated = { ...settledBlock("", [{ type: "text", text: "orphan" }]), call: null };
    const model = viewModelOf(phaseProps("result", truncated));
    expect(model.state).toBe("ok");
    expect(model.output).toBe("orphan");
    expect(model.command).toBe("browser_inspect (c1)");
  });
});

describe("BrowserInspectToolView", () => {
  const renderView = (
    props: BrowserInspectToolViewProps,
    loadImage: BrowserInspectToolViewProps["loadImage"],
  ) => render(<BrowserInspectToolView {...props} loadImage={loadImage} />);

  it("renders the screenshot image through the loader", async () => {
    const block = settledBlock('{"action":"screenshot"}', [
      { type: "text", text: IMAGE_TEXT },
      { type: "image", attachment: ATTACHMENT },
    ]);
    const loadImage = vi.fn(async () => "blob:mock-url");
    renderView(phaseProps("result", block), loadImage);
    // Collapsed row shows the summary; expand to reach the image.
    expect(screen.getByText(IMAGE_TEXT)).toBeTruthy();
    expect(loadImage).not.toHaveBeenCalled();
    const toggle = screen.getByRole("button", { name: /screenshot/i });
    toggle.click();
    await waitFor(() => expect(loadImage).toHaveBeenCalledWith(ATTACHMENT));
    await screen.findByRole("img", { name: "screenshot-s1.png" });
  });

  it("renders the path-only form without touching the loader", async () => {
    const block = settledBlock('{"action":"screenshot"}', [{ type: "text", text: PATH_TEXT }]);
    const loadImage = vi.fn(async () => "blob:unused");
    renderView(phaseProps("result", block), loadImage);
    screen.getByRole("button", { name: /screenshot/i }).click();
    await screen.findByText(PATH_TEXT, { exact: false });
    expect(loadImage).not.toHaveBeenCalled();
  });

  it("renders the running form without output", () => {
    const loadImage = vi.fn();
    renderView(phaseProps("start", runningBlock('{"action":"screenshot"}')), loadImage);
    expect(screen.getByText("bsk screenshot --session (current)")).toBeTruthy();
    expect(loadImage).not.toHaveBeenCalled();
  });
});

describe("client plugin registration", () => {
  it("registers the browser_inspect toolview and the shell observation overlay", () => {
    const registrations: { name: string; key?: string; id?: string }[] = [];
    const sessions = { binding: () => undefined };
    const ctx = {
      get: (key: string) => (key === "sessions" ? sessions : undefined),
      // cordis ctx.inject: the betterSidebar carrier upgrade stays dormant in
      // this composition (the callback only runs once the service exists).
      inject: (_deps: string[], _fn: (injected: unknown) => unknown) => {},
      slots: {
        inject: (_name: string, fn: () => unknown) => fn(),
        register: (slot: { name: string; key?: string; id?: string }, view: unknown) => {
          registrations.push(slot);
          expect(typeof view).toBe("function");
        },
      },
    };
    apply(ctx as never);
    expect(registrations).toEqual([
      { name: "tool.call.toolview", key: "browser_inspect" },
      { name: "shell.overlay", id: "bsk-observation" },
    ]);
  });
});
