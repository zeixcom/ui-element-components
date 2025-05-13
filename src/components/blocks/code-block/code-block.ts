import {
	type Component,
	asBoolean,
	component,
	consume,
	first,
	on,
	toggleAttribute,
} from "@zeix/ui-element";

import { createHighlighter } from "shiki";

import type { InputButtonProps } from "../../inputs/input-button/input-button";
import { MEDIA_THEME } from "../../../patterns/contexts/media-context/media-context";

export type CodeBlockProps = {
	collapsed: boolean;
	theme: "light" | "dark";
};

export const highlighter = await createHighlighter({
	themes: ["gruvbox-dark-medium", "gruvbox-light-medium"],
	langs: ["html", "css", "js", "ts", "jsx", "tsx", "json", "markdown"],
});

const parseHighlightLines = (highlightLines: string): number[] => {
	if (!highlightLines) return [];

	const result: number[] = [];
	const parts = highlightLines.split(",");

	for (const part of parts) {
		if (part.includes("-")) {
			const [start, end] = part.split("-").map(Number);
			for (let i = start; i <= end; i++) {
				result.push(i);
			}
		} else {
			result.push(Number(part));
		}
	}

	return result;
};

const applyHighlighting = (
	target: HTMLElement,
	lang = "markdown",
	theme = "gruvbox-dark-medium",
	showLineNumbers = false,
	linesToHighlight: number[] = [],
) => {
	const code = target.textContent?.trim() ?? "";
	let html = highlighter.codeToHtml(code, { lang, theme });

	if (html) {
		// If line numbers or line highlighting is requested, we need to wrap each line
		if (showLineNumbers || linesToHighlight.length > 0) {
			const codeLines = html.split("\n");
			const wrappedLines = codeLines.map((line, index) => {
				const lineNumber = index + 1;
				const isHighlighted = linesToHighlight.includes(lineNumber);
				const lineNumberClass = showLineNumbers ? "line-number" : "";
				const highlightedClass = isHighlighted
					? "highlighted-line"
					: "";
				const classes = [lineNumberClass, highlightedClass]
					.filter(Boolean)
					.join(" ");

				if (classes) {
					return `<span class="${classes}" data-line="${lineNumber}">${line}</span>`;
				}
				return line;
			});
			html = wrappedLines.join("\n");
		}
	}
	target.innerHTML = html;
};

export default component(
	"code-block",
	{
		collapsed: asBoolean,
		theme: consume(MEDIA_THEME),
	},
	(el) => {
		const code = el.querySelector("code");

		if (code) {
			const lineNumbers = el.hasAttribute("line-numbers");
			const linesToHighlight = parseHighlightLines(
				el.getAttribute("highlight-lines") || "",
			);
			const lang = el.getAttribute("language") || "markdown";
			applyHighlighting(
				code,
				lang,
				`gruvbox-dark-medium`,
				lineNumbers,
				linesToHighlight,
			);
		}

		return [
			toggleAttribute("collapsed"),
			first(
				".overlay",
				on("click", () => {
					el.collapsed = false;
				}),
			),
			first(
				".copy",
				on("click", async (e: Event) => {
					const copyButton =
						e.currentTarget as Component<InputButtonProps>;
					const label = copyButton.textContent?.trim() ?? "";
					let status = "success";
					try {
						await navigator.clipboard.writeText(
							code?.textContent?.trim() ?? "",
						);
					} catch (err) {
						console.error(
							"Error when trying to use navigator.clipboard.writeText()",
							err,
						);
						status = "error";
					}
					copyButton.disabled = true;
					copyButton.label =
						el.getAttribute(`copy-${status}`) ?? label;
					setTimeout(
						() => {
							copyButton.disabled = false;
							copyButton.label = label;
						},
						status === "success" ? 1000 : 3000,
					);
				}),
			),
		];
	},
);

declare global {
	interface HTMLElementTagNameMap {
		"code-block": Component<CodeBlockProps>;
	}
}
