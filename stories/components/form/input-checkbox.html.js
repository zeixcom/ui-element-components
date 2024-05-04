import { html } from 'lit';

import './input-checkbox.css';
import './input-checkbox.js';

export const InputCheckbox = ({ label, checked = false, onChange }) => html`
<input-checkbox ?checked=${checked}>
  <label>
    <input
      class="visually-hidden"
      type="checkbox"
      ?checked=${checked}
      @change=${onChange}
    />
    <span>${label}</span>
  </label>
</input-checkbox>`;
