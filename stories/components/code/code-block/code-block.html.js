import { html } from 'lit';

import { InputButton } from '../../form/input-button/input-button.html';

import './code-block.css';
import './prism-okaidia.css';
import './code-block.js';

export const CodeBlock = ({ language, code, file, collapsed = false }) => html`
<code-block language=${language} ?collapsed=${collapsed}>
  <p class="meta">
    ${file && html`<span class="file">${file}</span>`}
    <span class="language">${language}</span>
  </p>
  <pre>
    <code class="language-${language}">
${code}
    </code>
  </pre>
  ${InputButton({ label: 'Copy', className: 'copy' })}
  <button class="overlay">Expand</button>
</code-block>`;