import { fn } from "@storybook/test";

import "./code-block";

// HTML template for rendering the code-block component
const CodeBlockTemplate = (args) => {
	return `
    <code-block
      language="${args.language}"
      ${args.collapsed ? "collapsed" : ""}
      ${args.theme ? `theme="${args.theme}"` : ""}
      ${args.lineNumbers ? "line-numbers" : ""}
      ${args.highlightLines ? `highlight-lines="${args.highlightLines}"` : ""}>
      <div class="meta">
        ${args.file ? `<div class="file">${args.file}</div>` : ""}
        <div class="language">${args.language}</div>
      </div>
      <pre>
        <code>${args.code}</code>
      </pre>
      <button class="copy" copy-success="${args.copySuccess}" copy-error="${args.copyError}">${args.copyLabel}</button>
      <button class="overlay">${args.expandLabel}</button>
    </code-block>
  `;
};

export default {
	title: "blocks/code-block",
	render: (args) => CodeBlockTemplate(args),
	argTypes: {
		language: {
			control: { type: "select" },
			options: [
				"html",
				"css",
				"js",
				"ts",
				"jsx",
				"tsx",
				"json",
				"markdown",
			],
			defaultValue: { summary: "markdown" },
		},
		theme: {
			control: { type: "select" },
			options: ["gruvbox-dark-medium", "gruvbox-light-medium"],
			defaultValue: { summary: "gruvbox-dark-medium" },
		},
		lineNumbers: {
			control: "boolean",
			defaultValue: { summary: false },
		},
		highlightLines: {
			control: "text",
			defaultValue: { summary: "" },
			description:
				'Comma-separated line numbers or ranges, e.g. "1,3-5,7"',
		},
		collapsed: {
			control: "boolean",
			defaultValue: { summary: false },
		},
		copyLabel: {
			defaultValue: { summary: "Copy" },
		},
		copySuccess: {
			defaultValue: { summary: "Copied!" },
		},
		copyError: {
			defaultValue: { summary: "Error trying to copy to clipboard!" },
		},
		expandLabel: {
			defaultValue: { summary: "Expand" },
		},
	},
	args: {
		language: "ts",
		theme: "github-dark",
		code: `import {
	type Component,
	asBoolean,
	asString,
	component,
	first,
	on,
	toggleAttribute,
} from "@zeix/ui-element";

import { getHighlighter, type Lang, type Theme } from 'shiki';

import type { InputButtonProps } from "../../inputs/input-button/input-button";

export type CodeBlockProps = {
	collapsed: boolean;
	language?: string;
	theme?: string;
};

export default component(
	"code-block",
	{
		collapsed: asBoolean,
		language: asString,
		theme: asString,
	},
	async (el) => {
		const code = el.querySelector("code");
		const defaultLanguage = 'typescript';
		const defaultTheme = 'github-dark';

		// Apply syntax highlighting if code element exists
		if (code) {
			const language = el.language || defaultLanguage;
			const theme = el.theme || defaultTheme;
			await applyHighlighting(code, language, theme);
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
				on("click", async (e) => {
					// Copy code to clipboard
				}),
			),
		];
	},
);`,
		file: "code-block.js",
		collapsed: false,
		copyLabel: "Copy",
		copySuccess: "Copied!",
		copyError: "Error trying to copy to clipboard!",
		expandLabel: "Expand",
		onCopyClick: fn(),
		onExpandClick: fn(),
	},
};

export const Expanded = {
	args: {},
};

export const Collapsed = {
	args: {
		language: "css",
		file: "code-block.css",
		code: `code-block {
	position: relative;
	display: block;
	margin: calc(-1 * var(--space-l)) 0 var(--space-l);

	.meta {
		display: flex;
		margin-bottom: var(--space-xs);
		font-size: var(--font-size-s);
		color: var(--color-text-soft);
	}

	.language {
		margin-left: auto;
		text-transform: uppercase;
	}

	& pre {
		color: var(--color-gray-10);
		background: var(--color-gray-90);
		padding: var(--space-s);
		margin: var(--space-xs) 0;
		overflow: auto;
		border-radius: var(--space-xs);
	}

	.copy {
		position: absolute;
		right: var(--space-s);
		bottom: var(--space-s);
	}

	.overlay {
		display: none;
	}

	&[collapsed] {
		max-height: 12rem;
		overflow: hidden;
	}
}`,
		collapsed: true,
	},
};

export const JavaScript = {
	args: {
		language: "js",
		file: "example.js",
		code: `function calculateFactorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * calculateFactorial(n - 1);
}

// Example usage
const number = 5;
const result = calculateFactorial(number);
console.log(\`The factorial of \${number} is \${result}\`);

// Using modern JavaScript features
const arrowFactorial = (n) => (n <= 1 ? 1 : n * arrowFactorial(n - 1));
const numbers = [1, 2, 3, 4, 5];
const results = numbers.map(arrowFactorial);
console.log(results);`,
	},
};

export const Json = {
	args: {
		language: "json",
		theme: "monokai",
		file: "package.json",
		lineNumbers: true,
		code: `{
  "name": "ui-element-components",
  "version": "1.0.0",
  "description": "Component library of UIElement Components in Storybook",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1",
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    "@zeix/ui-element": "^0.12.1",
    "shiki": "^3.4.0"
  }
}`,
	},
};

export const TypeScriptWithLineHighlighting = {
	args: {
		language: "ts",
		theme: "github-dark",
		file: "component.ts",
		lineNumbers: true,
		highlightLines: "3,7-9,15-18",
		code: `import { component, asString, asBoolean } from '@zeix/ui-element';

// This component demonstrates line highlighting
export default component(
  'highlighted-example',
  {
    // These are the observed attributes
    name: asString,
    active: asBoolean,
    count: (val) => parseInt(val || '0', 10)
  },
  (el) => {
    const logger = (msg: string) => console.log(msg);

    // The following lines are important
    return [
      (host) => {
        logger(\`Component initialized: \${host.name}\`);
        console.log(\`Active status: \${host.active}\`);
      }
    ];
  }
);`,
	},
};
