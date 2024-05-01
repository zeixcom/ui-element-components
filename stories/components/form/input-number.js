import { html } from 'lit';
import UIElement from '@efflore/ui-element';

import './input-number.css';

/**
 * Primary UI component for user interaction
 */
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
}) => {

  define('input-number', class extends UIElement {
		static observedAttributes = ['value', 'description'];

    attributeMapping = {
      value: v => Number.isInteger(this.step) ? parseInt(v, 10) : parseFloat(v),
    }

		connectedCallback() {
      const input = this.querySelector('input');
      const [decrement, increment, error, description] = ['decrement', 'increment', 'error', 'description']
        .map(className => this.querySelector(`.${className}`));

      const getNumber = (attr, valid, fallback) => {
        if (input.hasAttribute(attr)) {
          const num = parseFloat(input.getAttribute(attr));
          return valid(num) ? num : fallback;
        }
        return fallback;
      };

      this.step = getNumber('step', n => !Number.isNaN(n) && (n > 0), 1);

			this.set('error', '');

			input.onchange = () => this.set('value', input.valueAsNumber);
			decrement && (decrement.onclick = () => this.set('value', v => v - this.step));
			increment && (increment.onclick = () => this.set('value', v => v + this.step));

			this.effect(() => {
        const value = this.get('value');
				if (!Number.isNaN(value)) {
					input.value = value;
					if (decrement) {
						const min = getNumber('min', n => !Number.isNaN(n), undefined);
						decrement.disabled = (min && (value - this.step < min));
					}
					if (increment) {
						const max = getNumber('max', n => !Number.isNaN(n), undefined);
						increment.disabled = (max && (value + this.step > max));
					}
          this.setAttribute('value', value);
				}
				this.set('error', input.validationMessage);
			});

			this.effect(() => {
				const errorMsg = this.get('error');
				const errorId = error.getAttribute('id');
				const invalidAttr = 'aria-invalid';
				const erorAttr = 'aria-errormessage';
				error.textContent = errorMsg;
				if (errorMsg) {
					input.setAttribute(invalidAttr, 'true');
					input.setAttribute(erorAttr, errorId);
				} else {
					input.setAttribute(invalidAttr, 'false');
				  input.removeAttribute(erorAttr);
				}
			});

			this.effect(() => {
				if (this.has('description')) {
					const descMsg = this.get('description');
					const descId = description.getAttribute('id');
					const descAttr = 'aria-describedby';
					description.textContent = descMsg;
					descMsg ? input.setAttribute(descAttr, descId) : input.removeAttribute(descAttr);
				}
			});

		}

	});

  return html`
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
</input-number>
  `;
};
