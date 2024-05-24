import { html, nothing } from 'lit';

import './input-field.css';
import './input-field.js';

export default ({
  label,
  type = 'text',
  id,
  name,
  value,
  step,
  min,
  max,
  form,
  pattern,
  placeholder,
  length = 'auto',
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
<input-field value=${value} ?integer=${type === 'number' && integer} class=${className || nothing}>
  <label for="${id}-input">${label}</label>
  <div class="row">
    <div class="group ${length}">
      ${prefix && html`<span>${prefix}</span>`}
      <input
        type=${type}
        id="${id}-input"
        name=${name || id}
        value=${value || nothing}
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
    ${(type === 'number') && step ? html`<div class="spinbutton" data-step=${step}>
      <button type="button" class="decrement" aria-label="decrement">−</button>
      <button type="button" class="increment" aria-label="increment">+</button>
    </div>` : nothing}
  </div>
  <p id="${id}-error" class="error" aria-live="assertive">${error}</p>
  <p id="${id}-description" class="description" aria-live="polite">${description}</p>
</input-field>`;