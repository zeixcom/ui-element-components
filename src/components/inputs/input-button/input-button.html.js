import { html, nothing } from 'lit';

import './input-button.css';
import './input-button.js';

export default ({ label, type = 'button', variant, size, disabled = false, className, onClick }) => html`
<input-button class=${className || nothing}>
  <button
    type=${type}
    class=${[variant || 'secondary', size || 'medium'].join(' ')}
    ?disabled=${disabled}
    @click=${onClick}
  >
    ${label}
  </button>
</input-button>`;
