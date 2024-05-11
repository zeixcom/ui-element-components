import { html, nothing } from 'lit';

import './input-number.css';
import './input-number.js';

export default ({
  label,
  id,
  name,
  value,
  step,
  min,
  max,
  form,
  pattern,
  placeholder,
  length = 'short',
  prefix = '',
  suffix = '',
  error = '',
  description = '',
  disabled = false,
  readonly = false,
  required = false,
  integer = false,
  className,
  onInput,
  onChange,
}) => html`
<input-number value=${value} ?integer=${integer} class=${className || nothing}>
  <label for="${id}-input">${label}</label>
  <div class="row">
    <div class="group ${length}">
      ${prefix && html`<span>${prefix}</span>`}
      <input
        type="number"
        id="${id}-input"
        name=${name || id}
        value=${value}
        min=${min || nothing}
        max=${max || nothing}
        step=${integer ? step : 'any'}
        form=${form || nothing}
        pattern=${pattern || nothing}
        placeholder=${placeholder || nothing}
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
      ${suffix && html`<span>${suffix}</span>`}
    </div>
    ${step && (html`<div class="spinbutton" data-step=${step}>
      <button type="button" class="decrement" aria-label="decrement">−</button>
      <button type="button" class="increment" aria-label="increment">+</button>
    </div>`)}
  </div>
  <p id="${id}-error" class="error" aria-live="assertive">${error}</p>
  <p id="${id}-description" class="description" aria-live="polite">${description}</p>
</input-number>`;