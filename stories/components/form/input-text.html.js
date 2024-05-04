import { html } from 'lit';

import './input-text.css';
import './input-text.js';

export const InputText = ({ label, id, name, value, onInput, onChange }) => html`
<input-text>
  <label for="${id}-input">${label}</label>
  <input
    type="text"
    id="${id}-input"
    name="${name || id}"
    value="${value}"
    autocomplete="off"
    @input=${onInput}
    @change=${onChange}
  />
</input-text>`;
