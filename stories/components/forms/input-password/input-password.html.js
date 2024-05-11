import { html, nothing } from 'lit';

import './input-password.css';
import './input-password.js';

export default ({
  label,
  id,
  name,
  error = '',
  description = '',
  disabled = false,
  readonly = false,
  required = false,
  className,
  onInput,
  onChange
}) => html`
<input-password class=${className}>
  <label for="${id}-input">${label}</label>
  <input
    type="password"
    id="${id}-input"
    name=${name || id}
    aria-invalid=${error ? 'true' : nothing}
    aria-errormessage=${error ? `${id}-error` : nothing}
    aria-describedby=${description ? `${id}-description` : nothing}
    ?disabled=${disabled}
    ?readonly=${readonly}
    ?required=${required}
    autocomplete="off"
    @input=${onInput}
    @change=${onChange}
  />
  <p id="${id}-error" class="error" aria-live="assertive">${error}</p>
  <p id="${id}-description" class="description" aria-live="polite">${description}</p>
</input-password>`;
