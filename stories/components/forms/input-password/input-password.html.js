import { html } from 'lit';

import './input-password.css';
import './input-password.js';

export default ({ label, id, name, onInput, onChange }) => html`
<input-password>
  <label for="${id}-input">${label}</label>
  <input
    type="password"
    id="${id}-input"
    name="${name || id}"
    autocomplete="off"
    @input=${onInput}
    @change=${onChange}
  />
</input-password>`;
