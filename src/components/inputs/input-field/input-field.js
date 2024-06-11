import UIElement from '../../../assets/js/ui-element';
import { define, replaceText } from '../../../assets/js/utils';

define('input-field', class extends UIElement {
  static observedAttributes = ['value', 'description'];
  attributeMap = new Map([['value', v => this.isNumber ? this.#parseNumber(v) : v]]);

  connectedCallback() {
    const input = this.querySelector('input');
    this.isNumber = input && input.type === 'number';
    this.isInteger = this.hasAttribute('integer');
    const [error, description, clearbutton, spinbutton, decrement, increment] =
      ['error', 'description', 'clear', 'spinbutton', 'decrement', 'increment']
      .map(className => this.querySelector(`.${className}`));
    this.set('value', input.value, false);
    this.set('error', error.textContent, false);
    this.set('empty', input.value === '');
    description?.textContent && this.set('description', description.textContent, false);

    const isNumber = num => typeof num === 'number';

    // setup spin button with step and min/max attributes
    const [step, min, max] = (() => {
      if (!this.isNumber || !spinbutton) return [];
      const getNumber = attr => {
        const num = this.#parseNumber(input[attr]);
        if (isNumber(num) && !Number.isNaN(num)) return num;
      };
      // ensure value is a number in case attributeChangedCallback before connectedCallback
      this.set('value', this.#parseNumber(input.value));
      const temp = this.#parseNumber(spinbutton.dataset.step);
      return !Number.isNaN(temp) ? [temp, getNumber('min'), getNumber('max')] : [];
    })();

    // bring value to nearest step
    const nearestStep = v => {
      const steps = Math.round((max - min) / step);
      let zerone = Math.round((v - min) * steps / (max - min)) / steps; // bring to 0-1 range    
      zerone = Math.min(Math.max(zerone, 0), 1); // keep in range in case value is off limits
      const value = zerone * (max - min) + min;
      return this.isInteger ? Math.round(value) : value;
    };

    // trigger value-change event to commit the value change
    const triggerChange = value => {
      this.set('value', value);
      const newValue = (typeof value === 'function') ? this.get('value') : value;
      (input.value !== String(newValue)) && (value = newValue);
      this.set('error', input.validationMessage);
      const event = new CustomEvent('value-change', { detail: newValue, bubbles: true });
      this.dispatchEvent(event);
    };

    // handle input changes
    input.onchange = () => triggerChange(this.isNumber ? input.valueAsNumber : input.value);
    input.oninput = () => this.set('empty', input.value.length === 0);

    // handle clear button click
    clearbutton && (clearbutton.onclick = () => this.clear());

    if (spinbutton) {
      const stepDecrement = (bigStep = false) => triggerChange(v => nearestStep(v - (bigStep ? step * 10 : step)));
      const stepIncrement = (bigStep = false) => triggerChange(v => nearestStep(v + (bigStep ? step * 10 : step)));

      // handle spin button clicks
      decrement && (decrement.onclick = e => stepDecrement(e.shiftKey));
      increment && (increment.onclick = e => stepIncrement(e.shiftKey));

      // handle arrow key events
      input.onkeydown = e => {
        if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
          e.stopPropagation();
          e.preventDefault();
          (e.key === 'ArrowDown') && stepDecrement(e.shiftKey);
          (e.key === 'ArrowUp') && stepIncrement(e.shiftKey);
        }
      }
    }

    // update value
    this.effect(() => {
      const value = this.get('value');
      if (this.isNumber && !isNumber(value)) { // ensure value is a number if it is not already a number
        return this.set('value', this.#parseNumber(value)); // effect will be called again with numeric value
      }
      if (this.isNumber && !Number.isNaN(value)) { // change value only if it is a valid number
        input.value = value;
        step && decrement && (decrement.disabled = (isNumber(min) && (value - step < min)));
        step && increment && (increment.disabled = (isNumber(max) && (value + step > max)));
      }
    });

    // update error message and aria-invalid attribute
    this.effect(() => {
      const errorMsg = this.get('error');
      const invalidAttr = 'aria-invalid';
      const erorAttr = 'aria-errormessage';
      replaceText(error, errorMsg);
      if (errorMsg) {
        input.setAttribute(invalidAttr, 'true');
        input.setAttribute(erorAttr, error.getAttribute('id'));
      } else {
        input.setAttribute(invalidAttr, 'false');
        input.removeAttribute(erorAttr);
      }
    });

    // update description message and aria-describedby attribute
    this.effect(() => {
      if (this.has('description')) {
        const descMsg = this.get('description');
        const descAttr = 'aria-describedby';
        replaceText(description, descMsg);
        descMsg ? input.setAttribute(descAttr, description.getAttribute('id')) : input.removeAttribute(descAttr);
      }
    });

    // hide clear button if value is empty
    this.effect(() => {
      (clearbutton && this.get('empty'))
        ? clearbutton.classList.add('hidden')
        : clearbutton.classList.remove('hidden');
    });

  }

  /**
   * Clear the input field
   */
  clear() {
    this.querySelector('input').value = '';
    this.set('value', '');
    this.set('empty', true);
  }

  /**
   * Parse number from string
   */
  #parseNumber(v) {
    return this.isInteger? parseInt(v, 10) : parseFloat(v);
  }

});
