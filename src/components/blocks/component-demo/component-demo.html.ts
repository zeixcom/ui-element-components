import { html } from "lit";

import AccordionPanel from "../accordion-panel/accordion-panel.html";
import TabGroup from "../tab-group/tab-group.html";
import CodeBlock from "../code-block/code-block.html";

import "./component-demo.css";

export default ({
	name,
	content,
	htmlSource,
	cssSource,
	jsSource,
	codeLabel,
	htmlLabel,
	cssLabel,
	jsLabel,
}) =>
	html` <component-demo>
		<div class="preview">${content}</div>
		${AccordionPanel({
			open: false,
			title: codeLabel,
			content: TabGroup({
				tabs: [
					{
						title: htmlLabel,
						open: true,
						content: CodeBlock({
							code: htmlSource,
							language: "html",
							file: `${name}.html`,
						}),
					},
					{
						title: cssLabel,
						open: false,
						content: CodeBlock({
							code: cssSource,
							language: "css",
							file: `${name}.css`,
						}),
					},
					{
						title: jsLabel,
						open: false,
						content: CodeBlock({
							code: jsSource,
							language: "js",
							file: `${name}.js`,
						}),
					},
				],
			}),
		})}
	</component-demo>`;
