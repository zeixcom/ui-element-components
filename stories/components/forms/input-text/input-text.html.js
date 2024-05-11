import { html, nothing } from 'lit';

import './input-text.css';
import './input-text.js';

export default ({
  label,
  id,
  name,
  value,
  error = '',
  description = '',
  disabled = false,
  readonly = false,
  required = false,
  className,
  onInput,
  onChange
}) => html`
<input-text value=${value} class=${className}>
  <label for="${id}-input">${label}</label>
  <input
    type="text"
    id="${id}-input"
    name=${name || id}
    value=${value}
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
</input-text>`;
