window.__ModuleLoader__.load({
	id: "dsh-browser-skill",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		//#endregion
		let react = require("react");
		react = __toESM(react, 1);
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		let react_dom = require("react-dom");
		//#region \0bsk-css:D:\Coding\DSH-Plugin\dsh-browser-skill\src\client\bsk-tokens.nomodule.css.mjs
		const css$3 = ".bsk-obs{color-scheme:light dark;--background:oklch(99% .005 50);--foreground:oklch(14% .03 50);--card:oklch(99.5% .003 50/.82);--card-foreground:oklch(14% .03 50);--primary:oklch(62% .22 45);--primary-foreground:oklch(99% .01 50);--secondary:oklch(96% .04 65);--secondary-foreground:oklch(25% .08 65);--muted:oklch(96% .01 50);--muted-foreground:oklch(55% .04 50);--accent:oklch(96% .04 65);--accent-foreground:oklch(25% .08 65);--destructive:oklch(60% .25 25);--destructive-foreground:oklch(99% .01 50);--border:oklch(90% .025 60);--input:oklch(90% .025 60);--ring:oklch(62% .22 45);--radius:.75rem}@media (prefers-color-scheme:dark){.bsk-obs{--background:oklch(20% .02 50);--foreground:oklch(98% .01 50);--card:oklch(24% .02 50/.82);--card-foreground:oklch(98% .01 50);--primary:oklch(70% .18 45);--primary-foreground:oklch(14% .03 50);--secondary:oklch(32% .03 60);--secondary-foreground:oklch(98% .01 50);--muted:oklch(30% .02 50);--muted-foreground:oklch(75% .03 50);--accent:oklch(32% .03 60);--accent-foreground:oklch(98% .01 50);--destructive:oklch(45% .2 25);--destructive-foreground:oklch(98% .01 50);--border:oklch(35% .02 60);--input:oklch(35% .02 60);--ring:oklch(70% .18 45)}}";
		const tagId$3 = "dsh-browser-skill/bsk-tokens.nomodule.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-browser-skill";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0bsk-css:D:\Coding\DSH-Plugin\dsh-browser-skill\src\client\BrowserInspectToolView.module.css.mjs
		const css$2 = ".gJDkLa_card{flex-direction:column;display:flex}.gJDkLa_summary{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-secondary);margin-left:6px;overflow:hidden}.gJDkLa_card[data-state=error] .gJDkLa_summary{color:var(--dsw-alias-label-error)}.gJDkLa_body{flex-direction:column;gap:8px;padding:4px 0 4px 22px;display:flex}.gJDkLa_image-wrap{display:flex}.gJDkLa_inspect-button{font:inherit;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;align-self:flex-start;padding:0;font-size:12px}.gJDkLa_inspect-button:hover{color:var(--dsw-alias-label-secondary)}.gJDkLa_inspect-button:focus-visible{outline:2px solid var(--dsw-alias-border-focus);outline-offset:2px;border-radius:2px}@media (prefers-reduced-motion:reduce){.gJDkLa_inspect-button{transition:none}}";
		const tagId$2 = "dsh-browser-skill/BrowserInspectToolView.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-browser-skill";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var BrowserInspectToolView_module_css_default = {
			"image-wrap": "gJDkLa_image-wrap",
			"card": "gJDkLa_card",
			"body": "gJDkLa_body",
			"inspect-button": "gJDkLa_inspect-button",
			"summary": "gJDkLa_summary"
		};
		//#endregion
		//#region \0bsk-css:D:\Coding\DSH-Plugin\dsh-browser-skill\src\client\ScreenshotImage.module.css.mjs
		const css$1 = ".MqGXzW_frame{place-items:center;max-width:100%;display:grid}.MqGXzW_status,.MqGXzW_retry{overflow-wrap:anywhere;text-align:center;max-width:100%}.MqGXzW_status{font-size:12px}.MqGXzW_thumbnail,.MqGXzW_retry,.MqGXzW_preview button{font:inherit;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);cursor:pointer;border-radius:8px}.MqGXzW_thumbnail{width:100%;height:100%;padding:0;display:block;overflow:hidden}.MqGXzW_thumbnail img{width:100%;height:100%;display:block}.MqGXzW_retry{padding:6px 8px}.MqGXzW_preview button{padding:6px 10px}.MqGXzW_thumbnail:focus-visible,.MqGXzW_retry:focus-visible,.MqGXzW_preview button:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.MqGXzW_preview{box-sizing:border-box;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:12px;padding:16px}.MqGXzW_preview::backdrop{background:var(--dsw-alias-bg-mask-photo)}.MqGXzW_preview form{justify-content:flex-end;margin:0 0 12px;display:flex}.MqGXzW_preview img{width:auto;max-width:100%;height:auto;max-height:calc(100vh - 112px);display:block}";
		const tagId$1 = "dsh-browser-skill/ScreenshotImage.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-browser-skill";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var ScreenshotImage_module_css_default = {
			"thumbnail": "MqGXzW_thumbnail",
			"frame": "MqGXzW_frame",
			"status": "MqGXzW_status",
			"retry": "MqGXzW_retry",
			"preview": "MqGXzW_preview"
		};
		//#endregion
		//#region src/client/ScreenshotImage.tsx
		const MIN_EDGE = 60;
		const MAX_EDGE = 240;
		/** Plugin-owned presentation: DSH's attachment client no longer exports image components. */
		function ScreenshotImage({ attachment, load }) {
			const [image, setImage] = (0, react.useState)({ status: "loading" });
			const [attempt, setAttempt] = (0, react.useState)(0);
			const [open, setOpen] = (0, react.useState)(false);
			const label = attachment.name ?? "screenshot";
			const naturalRatio = attachment.width / attachment.height;
			const ratio = Math.min(4, Math.max(.25, naturalRatio));
			const width = Math.max(MIN_EDGE * Math.max(1, ratio), Math.min(MAX_EDGE, MAX_EDGE * ratio, attachment.width, attachment.height * ratio));
			(0, react.useEffect)(() => {
				let active = true;
				let url;
				setImage({ status: "loading" });
				setOpen(false);
				load(attachment).then((loaded) => {
					if (!active) URL.revokeObjectURL(loaded);
					else {
						url = loaded;
						setImage({
							status: "ready",
							url: loaded
						});
					}
				}, () => {
					if (active) setImage({ status: "error" });
				});
				return () => {
					active = false;
					if (url !== void 0) URL.revokeObjectURL(url);
				};
			}, [
				attachment,
				load,
				attempt
			]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: ScreenshotImage_module_css_default.frame,
				style: {
					width,
					aspectRatio: String(ratio)
				},
				children: image.status === "loading" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					role: "status",
					className: ScreenshotImage_module_css_default.status,
					children: "Loading…"
				}) : image.status === "error" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: ScreenshotImage_module_css_default.retry,
					"aria-label": "Load failed — retry",
					title: "Load failed — retry",
					onClick: () => setAttempt((value) => value + 1),
					children: "Retry"
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: ScreenshotImage_module_css_default.thumbnail,
					title: "Open the original screenshot",
					"aria-label": `Open screenshot ${label}`,
					onClick: () => setOpen(true),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
						src: image.url,
						alt: label,
						width: attachment.width,
						height: attachment.height,
						style: {
							objectFit: naturalRatio === ratio ? "scale-down" : "cover",
							objectPosition: naturalRatio < .25 ? "center top" : naturalRatio > 4 ? "left center" : "center"
						},
						onError: () => setImage({ status: "error" })
					})
				})
			}), open && image.status === "ready" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ScreenshotPreview, {
				src: image.url,
				label,
				onClose: () => setOpen(false)
			})] });
		}
		function ScreenshotPreview({ src, label, onClose }) {
			const ref = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				const dialog = ref.current;
				dialog.showModal();
				return () => dialog.close();
			}, []);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("dialog", {
				ref,
				className: ScreenshotImage_module_css_default.preview,
				"aria-label": "Screenshot preview",
				onClose: () => {
					if (!ref.current?.open) onClose();
				},
				onClick: (event) => {
					if (event.target !== event.currentTarget) return;
					const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect();
					if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) event.currentTarget.close();
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("form", {
					method: "dialog",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "submit",
						autoFocus: true,
						children: "Close preview"
					})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
					src,
					alt: label
				})]
			});
		}
		//#endregion
		//#region src/client/BrowserInspectToolView.tsx
		const TERMINAL_LABELS = {
			signal: (signal) => `Signal ${signal}`,
			exitCode: (exitCode) => `Exit code ${exitCode}`,
			running: "Running",
			failed: "Failed",
			done: "Done",
			copy: "Copy",
			copied: "Copied",
			noOutput: "No output",
			noExitCode: "No exit code",
			collapseAria: "Collapse output",
			collapse: "Collapse",
			expandAria: (hidden) => `Expand the remaining ${hidden} output lines`,
			expand: (hidden) => `… ${hidden} more lines`
		};
		function firstLine(text) {
			const newline = text.indexOf("\n");
			return newline === -1 ? text : text.slice(0, newline);
		}
		/** Rebuild the command line from the logged arguments (mirrors the host presenter). */
		const INSPECT_COMMANDS = {
			observe: "observe",
			snapshot: "snapshot",
			html: "get-html",
			screenshot: "screenshot",
			console: "console",
			network: "network"
		};
		function titleOf(action) {
			return action === "html" ? "HTML" : `${action.slice(0, 1).toUpperCase()}${action.slice(1)}`;
		}
		function appendNumber(parts, flag, value) {
			if (typeof value === "number" && Number.isFinite(value)) parts.push(flag, String(value));
		}
		function commandOf(argsRaw, callId) {
			try {
				const args = JSON.parse(argsRaw);
				const action = typeof args.action === "string" ? args.action : "inspect";
				const parts = [
					"bsk",
					INSPECT_COMMANDS[action] ?? action,
					"--session"
				];
				parts.push(typeof args.session === "string" && args.session !== "" ? args.session : "(current)");
				if (action === "observe" && typeof args.cursor === "string") parts.push("--cursor", args.cursor);
				if (action === "observe" || action === "snapshot") {
					appendNumber(parts, "--max-depth", args.maxDepth);
					appendNumber(parts, "--max-tokens", args.maxTokens);
				}
				if (action === "html" || action === "console" || action === "network") appendNumber(parts, "--tab-id", args.tabId);
				if ((action === "html" || action === "screenshot") && typeof args.ref === "string") {
					if (args.ref !== "") parts.push("--ref", args.ref);
				}
				if (action === "html") appendNumber(parts, "--max-bytes", args.maxBytes);
				if (action === "console" || action === "network") {
					appendNumber(parts, "--since", args.since);
					appendNumber(parts, "--limit", args.limit);
					appendNumber(parts, "--max-text-chars", args.maxTextChars);
				}
				if (action === "console" && args.includeStack === true) parts.push("--include-stack");
				return {
					command: parts.join(" "),
					title: titleOf(action)
				};
			} catch {
				return {
					command: argsRaw === "" ? `browser_inspect (${callId})` : `browser_inspect ${firstLine(argsRaw)}`,
					title: "Inspect"
				};
			}
		}
		/**
		* Derive the display model from the frozen block only.
		*
		* dsh 0.2 types `ToolCallViewProps` as a union discriminated on `phase`
		* (`preparing` | `start` | `result`), and only `start`/`result` carry
		* dispatched arguments; `preparing` has none yet. `result` additionally
		* backfills the call head as `call | null` (null when log-window truncation
		* left the original `tool/call` outside), so the raw arguments are read from
		* whichever source the phase actually provides.
		*/
		function viewModelOf(props) {
			if (props.phase === "preparing") {
				const { command, title } = commandOf("", props.block.callId);
				return {
					state: "running",
					command,
					output: null,
					image: null,
					summary: command,
					title
				};
			}
			if (props.phase === "start") {
				const { command, title } = commandOf(props.block.argsRaw, props.block.callId);
				return {
					state: "running",
					command,
					output: null,
					image: null,
					summary: command,
					title
				};
			}
			const { block } = props;
			const { command, title } = commandOf(block.call?.argsRaw ?? "", block.callId);
			const textBlock = block.content.find((item) => item.type === "text");
			const imageBlock = block.content.find((item) => item.type === "image");
			const output = textBlock !== void 0 && textBlock.type === "text" ? textBlock.text : null;
			const image = imageBlock !== void 0 && imageBlock.type === "image" ? imageBlock.attachment : null;
			return {
				state: block.isError ? "error" : "ok",
				command,
				output,
				image,
				summary: output !== null ? firstLine(output) : command,
				title
			};
		}
		function dotState(state) {
			switch (state) {
				case "running": return "ongoing";
				case "error": return "error";
				default: return "done";
			}
		}
		/**
		* Render one browser_inspect call: a disclosure row over a terminal block,
		* plus the screenshot image when that action returns an image attachment.
		*/
		function BrowserInspectToolView(props) {
			const { cwd, inspect, loadImage } = props;
			const model = viewModelOf(props);
			const [expanded, setExpanded] = (0, react.useState)(false);
			const expandable = model.state === "running" || model.output !== null || model.image !== null;
			const open = expanded && expandable;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: BrowserInspectToolView_module_css_default.card,
				"data-tool": "browser_inspect",
				"data-state": model.state,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.DisclosureRow, {
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.StateDot, { state: dotState(model.state) }),
					title: model.title,
					open,
					expandable,
					onToggle: () => setExpanded((value) => !value),
					expandOnRowClick: true,
					previewChevron: true,
					collapsedContent: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: BrowserInspectToolView_module_css_default.summary,
						children: model.summary
					}),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: BrowserInspectToolView_module_css_default.body,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.TerminalBlock, {
								command: model.command,
								cwd: cwd ?? void 0,
								output: model.output ?? void 0,
								running: model.state === "running",
								labels: TERMINAL_LABELS
							}),
							model.image !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: BrowserInspectToolView_module_css_default["image-wrap"],
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ScreenshotImage, {
									attachment: model.image,
									load: loadImage
								}, model.image.attachmentId)
							}) : null,
							inspect !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: BrowserInspectToolView_module_css_default["inspect-button"],
								onClick: inspect,
								children: "Inspect"
							}) : null
						]
					})
				})
			});
		}
		//#endregion
		//#region node_modules/.pnpm/@remixicon+react@4.9.0_react@18.3.1/node_modules/@remixicon/react/index.mjs
		/**
		* @remixicon/react v4.1.0 - Remix Icon License 1.0
		*/
		const f1 = ({ color: C = "currentColor", size: e = 24, className: l, ...i }) => react.default.createElement("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			width: e,
			height: e,
			fill: C,
			...i,
			className: "remixicon " + (l || "")
		}, react.default.createElement("path", { d: "M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" }));
		const s7 = ({ color: C = "currentColor", size: e = 24, className: l, ...i }) => react.default.createElement("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			width: e,
			height: e,
			fill: C,
			...i,
			className: "remixicon " + (l || "")
		}, react.default.createElement("path", { d: "M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z" }));
		const A7 = ({ color: C = "currentColor", size: e = 24, className: l, ...i }) => react.default.createElement("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			width: e,
			height: e,
			fill: C,
			...i,
			className: "remixicon " + (l || "")
		}, react.default.createElement("path", { d: "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z" }));
		const P7 = ({ color: C = "currentColor", size: e = 24, className: l, ...i }) => react.default.createElement("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			width: e,
			height: e,
			fill: C,
			...i,
			className: "remixicon " + (l || "")
		}, react.default.createElement("path", { d: "M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" }));
		const Rt = ({ color: C = "currentColor", size: e = 24, className: l, ...i }) => react.default.createElement("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			width: e,
			height: e,
			fill: C,
			...i,
			className: "remixicon " + (l || "")
		}, react.default.createElement("path", { d: "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" }));
		const Yn = ({ color: C = "currentColor", size: e = 24, className: l, ...i }) => react.default.createElement("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			width: e,
			height: e,
			fill: C,
			...i,
			className: "remixicon " + (l || "")
		}, react.default.createElement("path", { d: "M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM15 5H4V19H15V5ZM20 5H17V19H20V5Z" }));
		const hg = ({ color: C = "currentColor", size: e = 24, className: l, ...i }) => react.default.createElement("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			width: e,
			height: e,
			fill: C,
			...i,
			className: "remixicon " + (l || "")
		}, react.default.createElement("path", { d: "M21 3C21.5523 3 22 3.44772 22 4V11H20V5H4V19H10V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM21 13C21.5523 13 22 13.4477 22 14V20C22 20.5523 21.5523 21 21 21H13C12.4477 21 12 20.5523 12 20V14C12 13.4477 12.4477 13 13 13H21ZM20 15H14V19H20V15ZM6.70711 6.29289L8.95689 8.54289L11 6.5V12H5.5L7.54289 9.95689L5.29289 7.70711L6.70711 6.29289Z" }));
		const SM = ({ color: C = "currentColor", size: e = 24, className: l, ...i }) => react.default.createElement("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			width: e,
			height: e,
			fill: C,
			...i,
			className: "remixicon " + (l || "")
		}, react.default.createElement("path", { d: "M22.3126 10.1753L20.8984 11.5895L20.1913 10.8824L15.9486 15.125L15.2415 18.6606L13.8273 20.0748L9.58466 15.8321L4.63492 20.7819L3.2207 19.3677L8.17045 14.4179L3.92781 10.1753L5.34202 8.76107L8.87756 8.05396L13.1202 3.81132L12.4131 3.10422L13.8273 1.69L22.3126 10.1753Z" }));
		const LN = ({ color: C = "currentColor", size: e = 24, className: l, ...i }) => react.default.createElement("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			width: e,
			height: e,
			fill: C,
			...i,
			className: "remixicon " + (l || "")
		}, react.default.createElement("path", { d: "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM9 9H15V15H9V9Z" }));
		const Tz = ({ color: C = "currentColor", size: e = 24, className: l, ...i }) => react.default.createElement("svg", {
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			width: e,
			height: e,
			fill: C,
			...i,
			className: "remixicon " + (l || "")
		}, react.default.createElement("path", { d: "M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM20 11H4V19H20V11ZM20 5H4V9H20V5ZM11 6V8H9V6H11ZM7 6V8H5V6H7Z" }));
		//#endregion
		//#region src/client/cn.ts
		/** Flatten a class-value tree into a single space-separated string. */
		function cn(...inputs) {
			const out = [];
			const walk = (value) => {
				if (value === null || value === void 0 || value === false || value === "") return;
				if (typeof value === "string" || typeof value === "number") {
					out.push(String(value));
					return;
				}
				if (Array.isArray(value)) {
					for (const item of value) walk(item);
					return;
				}
				if (typeof value === "object") {
					for (const [key, enabled] of Object.entries(value)) if (enabled) out.push(key);
				}
			};
			for (const input of inputs) walk(input);
			return out.join(" ");
		}
		//#endregion
		//#region \0bsk-css:D:\Coding\DSH-Plugin\dsh-browser-skill\src\client\ObservationOverlay.module.css.mjs
		const css = ".aoTVaa_card{z-index:40;pointer-events:auto;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);color:var(--card-foreground);flex-direction:column;display:flex;position:fixed;overflow:hidden;box-shadow:0 8px 28px #0000002e}.aoTVaa_body{background:var(--card);height:100%;min-height:0;color:var(--card-foreground);flex-direction:column;font-size:12px;display:flex}.aoTVaa_sidebar-tab{flex-direction:column;height:100%;min-height:0;display:flex}.aoTVaa_sidebar-tab>*{flex:1;min-height:0}.aoTVaa_brand-icon{border-radius:22%;display:block}.aoTVaa_tab-title{align-items:center;gap:6px;display:inline-flex}.aoTVaa_floating-notice{height:100%;color:var(--muted-foreground);flex-direction:column;justify-content:center;align-items:center;gap:12px;padding:16px;font-size:12px;display:flex}.aoTVaa_floating-notice button{border:1px solid var(--border);border-radius:var(--radius);background:var(--card);color:var(--card-foreground);cursor:pointer;padding:6px 12px}.aoTVaa_header{user-select:none;touch-action:none;border-bottom:1px solid var(--border);align-items:center;gap:6px;padding:6px 8px;display:flex}.aoTVaa_header[data-draggable]{cursor:move}.aoTVaa_sidebar-tab .aoTVaa_header{border-bottom:none}.aoTVaa_status-text{text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;font-weight:500;overflow:hidden}.aoTVaa_icon-button{border-radius:calc(var(--radius) - 6px);font:inherit;color:var(--muted-foreground);cursor:pointer;background:0 0;border:none;flex:none;align-items:center;padding:2px;display:inline-flex}.aoTVaa_icon-button:hover{color:var(--foreground);background:var(--accent)}.aoTVaa_stage{background:var(--background);flex:1;justify-content:center;align-items:center;min-height:0;display:flex;position:relative;overflow:hidden}.aoTVaa_thumb{object-fit:contain;max-width:100%;max-height:100%;animation:.24s ease-out aoTVaa_bsk-obs-fade-in}@keyframes aoTVaa_bsk-obs-fade-in{0%{opacity:0}to{opacity:1}}.aoTVaa_placeholder{color:var(--muted-foreground);font-size:12px}.aoTVaa_badge{cursor:pointer;color:oklch(70% .19 60);background:var(--card);border:1px solid oklch(70% .19 60);border-radius:50%;justify-content:center;align-items:center;width:16px;height:16px;padding:0;display:inline-flex;position:absolute;top:6px;right:6px}.aoTVaa_actions{z-index:3;border-top:1px solid var(--border);justify-content:space-between;align-items:center;gap:4px;min-height:32px;padding:4px 8px;display:flex;position:relative}.aoTVaa_actions-group{align-items:center;gap:4px;display:inline-flex}.aoTVaa_tool-wrap{display:inline-flex;position:relative}.aoTVaa_tool-button{border-radius:calc(var(--radius) - 4px);width:28px;height:28px;color:var(--muted-foreground);cursor:pointer;background:0 0;border:none;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex}.aoTVaa_tool-button:disabled{opacity:.4;cursor:default}.aoTVaa_tool-button:focus-visible{outline:2px solid var(--ring);outline-offset:2px}.aoTVaa_tool-danger,.aoTVaa_tool-stop{color:var(--destructive)}.aoTVaa_tool-wrap:hover .aoTVaa_tool-button:not(:disabled){color:var(--foreground);background:var(--accent)}.aoTVaa_tool-wrap:hover .aoTVaa_tool-danger:not(:disabled){color:var(--destructive);background:color-mix(in oklch, var(--destructive) 18%, var(--card))}.aoTVaa_tool-wrap:hover .aoTVaa_tool-button:disabled{background:var(--accent)}.aoTVaa_tool-button.aoTVaa_tool-stop-armed,.aoTVaa_tool-wrap:hover .aoTVaa_tool-button.aoTVaa_tool-stop-armed{color:var(--destructive-foreground);background:var(--destructive)}.aoTVaa_hint{border-radius:calc(var(--radius) - 4px);background:var(--card);border:1px solid var(--border);width:max-content;max-width:220px;color:var(--muted-foreground);z-index:41;padding:4px 6px;font-size:11px;line-height:1.35;position:absolute;bottom:calc(100% + 4px);left:0;box-shadow:0 4px 14px #00000029}.aoTVaa_hint[data-align=end]{left:auto;right:0}.aoTVaa_resize-handle{touch-action:none;z-index:4;width:16px;height:16px;position:absolute}.aoTVaa_resize-handle[data-corner=nw]{cursor:nwse-resize;top:0;left:0}.aoTVaa_resize-handle[data-corner=ne]{cursor:nesw-resize;top:0;right:0}.aoTVaa_resize-handle[data-corner=sw]{cursor:nesw-resize;bottom:0;left:0}.aoTVaa_resize-handle[data-corner=se]{cursor:nwse-resize;bottom:0;right:0}.aoTVaa_capsule{z-index:40;pointer-events:auto;border:1px solid var(--border);background:var(--card);color:var(--muted-foreground);cursor:pointer;border-radius:999px;align-items:center;gap:6px;padding:6px 12px;font-size:12px;display:inline-flex;position:fixed;top:64px;right:16px;box-shadow:0 4px 14px #00000029}.aoTVaa_capsule:hover{background:var(--accent)}.aoTVaa_strip{border-top:1px solid var(--border);gap:6px;padding:4px 8px;display:flex;overflow-x:auto}.aoTVaa_strip-item{border-radius:calc(var(--radius) - 6px);border:1px solid var(--border);flex:none;position:relative}.aoTVaa_strip-item[data-focused]{border-color:var(--primary)}.aoTVaa_strip-item[data-state=error]{border-color:var(--destructive)}.aoTVaa_strip-item[data-state=dead]{opacity:.45}.aoTVaa_strip-main{border-radius:calc(var(--radius) - 6px);font:inherit;color:var(--muted-foreground);cursor:pointer;background:0 0;border:none;align-items:center;gap:4px;padding:3px 6px;font-size:11px;display:flex}.aoTVaa_strip-main:hover{background:var(--accent)}.aoTVaa_strip-thumb{background:var(--background);border-radius:3px;width:28px;height:20px;display:inline-flex;overflow:hidden}.aoTVaa_strip-thumb img{object-fit:cover;width:100%;height:100%}.aoTVaa_strip-thumb-empty{width:100%;height:100%}.aoTVaa_strip-id{text-overflow:ellipsis;max-width:64px;overflow:hidden}.aoTVaa_pin-badge{color:var(--primary)}.aoTVaa_strip-interrupt{border:1px solid var(--destructive);background:var(--card);width:16px;height:16px;color:var(--destructive);cursor:pointer;border-radius:50%;justify-content:center;align-items:center;padding:0;display:inline-flex;position:absolute;top:-7px;right:-7px}.aoTVaa_strip-interrupt:disabled{opacity:.4;cursor:default}.aoTVaa_icon-button:focus-visible,.aoTVaa_capsule:focus-visible,.aoTVaa_strip-main:focus-visible,.aoTVaa_strip-interrupt:focus-visible{outline:2px solid var(--ring);outline-offset:2px}@media (prefers-reduced-motion:reduce){.aoTVaa_thumb{animation:none}}";
		const tagId = "dsh-browser-skill/ObservationOverlay.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-browser-skill";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var ObservationOverlay_module_css_default = {
			"bsk-obs-fade-in": "aoTVaa_bsk-obs-fade-in",
			"tool-button": "aoTVaa_tool-button",
			"icon-button": "aoTVaa_icon-button",
			"strip-id": "aoTVaa_strip-id",
			"tab-title": "aoTVaa_tab-title",
			"tool-danger": "aoTVaa_tool-danger",
			"header": "aoTVaa_header",
			"actions-group": "aoTVaa_actions-group",
			"thumb": "aoTVaa_thumb",
			"body": "aoTVaa_body",
			"tool-stop-armed": "aoTVaa_tool-stop-armed",
			"sidebar-tab": "aoTVaa_sidebar-tab",
			"tool-stop": "aoTVaa_tool-stop",
			"stage": "aoTVaa_stage",
			"strip-thumb": "aoTVaa_strip-thumb",
			"badge": "aoTVaa_badge",
			"actions": "aoTVaa_actions",
			"strip": "aoTVaa_strip",
			"placeholder": "aoTVaa_placeholder",
			"resize-handle": "aoTVaa_resize-handle",
			"strip-main": "aoTVaa_strip-main",
			"strip-thumb-empty": "aoTVaa_strip-thumb-empty",
			"strip-interrupt": "aoTVaa_strip-interrupt",
			"status-text": "aoTVaa_status-text",
			"tool-wrap": "aoTVaa_tool-wrap",
			"pin-badge": "aoTVaa_pin-badge",
			"brand-icon": "aoTVaa_brand-icon",
			"strip-item": "aoTVaa_strip-item",
			"capsule": "aoTVaa_capsule",
			"card": "aoTVaa_card",
			"hint": "aoTVaa_hint",
			"floating-notice": "aoTVaa_floating-notice"
		};
		//#endregion
		//#region src/client/observation-view.ts
		/**
		* Shared view logic for the observation carriers (the floating overlay card
		* and the native sidebar tab): the store-backed view model (snapshot, focus
		* pinning, elapsed ticker) and the Document PiP pop-out. Extracted from
		* ObservationOverlay so both carriers run the same focus/interrupt behavior
		* without duplicating hooks.
		*/
		/**
		* Auto-follow focus: the most recently touched session, but never yank focus
		* to a session whose latest action failed (errors flag the strip item, they
		* do not steal the stage) or one already reported dead.
		*/
		function focusOf(sessions) {
			if (sessions.length === 0) return void 0;
			const byRecency = [...sessions].sort((a, b) => b.since - a.since);
			return byRecency.find((s) => s.lastError === void 0 && s.dead !== true) ?? byRecency[0];
		}
		function statusOf(obs) {
			if (obs.lastError !== void 0 && obs.action === "idle") return "error";
			return obs.action === "idle" ? "idle" : "active";
		}
		function pipApi() {
			if (typeof window === "undefined") return void 0;
			return window.documentPictureInPicture;
		}
		/** Clone the host document's style/link nodes into a PiP window. */
		function cloneStylesInto(pipWindow) {
			for (const node of document.querySelectorAll("link[rel=\"stylesheet\"], style")) pipWindow.document.head.appendChild(node.cloneNode(true));
		}
		/**
		* Whether one session is visible on a surface scoped to one DSH
		* conversation: sessions started by that conversation or its descendants
		* (the lineage ancestors ride along on the entry). Untracked sessions (no
		* owner recorded) are hidden from scoped surfaces but stay in global views.
		*/
		function visibleToScope(obs, scopeId) {
			return obs.dshSessionIds?.includes(scopeId) === true;
		}
		/**
		* The store-backed observation view model. Holds the feed for the component
		* lifetime (refcounted — overlapping carriers never kill each other's
		* stream). `scopeId` narrows the view to one DSH conversation's sessions
		* (the native sidebar tab); undefined keeps the global view (floating
		* card, PiP).
		*/
		function useObservationView(store, scopeId) {
			const snapshot = (0, react.useSyncExternalStore)(store.subscribe, store.getSnapshot);
			(0, react.useEffect)(() => {
				store.acquire();
				return () => store.release();
			}, [store]);
			const scopedSnapshot = scopeId === void 0 ? snapshot : {
				...snapshot,
				sessions: snapshot.sessions.filter((s) => visibleToScope(s, scopeId))
			};
			const [pinnedId, setPinnedId] = (0, react.useState)(null);
			const pinned = pinnedId !== null ? scopedSnapshot.sessions.find((s) => s.sessionId === pinnedId) : void 0;
			const focus = pinned ?? focusOf(scopedSnapshot.sessions);
			const onTogglePin = (0, react.useCallback)((sessionId) => {
				setPinnedId((current) => current === sessionId ? null : sessionId);
			}, []);
			const anyActive = scopedSnapshot.sessions.some((s) => s.action !== "idle");
			const [now, setNow] = (0, react.useState)(() => Date.now());
			(0, react.useEffect)(() => {
				if (!anyActive) return;
				const timer = setInterval(() => setNow(Date.now()), 1e3);
				return () => clearInterval(timer);
			}, [anyActive]);
			return {
				snapshot: scopedSnapshot,
				focus,
				pinnedId: pinned !== void 0 ? pinnedId : null,
				onTogglePin,
				now
			};
		}
		/** A mounted metadata watcher is not necessarily a visible screenshot viewer. */
		function useThumbnailObservation(store, enabled) {
			const ref = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				const element = ref.current;
				if (!enabled || element === null) return;
				const doc = element.ownerDocument;
				const Observer = doc.defaultView?.IntersectionObserver;
				let active = true;
				let intersecting = Observer === void 0;
				let release;
				const update = () => {
					if (!active) return;
					const visible = intersecting && doc.visibilityState !== "hidden";
					if (visible && release === void 0) release = store.watchThumbnails();
					else if (!visible && release !== void 0) {
						release();
						release = void 0;
					}
				};
				const observer = Observer === void 0 ? void 0 : new Observer((entries) => {
					intersecting = entries.some((entry) => entry.target === element && entry.isIntersecting);
					update();
				});
				observer?.observe(element);
				doc.addEventListener("visibilitychange", update);
				update();
				return () => {
					active = false;
					observer?.disconnect();
					doc.removeEventListener("visibilitychange", update);
					release?.();
				};
			}, [store, enabled]);
			return ref;
		}
		function usePip() {
			const [pipWindow, setPipWindow] = (0, react.useState)(null);
			const popOut = (0, react.useCallback)((size) => {
				const pip = pipApi();
				if (pip === void 0) return;
				pip.requestWindow(size).then((win) => {
					cloneStylesInto(win);
					win.addEventListener("pagehide", () => setPipWindow(null));
					setPipWindow(win);
				}).catch(() => {});
			}, []);
			(0, react.useEffect)(() => () => pipWindow?.close(), [pipWindow]);
			return {
				pipWindow,
				pipSupported: pipApi() !== void 0,
				popOut
			};
		}
		//#endregion
		//#region src/client/ObservationOverlay.tsx
		const asIcon = (component) => component;
		const IconStop = asIcon(LN);
		const IconPip = asIcon(hg);
		const IconDown = asIcon(f1);
		const IconClose = asIcon(P7);
		const IconWarn = asIcon(Rt);
		const IconPin = asIcon(SM);
		const IconCloseSession = asIcon(A7);
		const IconCheck = asIcon(s7);
		const IconSidebar = asIcon(Yn);
		const IconWindow = asIcon(Tz);
		const DEFAULT_SIZE = {
			w: 320,
			h: 240
		};
		const MIN_SIZE = {
			w: 240,
			h: 180
		};
		const EDGE_MARGIN = 16;
		/** Default dock: top-right, just under the shell's top bar (no spacing tokens exist in dsh 0.1). */
		const TOP_OFFSET = 64;
		function clampSize(size, viewport) {
			const maxW = viewport.w * .8;
			const maxH = viewport.h * .8;
			return {
				w: Math.min(Math.max(size.w, MIN_SIZE.w), maxW),
				h: Math.min(Math.max(size.h, MIN_SIZE.h), maxH)
			};
		}
		function clampPos(pos, size, viewport) {
			return {
				x: Math.min(Math.max(pos.x, 0), Math.max(0, viewport.w - size.w)),
				y: Math.min(Math.max(pos.y, 0), Math.max(0, viewport.h - size.h))
			};
		}
		/** Grow/shrink from one corner, keeping the opposite corner planted. */
		function applyResize(base, corner, dx, dy, viewport) {
			const size = clampSize({
				w: corner === "ne" || corner === "se" ? base.w + dx : base.w - dx,
				h: corner === "sw" || corner === "se" ? base.h + dy : base.h - dy
			}, viewport);
			return {
				pos: clampPos({
					x: corner === "nw" || corner === "sw" ? base.x + base.w - size.w : base.x,
					y: corner === "nw" || corner === "ne" ? base.y + base.h - size.h : base.y
				}, size, viewport),
				size
			};
		}
		const CORNER_LABEL = {
			nw: "top left",
			ne: "top right",
			sw: "bottom left",
			se: "bottom right"
		};
		function formatElapsed(sinceMs, nowMs) {
			const total = Math.max(0, Math.floor((nowMs - sinceMs) / 1e3));
			return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
		}
		/** Compact toolbar icon: no label, hover bubble for the name / semantics. */
		function IconAction(props) {
			const [open, setOpen] = (0, react.useState)(false);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: ObservationOverlay_module_css_default["tool-wrap"],
				onPointerEnter: () => setOpen(true),
				onPointerLeave: () => setOpen(false),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn(ObservationOverlay_module_css_default["tool-button"], props.danger === true && ObservationOverlay_module_css_default["tool-danger"]),
					disabled: props.disabled,
					"aria-label": props.label,
					onClick: props.onClick,
					children: props.children
				}), open ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: ObservationOverlay_module_css_default.hint,
					"data-align": props.align,
					role: "tooltip",
					children: props.hint
				}) : null]
			});
		}
		/** How long the stop button stays armed before the confirm click expires. */
		const STOP_ARM_MS = 3e3;
		/**
		* Stop-session button with a lightweight two-click confirm: the first click
		* arms the button (solid red, check icon, short expiry), the second executes
		* the stop. No dialog, no layout shift — and a stray single click can never
		* close an Agent Window.
		*/
		function StopSessionAction(props) {
			const { sessionId, onStop } = props;
			const [hover, setHover] = (0, react.useState)(false);
			const [armed, setArmed] = (0, react.useState)(false);
			const [stopping, setStopping] = (0, react.useState)(false);
			(0, react.useEffect)(() => {
				if (!armed) return;
				const timer = setTimeout(() => setArmed(false), STOP_ARM_MS);
				return () => clearTimeout(timer);
			}, [armed]);
			(0, react.useEffect)(() => {
				if (sessionId === void 0) setArmed(false);
			}, [sessionId]);
			const disabled = sessionId === void 0 || stopping;
			const label = stopping ? "Stopping session…" : armed ? `Confirm stop session ${sessionId ?? ""}` : `Stop session ${sessionId ?? ""}`;
			const hint = stopping ? "Closing the Agent Window…" : armed ? `Click again to stop session ${sessionId ?? ""} and close its Agent Window.` : `Stop session ${sessionId ?? ""} and close its Agent Window.`;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: ObservationOverlay_module_css_default["tool-wrap"],
				onPointerEnter: () => setHover(true),
				onPointerLeave: () => setHover(false),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn(ObservationOverlay_module_css_default["tool-button"], ObservationOverlay_module_css_default["tool-stop"], armed && ObservationOverlay_module_css_default["tool-stop-armed"]),
					disabled,
					"aria-label": label,
					"aria-pressed": armed,
					"data-armed": armed || void 0,
					onClick: () => {
						if (sessionId === void 0 || stopping) return;
						if (!armed) {
							setArmed(true);
							return;
						}
						setArmed(false);
						setStopping(true);
						onStop(sessionId).finally(() => setStopping(false));
					},
					children: armed ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCheck, { size: 16 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconCloseSession, { size: 16 })
				}), hover ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: ObservationOverlay_module_css_default.hint,
					role: "tooltip",
					children: hint
				}) : null]
			});
		}
		/** Flat status dot, specced after the BSK popup's ConnectionStatusIndicator. */
		function StatusDot({ state }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: cn("size-2 shrink-0 rounded-full ring-2 ring-background", state === "active" ? "bg-emerald-500" : state === "error" ? "bg-red-500" : state === "dead" || state === "reconnecting" ? "bg-amber-500" : "bg-muted-foreground/40"),
				"data-state": state,
				"aria-hidden": true
			});
		}
		/** One strip item: mini frame, id, status dot, hover interrupt, pin toggle. */
		function StripItem(props) {
			const { store, obs, pinned, focused, onTogglePin } = props;
			const [hover, setHover] = (0, react.useState)(false);
			const thumbId = obs.thumbnailAttachmentId;
			(0, react.useEffect)(() => {
				store.ensureThumbnail(thumbId);
			}, [store, thumbId]);
			const thumb = store.getSnapshot().displayFrames[obs.sessionId];
			const state = obs.dead === true ? "dead" : statusOf(obs);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: ObservationOverlay_module_css_default["strip-item"],
				"data-state": state,
				"data-focused": focused || void 0,
				"data-pinned": pinned || void 0,
				onPointerEnter: () => setHover(true),
				onPointerLeave: () => setHover(false),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: ObservationOverlay_module_css_default["strip-main"],
					"aria-label": `${pinned ? "Unpin" : "Pin"} session ${obs.sessionId}`,
					"aria-pressed": pinned,
					onClick: () => onTogglePin(obs.sessionId),
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ObservationOverlay_module_css_default["strip-thumb"],
							children: thumb?.url !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
								src: thumb.url,
								alt: ""
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: ObservationOverlay_module_css_default["strip-thumb-empty"] })
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ObservationOverlay_module_css_default["strip-id"],
							children: obs.sessionId
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StatusDot, { state }),
						pinned ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconPin, {
							size: 9,
							className: ObservationOverlay_module_css_default["pin-badge"],
							"aria-label": "pinned"
						}) : null
					]
				}), hover && !pinned && obs.dead !== true ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: ObservationOverlay_module_css_default["strip-interrupt"],
					"aria-label": `Interrupt session ${obs.sessionId}`,
					disabled: obs.action === "idle",
					onClick: (event) => {
						event.stopPropagation();
						store.interrupt(obs.sessionId);
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconStop, { size: 10 })
				}) : null]
			});
		}
		/** The floating card / PiP / sidebar-tab shared content. */
		function OverlayBody(props) {
			const { store, focus, sessions, available, reconnecting, pinnedId, onTogglePin, now, onPopOut, onCollapse, onClosePip, onUseFloating, onUseSidebar, visible = true, inPip, onHeaderPointerDown } = props;
			const [interrupting, setInterrupting] = (0, react.useState)(false);
			const viewRef = useThumbnailObservation(store, visible && sessions.length > 0);
			const thumbId = focus?.thumbnailAttachmentId;
			(0, react.useEffect)(() => {
				store.ensureThumbnail(thumbId);
			}, [store, thumbId]);
			const thumb = focus !== void 0 ? store.getSnapshot().displayFrames[focus.sessionId] : void 0;
			const displayUrl = thumb?.url;
			const canInterrupt = available && !interrupting && focus !== void 0 && focus.action !== "idle" && focus.dead !== true;
			const onInterrupt = () => {
				if (!canInterrupt || focus === void 0) return;
				setInterrupting(true);
				store.interrupt(focus.sessionId).finally(() => setInterrupting(false));
			};
			const statusText = reconnecting ? "reconnecting…" : !available ? "browser unavailable" : focus === void 0 ? "no session" : `${focus.sessionId} · ${focus.action === "idle" ? "idle" : focus.action} · ${formatElapsed(focus.since, now)}`;
			const state = reconnecting ? "reconnecting" : !available ? "error" : focus !== void 0 ? statusOf(focus) : "idle";
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				ref: viewRef,
				className: cn(ObservationOverlay_module_css_default.body, "bsk-obs"),
				"data-state": state,
				"data-in-pip": inPip || void 0,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: ObservationOverlay_module_css_default.header,
						"data-testid": "obs-header",
						"data-draggable": onHeaderPointerDown !== void 0 || void 0,
						onPointerDown: onHeaderPointerDown,
						role: "presentation",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StatusDot, { state }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: ObservationOverlay_module_css_default["status-text"],
								children: statusText
							}),
							onUseFloating !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconAction, {
								label: "Use floating view",
								hint: "Show the browser view in a floating window.",
								onClick: onUseFloating,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconWindow, { size: 14 })
							}) : null,
							onUseSidebar !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconAction, {
								label: "Move to sidebar",
								hint: "Show the browser view in the sidebar.",
								onClick: onUseSidebar,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconSidebar, { size: 14 })
							}) : null,
							onCollapse !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: ObservationOverlay_module_css_default["icon-button"],
								"aria-label": "Collapse",
								onClick: onCollapse,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconDown, { size: 14 })
							}) : null,
							onClosePip !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: ObservationOverlay_module_css_default["icon-button"],
								"aria-label": "Close mini window",
								onClick: onClosePip,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconClose, { size: 14 })
							}) : null
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: ObservationOverlay_module_css_default.stage,
						children: [displayUrl !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
							className: ObservationOverlay_module_css_default.thumb,
							src: displayUrl,
							alt: `session ${focus?.sessionId ?? ""} view`
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: ObservationOverlay_module_css_default.placeholder,
							children: !available ? "last frame kept" : thumb?.status === "error" ? "frame unavailable" : "waiting for page"
						}), thumb?.status === "error" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: ObservationOverlay_module_css_default.badge,
							"aria-label": "Retry thumbnail",
							title: "Frame unavailable — retry",
							onClick: () => store.retryThumbnail(thumbId),
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconWarn, { size: 12 })
						}) : null]
					}),
					sessions.length >= 2 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: ObservationOverlay_module_css_default.strip,
						"data-testid": "obs-strip",
						role: "list",
						children: sessions.map((obs) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StripItem, {
							store,
							obs,
							pinned: pinnedId === obs.sessionId,
							focused: focus?.sessionId === obs.sessionId,
							onTogglePin
						}, obs.sessionId))
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: ObservationOverlay_module_css_default.actions,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: ObservationOverlay_module_css_default["actions-group"],
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconAction, {
								label: interrupting ? "Interrupting…" : "Interrupt the current browser action",
								hint: "Stop the current browser action.",
								disabled: !canInterrupt,
								danger: true,
								onClick: onInterrupt,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconStop, { size: 16 })
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StopSessionAction, {
								sessionId: focus?.sessionId,
								onStop: (sessionId) => store.stopSession(sessionId)
							})]
						}), onPopOut !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconAction, {
							label: "Pop out into a mini window",
							hint: "Pop out into a mini window",
							align: "end",
							onClick: onPopOut,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconPip, { size: 16 })
						}) : null]
					})
				]
			});
		}
		function ObservationOverlay({ store }) {
			const { snapshot, focus, pinnedId, onTogglePin, now } = useObservationView(store);
			const presentation = (0, react.useSyncExternalStore)(store.presentation.subscribe, store.presentation.getSnapshot);
			const [collapsed, setCollapsed] = (0, react.useState)(false);
			const [pos, setPos] = (0, react.useState)(null);
			const [size, setSize] = (0, react.useState)(DEFAULT_SIZE);
			const { pipWindow, pipSupported, popOut } = usePip();
			const dragRef = (0, react.useRef)(null);
			const viewport = () => ({
				w: window.innerWidth,
				h: window.innerHeight
			});
			const onPointerMove = (0, react.useCallback)((event) => {
				const drag = dragRef.current;
				if (drag === null) return;
				const dx = event.clientX - drag.startX;
				const dy = event.clientY - drag.startY;
				if (drag.kind === "move") setPos(clampPos({
					x: drag.base.x + dx,
					y: drag.base.y + dy
				}, {
					w: drag.base.w,
					h: drag.base.h
				}, viewport()));
				else if (drag.corner !== void 0) {
					const next = applyResize(drag.base, drag.corner, dx, dy, viewport());
					setPos(next.pos);
					setSize(next.size);
				}
			}, []);
			const onPointerUp = (0, react.useCallback)(() => {
				dragRef.current = null;
				document.removeEventListener("pointermove", onPointerMove);
				document.removeEventListener("pointerup", onPointerUp);
			}, [onPointerMove]);
			const cardOrigin = () => {
				const vp = viewport();
				return {
					x: pos?.x ?? vp.w - size.w - EDGE_MARGIN,
					y: pos?.y ?? TOP_OFFSET,
					w: size.w,
					h: size.h
				};
			};
			const beginMove = (event) => {
				event.preventDefault();
				const rect = event.currentTarget.closest("[data-obs-card]")?.getBoundingClientRect();
				const origin = cardOrigin();
				const base = {
					x: rect?.left ?? origin.x,
					y: rect?.top ?? origin.y,
					w: rect !== void 0 && rect.width > 0 ? rect.width : origin.w,
					h: rect !== void 0 && rect.height > 0 ? rect.height : origin.h
				};
				dragRef.current = {
					kind: "move",
					startX: event.clientX,
					startY: event.clientY,
					base
				};
				setPos({
					x: base.x,
					y: base.y
				});
				document.addEventListener("pointermove", onPointerMove);
				document.addEventListener("pointerup", onPointerUp);
			};
			const beginResize = (corner) => (event) => {
				event.preventDefault();
				event.stopPropagation();
				const rect = event.currentTarget.closest("[data-obs-card]")?.getBoundingClientRect();
				const origin = cardOrigin();
				const base = {
					x: rect?.left ?? origin.x,
					y: rect?.top ?? origin.y,
					w: rect !== void 0 && rect.width > 0 ? rect.width : origin.w,
					h: rect !== void 0 && rect.height > 0 ? rect.height : origin.h
				};
				dragRef.current = {
					kind: "resize",
					corner,
					startX: event.clientX,
					startY: event.clientY,
					base
				};
				setPos({
					x: base.x,
					y: base.y
				});
				document.addEventListener("pointermove", onPointerMove);
				document.addEventListener("pointerup", onPointerUp);
			};
			const body = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(OverlayBody, {
				store,
				focus,
				sessions: snapshot.sessions,
				available: snapshot.available,
				reconnecting: snapshot.reconnecting,
				pinnedId,
				onTogglePin,
				now,
				inPip: pipWindow !== null,
				onPopOut: pipWindow === null && pipSupported ? () => popOut({
					width: size.w,
					height: size.h
				}) : void 0,
				onCollapse: pipWindow === null ? () => setCollapsed(true) : void 0,
				onClosePip: pipWindow !== null ? () => pipWindow.close() : void 0,
				onUseSidebar: presentation.sidebarAvailable ? () => {
					pipWindow?.close();
					store.presentation.showSidebar();
				} : void 0,
				onHeaderPointerDown: pipWindow === null ? beginMove : void 0
			});
			if (pipWindow !== null) return (0, react_dom.createPortal)(body, pipWindow.document.body);
			if (!presentation.floating) return null;
			if (snapshot.sessions.length === 0) return null;
			if (collapsed) {
				const state = snapshot.reconnecting ? "reconnecting" : focus !== void 0 ? statusOf(focus) : "idle";
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: cn(ObservationOverlay_module_css_default.capsule, "bsk-obs"),
					"data-state": state,
					"data-testid": "obs-capsule",
					"aria-label": "Expand browser observation overlay",
					onClick: () => setCollapsed(false),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StatusDot, { state }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: ObservationOverlay_module_css_default["capsule-text"],
						children: [
							snapshot.sessions.length,
							" session",
							snapshot.sessions.length === 1 ? "" : "s",
							snapshot.reconnecting ? " · reconnecting…" : focus !== void 0 && focus.action !== "idle" ? ` · ${focus.action} · ${formatElapsed(focus.since, now)}` : ""
						]
					})]
				});
			}
			const style = pos !== null ? {
				left: pos.x,
				top: pos.y,
				width: size.w,
				height: size.h
			} : {
				right: EDGE_MARGIN,
				top: TOP_OFFSET,
				width: size.w,
				height: size.h
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: cn(ObservationOverlay_module_css_default.card, "bsk-obs"),
				style,
				"data-obs-card": true,
				"data-testid": "obs-card",
				children: [body, [
					"nw",
					"ne",
					"sw",
					"se"
				].map((corner) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: ObservationOverlay_module_css_default["resize-handle"],
					"data-corner": corner,
					"data-testid": `obs-resize-${corner}`,
					"aria-label": `Resize overlay from the ${CORNER_LABEL[corner]}`,
					role: "separator",
					"aria-valuenow": size.w,
					"aria-valuetext": `${Math.round(size.w)} by ${Math.round(size.h)} pixels`,
					"aria-valuemin": MIN_SIZE.w,
					"aria-valuemax": Math.round(viewport().w * .8),
					tabIndex: corner === "se" ? 0 : -1,
					onPointerDown: beginResize(corner),
					onKeyDown: corner === "se" ? (event) => {
						const step = 16;
						const dx = event.key === "ArrowRight" ? step : event.key === "ArrowLeft" ? -16 : 0;
						const dy = event.key === "ArrowDown" ? step : event.key === "ArrowUp" ? -16 : 0;
						if (dx === 0 && dy === 0) return;
						event.preventDefault();
						const next = applyResize(cardOrigin(), "se", dx, dy, viewport());
						setPos(next.pos);
						setSize(next.size);
					} : void 0
				}, corner))]
			});
		}
		//#endregion
		//#region src/client/brand-icon.ts
		/**
		* The BrowserSkill product mark (apps/extension/assets/logo.png, downscaled
		* to 32px and inlined): the sidebar tab icon, so the tracking view reads as
		* BSK's own surface next to the host's other sidebar tabs.
		* Regenerate with: resize the source to 32x32 PNG and replace the payload.
		*/
		const BSK_LOGO_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAJGklEQVR42m2X248c2V3HP79zTlV19/TcPOOZWY+vsdmQFdngTQJswgs3hQ15iCJslAey+8xDAIHgH+CBNxIpj0gkEXnAKyKQWITEJlKWXSssEMfJRmuMHa/W9njHMz3Tl+nprsv5/XiomlugpdN16lR1n9/1e75fAbAbeLlO3Pz2ly4vjO7+sRbF58oiP49FEREOPwaIYQjS3IvUy0fP66kAZoYJIM7SpPVY0uy14cyzXzn9u9+4c+MG/vp1otiNa16uvxr7X/+1L3bK3lcTyU9P80ilR/uKCGYHOxxd6s2kmdaGIVYb1qyY1e8HD63UUblstwirf9J95fW/sRvXvAD0v/6Z6/O68Xf5/pS8kigiTsTkuCfIwfzAxQN37chjaAyt594JIXE4gbKMhog6Nd/qthi7lVe6L3/nG7Jz4/fPJ9u3b4U4WSwiKog/EcsTLh+PSuO3GXYs/D44QnBgyniQs7OV0+8bOxPPM6c9l660VEyF0Nmrlp9/IYT+/S/PUJ4a5C46EW8HnjVhBKjXaHJfz9Xq95xzhMThHZR5xXBrwtPNnP6eRzvzhJWzrF1d5UI759//9iYra5lrt1ycDeXsaOf+n4Y4HX8+r9SciasLS/6P12LHoyF47wipYKpM9gqePpyyvVMxjBn+1DILH17l0rkZlhYcLetT3n/A5FGfTtvTCh4ibjpVI81/J0il62V1rNStLp6j4jowxwiJh2iMevtsbU3pjYQim6Nz9hJLH13i8mrGbJgSxjuUvQfEjT2GOw4Zddh0BakPtFPH/jRKqaCSrwetKi9mKIIYhyFuOg6TurCcF7ae5ty5t48/vcTiz3+Ei+szLC06WnGA7TykfNCnmObk5nAtj+53yDcTZteMwZOChbkMVa3/14DCJBBBFBxyopndUUBqwwxu/XjAJ778Bc4ul+R3fgyj9yg/GDMpFZxHgoe0hQ9QDRzFI48zqHzJeKhcvNKiLAyiQ1BwgsOcqNZ9Xo96rgaVgmqdiBACH740y/1/+j4b7w1x80tUkwLM4VptJAQMcN6o+p7iYQIqhBQmsUIrR7cd0NI12ODAwJnWTpvZoRGqdRrS1CECeR7Z2NzHRBjeecgbX/kut39UUlx5ATe3gFUlAM5Tb/4oHCJl0oadUcFsK8E5sFh7ZaqgEFBr3KyhxAySxDMplDv3BuztlmhhZC6QqONDrXkW28Kbf/1d7A9+i6vPr7N/e5vQDZQ7jvxxUqdPwFRwHaP3sGR1boZYGabWwHdd7MHMMBUMh5mRJp6tnZx33tllJbS53J1jZj6BKpKPpkhZ8e5mj3Nf/FV+8ZOnmNz6Pr6TUvUcxeOAc0cN6xwUoWIyUhZXMqqq6bKmrQ0hWBQzdXX+nGOwV3LnJ30+trjE8mxGUUVG/Qn7owkt7/hpb5fwmat84qXz5P95EwmOqh8oNkKTSkFqICTJYDgpCOppZYGyjIfgdoApQRScCtEgDZ5b93dxuWd3OuWD8T5pqbSLyEyWcHdrh+S3r/Kpz15i/z/eQhIh9hOKjQRTyBYgFhAndSpDW+gNC+ZbGR6jjM3BVsNsXQNqhqpiOPIicuXcLFvdKT7xtNXTG+X0Bopt9Wi9dJUXX7rI5O23kNQRB4F8I0CEzgr0/B7t2YB/2iJOQDrK8HHJ+dkZqqI+JfUAYRXMGc6pM1MBBa2Ubttz5ews51c6XFjr8OJHT5N0HPIbz/Ppz11h/+03IXVUg4T8ccAidFaNp7LHzdd2uXdvj866gQq5L8nHMD+TUJUG0aAyJBqidZQcUfFqeK2vlEo1rYh5iUXl6eMB5eoKv37tOUb/9q+4LBD7gXKj3ry7Ak/iHrdeH/ArC7P07ykPekMWzkFvkNMmkHkgagNoDciogYKzaGg0YgSNYLEJj0ndfiGj6o/Z3i5or5+j2BTKJwlawcwKbMQ9fvK9Ib+QtgitQMg8d384wVYLdocls1mCad1+Fg1TDgeV4UxFTB2ow44NjQ5rwcwZ+MjqmLe/dZOBLOHHCeUUZteED+Ie73xvyHNpmyx1TERozXieW1/mO/+yzWhTWVtsU5aCqKvRT4+GmRDEHGJ6yPPMBHNGeqbCdwqs02X9l14g/a8H3PzWm/zyp1ZZXgn8tDfgnbeGPN/qIEDSyhh7w2OcPZWRsESWCq3EoVFPksZDMuUIps7qLjDUQBxkZ0tcu8KSGdIXPo3OLbOSdfj4YMIPbg6ZXxux9wRmWimFKe0k0J7v8H5vQHchpSoiC536bKhKEDlCJzM7JLJqhqtxoEYoUcEFw/Yduh8Jl38OP7eAlBOm29ssziV87JlluqMOL15ZZWVlhu0yMrfYxQQmZUU3TbCmnog1mRE1xOp9xOoaEwVRI9QnUGOECLoPNlcRlucJ6xeIgx3K/3kX23pINWnRdnBxtYNWkbkkMJ5JSLKEwaSgRFlsJWh1mNBDfsEBzZGaYIiBIgRtImCmmArhlBFOR1Q9xZ3b6OOHWFnifEq1U/84TpXgHL4hUh7hv3t91pY6eCeUpTYs2o6RisYEO6B5hpoSRCWaanNAGP5UVZ+r+YB4dxcbZ4QVx/Q9wSYg/uDYNvKyoorwgyfbtDuBC6c65HmFa5Jsh56f3NgO4iGeYC68n8Ty2WkphAUVv2hoLuggoXgUcJkRh0rVF7wHi3Vw1YxuSMh1zMpcmw8tdynzCmmCL1JjzQG3lpNU37xAdNnjYC79xywUfzbJNboEX214iqeeuN/IrkKw6BAvNUiJ1a2K0HKOT144jQBFoTWRayrc9LhWa1TTUTNqJ038wCf/LO//xZfWWw9u/zCt8uWpSiTixZ3UeJzQPkerdkyq1RryZwVN87CJBALR0ExULMtG4/VnPy4AG3/4m19YGG/9fT7NmZpEhzg5lCNHOo//774u7UYp2WEt1XrSftYMTcF32ynbrfmXz3ztjW86u3bNn/nq69/eaZ/6PUlbm/PB+YSapUozMG2uB0M5fI7WSKoKasjBu6qHczEjwWQ2iJc03XmaLb5y5mtvfNOuNeLUruHlVeK7f/7yxbXBu39U5sXnq7I8L2pH6rwRgCZyUpeKnZSOB5K2EbT1l5hPk0c+zV7bXXzmry7/5T/cvXENf/1V4v8CSYIrURx3kHgAAAAASUVORK5CYII=";
		//#endregion
		//#region src/client/observation-sidebar.tsx
		/** Native DSH right-Sidebar carrier. All runtime collaboration uses optional host services. */
		const OBSERVATION_TAB_KIND = "browserskill-observation";
		const OBSERVATION_TAB_ID = "@wxg-prc-cpg/browser-skill-dsh-plugin/observation";
		const TAB_TITLE = "Browser Skill";
		const BODY_SLOT = "sidebar.right.pane.tab";
		const TITLE_SLOT = "sidebar.right.pane.tab.title";
		function TabIcon({ size = 16 }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
				src: BSK_LOGO_URL,
				width: size,
				height: size,
				alt: "",
				"aria-hidden": true,
				className: ObservationOverlay_module_css_default["brand-icon"]
			});
		}
		/** Same observation content as the overlay, scoped by the native slot's session identity. */
		function ObservationSidebarTab({ store, scopeId, visible = true }) {
			const { snapshot, focus, pinnedId, onTogglePin, now } = useObservationView(store, scopeId);
			const { pipWindow, pipSupported, popOut } = usePip();
			const presentation = (0, react.useSyncExternalStore)(store.presentation.subscribe, store.presentation.getSnapshot);
			if (presentation.floating && presentation.sidebarAvailable) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `${ObservationOverlay_module_css_default["floating-notice"]} bsk-obs`,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "The browser view is in a floating window." }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: store.presentation.showSidebar,
					children: "Show here"
				})]
			});
			const body = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(OverlayBody, {
				store,
				focus,
				sessions: snapshot.sessions,
				available: snapshot.available,
				reconnecting: snapshot.reconnecting,
				pinnedId,
				onTogglePin,
				now,
				visible: visible || pipWindow !== null,
				inPip: pipWindow !== null,
				onPopOut: pipWindow === null && pipSupported ? () => popOut() : void 0,
				onClosePip: pipWindow !== null ? () => pipWindow.close() : void 0,
				onUseFloating: () => {
					pipWindow?.close();
					store.presentation.showFloating();
				}
			});
			if (pipWindow !== null) return (0, react_dom.createPortal)(body, pipWindow.document.body);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: ObservationOverlay_module_css_default["sidebar-tab"],
				children: body
			});
		}
		function ObservationTitle({ store, scopeId }) {
			const count = (0, react.useSyncExternalStore)(store.subscribe, store.getSnapshot).sessions.filter((session) => visibleToScope(session, scopeId)).length;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: ObservationOverlay_module_css_default["tab-title"],
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TabIcon, { size: 14 }),
					TAB_TITLE,
					count > 0 ? ` (${count})` : ""
				]
			});
		}
		function reportFailure(error) {
			console.warn("[browser-skill] native sidebar unavailable; using floating view", error);
		}
		/** A native hook or view failure must never reach DSH's surrounding workbench. */
		var ObservationBoundary = class extends react.Component {
			state = { failed: false };
			static getDerivedStateFromError() {
				return { failed: true };
			}
			componentDidCatch(error) {
				this.props.onError(error);
			}
			render() {
				return this.state.failed ? null : this.props.children;
			}
		};
		/**
		* Wait for both native seats, then install the type and its keyed renderers as
		* one lifetime. Missing native services are normal, including on older DSH.
		*/
		function registerObservationSidebar(host, store) {
			const sidebar = host.get("sidebarRight");
			const tabs = host.get("sidebarRightTabs");
			const sessions = host.get("sessions")?.list;
			if (typeof sidebar?.openTabIn !== "function" || typeof tabs?.register !== "function" || typeof sessions?.getSnapshot !== "function" || typeof sessions?.subscribe !== "function") return () => {};
			return host.slots.inject(BODY_SLOT, () => host.slots.inject(TITLE_SLOT, () => {
				const disposers = [];
				const autoOpened = /* @__PURE__ */ new Set();
				const mounted = /* @__PURE__ */ new Map();
				let disposed = false;
				let failed = false;
				let scheduled = false;
				let disconnect;
				let pending;
				const cancelOpen = () => {
					clearTimeout(pending?.timer);
					pending = void 0;
				};
				const fallback = () => {
					cancelOpen();
					disconnect?.();
					disconnect = void 0;
				};
				const dispose = () => {
					if (disposed) return;
					disposed = true;
					fallback();
					for (const release of disposers.reverse()) release();
				};
				const connect = () => {
					if (failed) return;
					disconnect ??= store.presentation.connectSidebar(reveal);
				};
				const fail = (error) => {
					failed = true;
					fallback();
					reportFailure(error);
				};
				const open = (sessionId) => {
					cancelOpen();
					const request = {
						sessionId,
						attempts: 0,
						timer: void 0
					};
					pending = request;
					const attempt = () => {
						if (disposed || pending !== request) return;
						try {
							if (sessions.getSnapshot().current !== sessionId || store.presentation.getSnapshot().floating) {
								cancelOpen();
								return;
							}
							sidebar.openTabIn(sessionId, OBSERVATION_TAB_KIND);
						} catch (error) {
							fail(error);
							return;
						}
						if (mounted.has(sessionId)) {
							autoOpened.add(sessionId);
							cancelOpen();
						}
						if (pending !== request) return;
						request.attempts += 1;
						request.timer = setTimeout(() => {
							if (pending !== request) return;
							if (request.attempts < 4) attempt();
							else fallback();
						}, 250);
					};
					attempt();
				};
				function reveal() {
					try {
						const current = sessions?.getSnapshot().current;
						if (current !== void 0) open(current);
					} catch (error) {
						fail(error);
					}
				}
				const acknowledge = (sessionId) => {
					if (disposed) return;
					mounted.set(sessionId, (mounted.get(sessionId) ?? 0) + 1);
					autoOpened.add(sessionId);
					if (pending?.sessionId === sessionId) cancelOpen();
					connect();
					return () => {
						const remaining = (mounted.get(sessionId) ?? 1) - 1;
						if (remaining === 0) mounted.delete(sessionId);
						else mounted.set(sessionId, remaining);
					};
				};
				const evaluate = () => {
					if (disposed) return;
					const current = sessions.getSnapshot().current;
					const observations = store.getSnapshot().sessions;
					for (const id of autoOpened) if (!observations.some((session) => visibleToScope(session, id))) autoOpened.delete(id);
					if (pending !== void 0 && (pending.sessionId !== current || store.presentation.getSnapshot().floating)) cancelOpen();
					if (current === void 0 || store.presentation.getSnapshot().floating || pending !== void 0 || autoOpened.has(current)) return;
					if (observations.some((session) => visibleToScope(session, current))) open(current);
				};
				const schedule = () => {
					if (disposed || scheduled) return;
					scheduled = true;
					queueMicrotask(() => {
						scheduled = false;
						try {
							evaluate();
						} catch (error) {
							fail(error);
						}
					});
				};
				function NativeBody(props) {
					const { tab } = props.useTabInfo();
					(0, react.useEffect)(() => acknowledge(props.sessionId), [props.sessionId]);
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ObservationSidebarTab, {
						store,
						scopeId: props.sessionId,
						visible: tab.visible
					});
				}
				try {
					disposers.push(host.slots.register({
						name: BODY_SLOT,
						key: OBSERVATION_TAB_ID
					}, function Body(props) {
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ObservationBoundary, {
							onError: fail,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(NativeBody, { ...props })
						});
					}));
					disposers.push(host.slots.register({
						name: TITLE_SLOT,
						key: OBSERVATION_TAB_ID
					}, function Title(props) {
						(0, react.useEffect)(() => acknowledge(props.sessionId), [props.sessionId]);
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ObservationTitle, {
							store,
							scopeId: props.sessionId
						});
					}));
					disposers.push(tabs.register({
						id: OBSERVATION_TAB_ID,
						kind: OBSERVATION_TAB_KIND,
						title: () => TAB_TITLE,
						guide: [{
							order: 60,
							title: () => TAB_TITLE,
							description: () => "Watch browser activity and control running sessions.",
							icon: TabIcon
						}]
					}));
					disposers.push(() => store.release());
					store.acquire();
					disposers.push(store.subscribe(schedule));
					disposers.push(sessions.subscribe(schedule));
					disposers.push(store.presentation.subscribe(schedule));
					connect();
					schedule();
				} catch (error) {
					dispose();
					reportFailure(error);
				}
				return dispose;
			}));
		}
		//#endregion
		//#region src/client/observation-presentation.ts
		/** Page-local presentation choice. Nothing is persisted or shared between client instances. */
		var ObservationPresentation = class {
			listeners = /* @__PURE__ */ new Set();
			reveal;
			floating = false;
			snapshot = {
				sidebarAvailable: false,
				floating: true
			};
			getSnapshot = () => this.snapshot;
			subscribe = (listener) => {
				this.listeners.add(listener);
				return () => this.listeners.delete(listener);
			};
			/** A successfully registered native carrier; removing it restores the overlay. */
			connectSidebar(reveal) {
				this.reveal = reveal;
				this.publish();
				return () => {
					if (this.reveal !== reveal) return;
					this.reveal = void 0;
					this.publish();
				};
			}
			showFloating = () => {
				this.floating = true;
				this.publish();
			};
			showSidebar = () => {
				if (this.reveal === void 0) return;
				this.floating = false;
				this.publish();
				this.reveal();
			};
			publish() {
				const sidebarAvailable = this.reveal !== void 0;
				const floating = this.floating || !sidebarAvailable;
				if (sidebarAvailable === this.snapshot.sidebarAvailable && floating === this.snapshot.floating) return;
				this.snapshot = {
					sidebarAvailable,
					floating
				};
				for (const listener of [...this.listeners]) listener();
			}
		};
		//#endregion
		//#region src/client/observation-store.ts
		const EVENTS_URL = "/bsk-observation/events";
		const INTERRUPT_URL = "/bsk-observation/interrupt";
		const STOP_URL = "/bsk-observation/stop";
		const THUMBNAIL_RETRY_DELAYS_MS = [1e3, 3e3];
		/**
		* Backoff for re-creating the live event stream after a *fatal* failure.
		* A non-200 response (for example the observation route answering 404 while
		* the plugin is still starting, or right after a plugin reload) is terminal
		* for an EventSource: the browser never retries it. Without this the view
		* stays empty until the page is reloaded.
		*/
		const EVENT_STREAM_RETRY_DELAYS_MS = [
			1e3,
			3e3,
			1e4,
			3e4
		];
		function revoke(url) {
			if (url !== void 0 && typeof URL.revokeObjectURL === "function") URL.revokeObjectURL(url);
		}
		var ObservationClientStore = class {
			deps;
			presentation = new ObservationPresentation();
			sessions = /* @__PURE__ */ new Map();
			thumbs = /* @__PURE__ */ new Map();
			/** sessionId → the attachment id currently advertised for it. */
			thumbBySession = /* @__PURE__ */ new Map();
			/** sessionId → last successfully loaded frame (held across the next load). */
			lastReady = /* @__PURE__ */ new Map();
			retryTimers = /* @__PURE__ */ new Map();
			retryCounts = /* @__PURE__ */ new Map();
			listeners = /* @__PURE__ */ new Set();
			events;
			/** Pending re-creation of the event stream after a fatal failure. */
			reconnectTimer;
			reconnectAttempts = 0;
			snapshot = {
				sessions: [],
				subscribed: false,
				thumbnails: {},
				displayFrames: {},
				available: true,
				reconnecting: false
			};
			available = true;
			reconnecting = false;
			started = false;
			/** Refcount of mounted consumers (overlay card, sidebar tab, sidebar fiber). */
			consumers = 0;
			thumbnailConsumers = 0;
			constructor(deps) {
				this.deps = deps;
			}
			subscribe = (listener) => {
				this.listeners.add(listener);
				return () => this.listeners.delete(listener);
			};
			getSnapshot = () => this.snapshot;
			publish() {
				this.snapshot = {
					sessions: [...this.sessions.values()],
					subscribed: this.events !== void 0,
					thumbnails: Object.fromEntries(this.thumbs),
					displayFrames: this.buildDisplayFrames(),
					available: this.available,
					reconnecting: this.reconnecting
				};
				for (const listener of [...this.listeners]) listener();
			}
			/** Frame the overlay should paint for one session (last good while next loads). */
			frameFor(sessionId) {
				const attachmentId = this.thumbBySession.get(sessionId);
				const current = attachmentId !== void 0 ? this.thumbs.get(attachmentId) : void 0;
				if (current?.status === "ready" && current.url !== void 0) return current;
				const held = this.lastReady.get(sessionId);
				if (held !== void 0) return {
					status: current?.status === "error" ? "error" : "ready",
					url: held.url
				};
				return current;
			}
			buildDisplayFrames() {
				const frames = {};
				for (const sessionId of this.sessions.keys()) {
					const frame = this.frameFor(sessionId);
					if (frame !== void 0) frames[sessionId] = frame;
				}
				return frames;
			}
			sessionOf(attachmentId) {
				for (const [sessionId, id] of this.thumbBySession) if (id === attachmentId) return sessionId;
			}
			connectEvents() {
				clearTimeout(this.reconnectTimer);
				this.reconnectTimer = void 0;
				const previous = this.events;
				this.events = void 0;
				previous?.close();
				const events = this.deps.eventSourceFactory(`${EVENTS_URL}?thumbnails=${this.thumbnailConsumers > 0 ? "1" : "0"}`);
				this.events = events;
				events.onmessage = (message) => {
					if (!this.started || this.events !== events) return;
					let event;
					try {
						event = JSON.parse(message.data);
					} catch {
						return;
					}
					this.reconnectAttempts = 0;
					this.reconnecting = false;
					this.apply(event);
				};
				events.onerror = () => {
					if (!this.started || this.events !== events) return;
					if (events.readyState === void 0 || events.readyState === 2) this.scheduleReconnect();
					if (this.reconnecting) return;
					this.reconnecting = true;
					this.publish();
				};
			}
			/** Re-create the stream after a fatal failure, with a bounded backoff. */
			scheduleReconnect() {
				if (this.reconnectTimer !== void 0) return;
				const index = Math.min(this.reconnectAttempts, EVENT_STREAM_RETRY_DELAYS_MS.length - 1);
				const delay = EVENT_STREAM_RETRY_DELAYS_MS[index];
				if (delay === void 0) return;
				this.reconnectAttempts += 1;
				this.reconnectTimer = setTimeout(() => {
					this.reconnectTimer = void 0;
					if (!this.started) return;
					this.connectEvents();
				}, delay);
			}
			/** Every initial connection and reconnect starts with the server's snapshot. */
			start() {
				if (this.started) return;
				this.started = true;
				this.connectEvents();
				this.publish();
			}
			stop() {
				const previous = this.events;
				this.events = void 0;
				this.started = false;
				previous?.close();
				clearTimeout(this.reconnectTimer);
				this.reconnectTimer = void 0;
				this.reconnectAttempts = 0;
				this.reconnecting = false;
				this.clearThumbnails();
				this.sessions.clear();
				this.available = true;
				this.publish();
			}
			/**
			* Hold the feed for one consumer's lifetime: the stream starts with the
			* first holder and stops with the last release. Several carriers can share
			* the store (the floating card, the native sidebar tab, and the sidebar
			* integration fiber) without one unmount killing the others' updates.
			*/
			acquire() {
				this.consumers += 1;
				if (this.consumers === 1) this.start();
			}
			release() {
				if (this.consumers === 0) return;
				this.consumers -= 1;
				if (this.consumers === 0) this.stop();
			}
			/** Only visible image surfaces request screenshots; metadata watchers do not. */
			watchThumbnails() {
				this.thumbnailConsumers += 1;
				if (this.thumbnailConsumers === 1 && this.started) this.connectEvents();
				let released = false;
				return () => {
					if (released) return;
					released = true;
					this.thumbnailConsumers -= 1;
					if (this.thumbnailConsumers === 0 && this.started) this.connectEvents();
				};
			}
			forgetThumbnail(attachmentId) {
				clearTimeout(this.retryTimers.get(attachmentId));
				this.retryTimers.delete(attachmentId);
				this.retryCounts.delete(attachmentId);
				revoke(this.thumbs.get(attachmentId)?.url);
				this.thumbs.delete(attachmentId);
			}
			clearThumbnails() {
				for (const attachmentId of this.thumbs.keys()) this.forgetThumbnail(attachmentId);
				this.thumbBySession.clear();
				this.lastReady.clear();
			}
			/** Forget one session's tracked + held frames, revoking their blob URLs. */
			dropThumb(sessionId) {
				const attachmentId = this.thumbBySession.get(sessionId);
				const held = this.lastReady.get(sessionId);
				this.thumbBySession.delete(sessionId);
				this.lastReady.delete(sessionId);
				if (attachmentId !== void 0) this.forgetThumbnail(attachmentId);
				if (held !== void 0 && held.attachmentId !== attachmentId) this.forgetThumbnail(held.attachmentId);
			}
			/**
			* Track the frame a session currently advertises. The last *ready* blob is
			* kept until the replacement loads — dropping it on the upsert is what
			* made the overlay flash a placeholder between breaths.
			*/
			trackThumb(sessionId, attachmentId) {
				if (attachmentId === void 0) {
					this.dropThumb(sessionId);
					return;
				}
				const previous = this.thumbBySession.get(sessionId);
				if (previous === attachmentId) return;
				this.thumbBySession.set(sessionId, attachmentId);
				const heldId = this.lastReady.get(sessionId)?.attachmentId;
				if (previous !== void 0 && previous !== heldId) this.forgetThumbnail(previous);
			}
			apply(event) {
				if (event.type === "snapshot") {
					this.sessions = new Map(event.sessions.map((session) => [session.sessionId, session]));
					for (const sessionId of this.thumbBySession.keys()) if (!this.sessions.has(sessionId)) this.dropThumb(sessionId);
					for (const session of event.sessions) this.trackThumb(session.sessionId, session.thumbnailAttachmentId);
					this.available = event.available;
				} else if (event.type === "reset") {
					this.sessions.clear();
					this.clearThumbnails();
				} else if (event.type === "remove" && event.session !== void 0) {
					this.sessions.delete(event.session.sessionId);
					this.dropThumb(event.session.sessionId);
				} else if (event.type === "upsert" && event.session !== void 0) {
					this.sessions.set(event.session.sessionId, event.session);
					this.trackThumb(event.session.sessionId, event.session.thumbnailAttachmentId);
				} else if (event.type === "availability") this.available = event.available;
				this.publish();
				if (event.type === "snapshot") for (const session of event.sessions) this.retryThumbnail(session.thumbnailAttachmentId);
			}
			/**
			* Ensure a thumbnail load is in flight for one attachment reference. New
			* frames replace the old URL only after they load; failures keep the last
			* good frame (the caller renders `status: 'error'` as a small badge over
			* the old image).
			*/
			ensureThumbnail(attachmentId) {
				if (!this.started || attachmentId === void 0 || this.sessionOf(attachmentId) === void 0 || this.thumbs.has(attachmentId)) return;
				const loading = { status: "loading" };
				this.thumbs.set(attachmentId, loading);
				this.publish();
				this.deps.loadImage(attachmentId).then((url) => {
					if (this.thumbs.get(attachmentId) !== loading) {
						revoke(url);
						return;
					}
					this.retryCounts.delete(attachmentId);
					this.thumbs.set(attachmentId, {
						status: "ready",
						url
					});
					const sessionId = this.sessionOf(attachmentId);
					if (sessionId !== void 0) {
						const previous = this.lastReady.get(sessionId);
						if (previous !== void 0 && previous.attachmentId !== attachmentId) this.forgetThumbnail(previous.attachmentId);
						this.lastReady.set(sessionId, {
							attachmentId,
							url
						});
					}
					this.publish();
				}, () => {
					if (this.thumbs.get(attachmentId) !== loading) return;
					const failed = { status: "error" };
					this.thumbs.set(attachmentId, failed);
					const attempts = this.retryCounts.get(attachmentId) ?? 0;
					const delay = THUMBNAIL_RETRY_DELAYS_MS[attempts];
					if (delay !== void 0) {
						this.retryCounts.set(attachmentId, attempts + 1);
						this.retryTimers.set(attachmentId, setTimeout(() => {
							this.retryTimers.delete(attachmentId);
							if (this.thumbs.get(attachmentId) !== failed) return;
							this.thumbs.delete(attachmentId);
							this.ensureThumbnail(attachmentId);
						}, delay));
					}
					this.publish();
				});
			}
			/** Explicit retry (also used on a fresh connection after an outage). */
			retryThumbnail(attachmentId) {
				if (attachmentId === void 0 || this.thumbs.get(attachmentId)?.status !== "error") return;
				this.forgetThumbnail(attachmentId);
				this.ensureThumbnail(attachmentId);
			}
			/** Interrupt the current or named session's in-flight call. */
			async interrupt(sessionId) {
				try {
					const res = await this.deps.fetchFn(INTERRUPT_URL, {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify(sessionId === void 0 ? {} : { sessionId })
					});
					if (!res.ok) return false;
					return (await res.json()).interrupted === true;
				} catch {
					return false;
				}
			}
			/**
			* Stop one session and close its Agent Window. The session's removal
			* arrives through the SSE remove event — no local state is touched here.
			*/
			async stopSession(sessionId) {
				try {
					const res = await this.deps.fetchFn(STOP_URL, {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({ sessionId })
					});
					if (!res.ok) return false;
					return (await res.json()).stopped === true;
				} catch {
					return false;
				}
			}
		};
		//#endregion
		//#region src/client/index.ts
		/** Required services: slots, session-scoped attachment reads, and the overlay seat. */
		const inject = ["slots", "sessions"];
		/** Return a fresh component-owned URL; the host's loadImage may return shared cached URLs. */
		async function loadSessionImage(sessions, sessionId, attachment) {
			const session = sessions.binding(sessionId)?.session;
			if (session === void 0) throw new Error(`screenshot toolview: session "${String(sessionId)}" is not bound`);
			const result = await session.readAttachment(attachment.attachmentId);
			if (!result.ok) throw new Error(`screenshot toolview: readAttachment failed: ${result.error.code}: ${result.error.message}`);
			const bytes = Uint8Array.from(result.value.data);
			return URL.createObjectURL(new Blob([bytes.buffer], { type: result.value.attachment.mediaType }));
		}
		/**
		* Thumbnail loader for the overlay: frames are plugin-owned runtime data
		* (never referenced by a session log, so the session-authorized RPC refuses
		* them), served by the host over the plugin's own route.
		*/
		async function overlayImageLoader(attachmentId) {
			const res = await fetch(`/bsk-observation/thumbnail/${encodeURIComponent(attachmentId)}`);
			if (!res.ok) throw new Error(`thumbnail fetch failed: ${res.status}`);
			return URL.createObjectURL(await res.blob());
		}
		/**
		* Client plugin body: register the keyed toolview and the observation overlay.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			const sessions = ctx.get("sessions");
			ctx.slots.inject("tool.call.toolview", () => ctx.slots.register({
				name: "tool.call.toolview",
				key: "browser_inspect"
			}, function BrowserInspectSessionView(props) {
				const loadImage = (0, react.useCallback)((attachment) => loadSessionImage(sessions, props.sessionId, attachment), [props.sessionId]);
				return (0, react.createElement)(BrowserInspectToolView, {
					...props,
					loadImage
				});
			}));
			const store = new ObservationClientStore({
				fetchFn: (url, init) => fetch(url, init),
				eventSourceFactory: (url) => new EventSource(url),
				loadImage: overlayImageLoader
			});
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "bsk-observation"
			}, () => (0, react.createElement)(ObservationOverlay, { store })));
			ctx.inject(["sidebarRight", "sidebarRightTabs"], (injected) => registerObservationSidebar(injected, store));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
