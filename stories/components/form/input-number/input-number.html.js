import { html } from 'lit';

import './input-number.css';
import './input-number.js';

export const InputNumber = ({
  label,
  id,
  name,
  value,
  min,
  max,
  step,
  form,
  pattern,
  placeholder,
  prefix = '',
  suffix = '',
  error = '',
  description = '',
  disabled = false,
  readonly = false,
  required = false,
  onInput,
  onChange,
}) => html`
<input-number value="${value}">
  <label for="${id}-input">${label}</label>
  <div class="row">
    <div class="group">
      <span>${prefix}</span>
      <input
        type="number"
        id="${id}-input"
        name="${name || id}"
        value="${value}"
        ?min=${min}
        ?max=${max}
        ?step=${step}
        ?form=${form}
        ?pattern=${pattern}
        ?placeholder=${placeholder}
        ?aria-invalid=${error && 'true'}
        ?aria-errormessage=${error && `${id}-error`}
        ?aria-describedby=${description && `${id}-description`}
        ?disabled=${disabled}
        ?readonly=${readonly}
        ?required=${required}
        @input=${onInput}
        @change=${onChange}
      />
      <span>${suffix}</span>
    </div>
    ${step && (html`<div class="spinbutton">
      <button type="button" class="decrement" aria-label="decrement">−</button>
      <button type="button" class="increment" aria-label="increment">+</button>
    </div>`)}
  </div>
  <p id="${id}-error" class="error" aria-live="assertive">${error}</p>
  <p id="${id}-description" class="description" aria-live="polite">${description}</p>
</input-number>`;