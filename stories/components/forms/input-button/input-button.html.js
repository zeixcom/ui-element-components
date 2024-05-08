import { html } from 'lit';

import './input-button.css';
import './input-button.js';

export default ({ variant, size, label, disabled = false, className, onClick }) => html`
<input-button ?class=${className}>
  <button
    type="button"
    class=${[variant || 'secondary', size || 'medium'].join(' ')}
    ?disabled=${disabled}
    @click=${onClick}
  >
    ${label}
  </button>
</input-button>`;
