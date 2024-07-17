import UIElement, { effect } from '@efflore/ui-element';
import { setText, setProp, setAttr, setClass } from '../../../assets/js/dom-utils';

// check if value is a number
const isNumber = num => typeof num === 'number';

class InputField extends UIElement {
  static observedAttributes = ['value', 'description'];
  attributeMap = { value: v => this.isNumber ? this.#parseNumber(v) : v };

  connectedCallback() {
    this.input = this.querySelector('input');
    this.isNumber = this.input && this.input.type === 'number';
    this.isInteger = this.hasAttribute('integer');

    // set default states
    this.set('value', this.isNumber ? this.input.valueAsNumber : this.input.value, false);
    this.set('length', this.input.value.length);
    
    // derived states
    this.set('empty', () => this.get('length') === 0);

    // setup sub elements
    this.#setupErrorMessage();
    this.#setupDescription();
    this.#setupSpinButton();
    this.#setupClearButton();

    // handle input changes
    this.input.onchange = () => this.#triggerChange(this.isNumber ? this.input.valueAsNumber : this.input.value);
    this.input.oninput = () => this.set('length', this.input.value.length);

    // update value
    effect(async () => {
      const value = this.get('value');
      const validate = this.getAttribute('validate');
      if (value && validate) {
        // validate input value against a server-side endpoint
        await fetch(`${validate}?name=${this.input.name}value=${this.input.value}`)
          .then(async response => {
            const text = await response.text();
            this.input.setCustomValidity(text);
            this.set('error', text);
          })
          .catch(err => console.error(err));
      }
      if (this.isNumber && !isNumber(value)) { // ensure value is a number if it is not already a number
        return this.set('value', this.#parseNumber(value)); // effect will be called again with numeric value
      }
      if (this.isNumber && !Number.isNaN(value)) { // change value only if it is a valid number
        this.input.value = value;
      }
    });
  }

  /**
   * Clear the input field
   */
  clear() {
    this.input.value = '';
    this.set('value', '');
    this.set('length', 0);
  }

  /**
   * Parse number from string
   * 
   * @private
   * @param {string} v - value to parse
   * @returns {number} - parsed number
   */
  #parseNumber(v) {
    return this.isInteger ? parseInt(v, 10) : parseFloat(v);
  }

  /**
   * Trigger value-change event to commit the value change
   * 
   * @private
   * @param {number|string|function} value - value to set
   */
  #triggerChange = value => {
    this.set('value', value);
    const newValue = (typeof value === 'function') ? this.get('value') : value;
    (this.input.value !== String(newValue)) && (value = newValue);
    this.set('error', this.input.validationMessage);
    const event = new CustomEvent('value-change', { detail: newValue, bubbles: true });
    this.dispatchEvent(event);
  };

  /**
   * Setup error message
   * 
   * @private
   */
  #setupErrorMessage() {
    const error = this.querySelector('.error');
    this.set('error', error.textContent, false);

    // update error message and aria-invalid attribute
    effect(enqueue => {
      const errorMsg = this.get('error');
      enqueue(error, () => error.setText(errorMsg));
      enqueue(this.input, () => this.input.setAttr('aria-invalid', errorMsg ? 'true' : 'false'));
      enqueue(this.input, () => this.input.setAttr('aria-errormessage', errorMsg ? error.getAttribute('id') : undefined));
    });
  }

  /**
   * Setup description
   * 
   * @private
   */
  #setupDescription() {
    const description = this.querySelector('.description');
    if (!description) return; // no description, so skip

    // set default description message
    const defaultDescription = description.textContent;
    this.set('description', defaultDescription, false);

    // update description message and aria-describedby attribute
    effect(enqueue => {
      const descMsg = this.get('description')
      enqueue(description, () => description.setText(descMsg));
      enqueue(this.input, () => this.input.setAttr('aria-describedby', descMsg ? description.getAttribute('id') : undefined));
    });

    // update remaing count message
    const remainingMessage = this.input.maxLength && description.dataset.remaining;
    remainingMessage && effect(() => {
      const length = this.get('length');
      this.set('description', length > 0
        ? remainingMessage.replace('${x}', this.input.maxLength - length)
        : defaultDescription);
    });
  }

  /**
   * Setup spin button
   * 
   * @private
   */
  #setupSpinButton() {
    const [spinbutton, decrement, increment] = ['spinbutton', 'decrement', 'increment'].map(className => this.querySelector(`.${className}`));
    if (!this.isNumber || !spinbutton) return; // no spin button, so skip

    const getNumber = attr => {
      const num = this.#parseNumber(this.input[attr]);
      if (isNumber(num) && !Number.isNaN(num)) return num;
    };
    const temp = this.#parseNumber(spinbutton.dataset.step);
    const [step, min, max] = !Number.isNaN(temp) ? [temp, getNumber('min'), getNumber('max')] : [];

    // bring value to nearest step
    const nearestStep = v => {
      const steps = Math.round((max - min) / step);
      let zerone = Math.round((v - min) * steps / (max - min)) / steps; // bring to 0-1 range    
      zerone = Math.min(Math.max(zerone, 0), 1); // keep in range in case value is off limits
      const value = zerone * (max - min) + min;
      return this.isInteger ? Math.round(value) : value;
    };

    /**
     * Step down
     * 
     * @param {number} [stepDecrement=step] - value to increment by
     */
    this.stepDown = (stepDecrement = step) => this.#triggerChange(v => nearestStep(v - stepDecrement));

    /**
     * Step up
     * 
     * @param {number} [stepIncrement=step] - value to increment by
     */
    this.stepUp = (stepIncrement = step) => this.#triggerChange(v => nearestStep(v + stepIncrement));

    // handle spin button clicks
    decrement && (decrement.onclick = e => this.stepDown(e.shiftKey ? step * 10 : step));
    increment && (increment.onclick = e => this.stepUp(e.shiftKey ? step * 10 : step));

    // handle arrow key events
    this.input.onkeydown = e => {
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.stopPropagation();
        e.preventDefault();
        (e.key === 'ArrowDown') && this.stepDown(e.shiftKey ? step * 10 : step);
        (e.key === 'ArrowUp') && this.stepUp(e.shiftKey ? step * 10 : step);
      }
    }

    // update spin button disabled state
    step && effect(enqueue => {
      const value = this.get('value');
      enqueue(decrement, () => decrement.setProp('disabled', isNumber(min) && (value - step < min)));
      enqueue(increment, () => increment.setProp('disabled', isNumber(max) && (value + step > max)));
    });
  }

  /**
   * Setup clear button
   * 
   * @private
   */
  #setupClearButton() {
    const clearbutton = this.querySelector(`.clear`);
    if (!clearbutton) return; // no clear button, so skip

    // handle clear button click
    clearbutton.onclick = () => {
      this.clear();
      this.input.focus();
    };

    // hide clear button if value is empty
    effect(enqueue => enqueue(clearbutton, () => clearbutton.setClass('hidden', this.get('empty'))));
  }

}

InputField.define('input-field');
