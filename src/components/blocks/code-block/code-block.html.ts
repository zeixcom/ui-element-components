import { html } from 'lit';

import InputButton from '../../../components/inputs/input-button/input-button.html';

import './code-block.ts';
import './code-block.css';
import './prism-okaidia.css';

type CodeBlockParams = {
	code: string,
	file?: string,
	language?: 'html' | 'css' | 'js' | 'ts'
	collapsed?: boolean,
	copyLabel?: string,
	copySuccess?: string,
	copyError?: string,
	expandLabel?: string,
	onCopyClick?: (e: PointerEvent) => void
	onExpandClick?: (e: PointerEvent) => void
}

export default ({
	code,
	file,
	language = 'html',
	collapsed = false,
	copyLabel = 'Copy',
	copySuccess = 'Copied!',
	copyError = 'Error trying to copy to clipboard!',
	expandLabel = 'Expand',
	onCopyClick,
	onExpandClick
}: CodeBlockParams) => html`
<code-block language=${language} ?collapsed=${collapsed} copy-success=${copySuccess} copy-error=${copyError}>
	<p class="meta">
		${file && html`<span class="file">${file}</span>`}
		<span class="language">${language}</span>
	</p>
	<pre><code class="language-${language}">${code}</code></pre>
	${InputButton({
		label: copyLabel,
		className: 'copy',
		size: 'small',
		onClick: onCopyClick
	})}
	<button type="button" class="overlay" @click=${onExpandClick}>${expandLabel}</button>
</code-block>`;