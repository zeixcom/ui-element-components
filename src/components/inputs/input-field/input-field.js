import UIElement from '../../../assets/js/ui-element';
import { replaceText } from '../../../assets/js/utils';

// check if value is a number
const isNumber = num => typeof num === 'number';

(class extends UIElement {
  static observedAttributes = ['value', 'description'];
  attributeMap = new Map([['value', v => this.isNumber ? this.#parseNumber(v) : v]]);

  connectedCallback() {
    this.input = this.querySelector('input');
    this.isNumber = this.input && this.input.type === 'number';
    this.isInteger = this.hasAttribute('integer');
    const [error, description, clearbutton] = ['error', 'description', 'clear'].map(className => this.querySelector(`.${className}`));
    const remainingCount = this.input.maxLength && description?.dataset.remaining;

    // set default states
    this.set('value', this.isNumber ? this.input.valueAsNumber : this.input.value, false);
    this.set('error', error.textContent, false);
    this.set('empty', this.input.value.length === 0);
    description && this.set('description', description.textContent, false);

    // setup spin button
    this.#setupSpinButton();

    // handle input changes
    this.input.onchange = () => this.#triggerChange(this.isNumber ? this.input.valueAsNumber : this.input.value);
    this.input.oninput = () => {
      this.empty = (this.input.value.length === 0);
      remainingCount && (this.description = description.dataset.remaining.replace('${x}', this.input.maxLength - String(this.input.value).length));
    };

    // handle clear button click
    clearbutton && (clearbutton.onclick = () => {
      this.clear();
      this.input.focus();
    });

    // update value
    this.effect(() => {
      const value = this.value;
      const validate = this.getAttribute('validate');
      if (value && validate) {
        // validate input value against a server-side endpoint
        fetch(`${validate}?name=${this.input.name}value=${this.input.value}`)
          .then(response => response.text())
          .then(text => {
            this.input.setCustomValidity(text);
            this.error = text;
          })
          .catch(error => console.error(error));
      }
      if (this.isNumber && !isNumber(value)) { // ensure value is a number if it is not already a number
        return (this.value = this.#parseNumber(value)); // effect will be called again with numeric value
      }
      if (this.isNumber && !Number.isNaN(value)) { // change value only if it is a valid number
        this.input.value = value;
      }
    });

    // update error message and aria-invalid attribute
    this.effect(() => {
      const errorMsg = this.error;
      const invalidAttr = 'aria-invalid';
      const erorAttr = 'aria-errormessage';
      replaceText(error, errorMsg);
      if (errorMsg) {
        this.input.setAttribute(invalidAttr, 'true');
        this.input.setAttribute(erorAttr, error.getAttribute('id'));
      } else {
        this.input.setAttribute(invalidAttr, 'false');
        this.input.removeAttribute(erorAttr);
      }
    });

    // update description message and aria-describedby attribute
    this.effect(() => {
      if (this.has('description')) {
        const descMsg = this.description;
        const descAttr = 'aria-describedby';
        replaceText(description, descMsg);
        descMsg
          ? this.input.setAttribute(descAttr, description.getAttribute('id'))
          : this.input.removeAttribute(descAttr);
      }
    });

    // hide clear button if value is empty
    this.effect(() => {
      clearbutton && (this.empty
        ? clearbutton.classList.add('hidden')
        : clearbutton.classList.remove('hidden'));
    });

  }

  /**
   * Clear the input field
   */
  clear() {
    this.input.value = '';
    this.value = '';
    this.empty = true;
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
    this.value = value;
    const newValue = (typeof value === 'function') ? this.value : value;
    (this.input.value !== String(newValue)) && (value = newValue);
    this.error = this.input.validationMessage;
    const event = new CustomEvent('value-change', { detail: newValue, bubbles: true });
    this.dispatchEvent(event);
  };

  /**
   * Setup spin button
   * 
   * @private
   */
  #setupSpinButton() {
    const [spinbutton, decrement, increment] = ['spinbutton', 'decrement', 'increment'].map(className => this.querySelector(`.${className}`));
    if (!this.isNumber || !spinbutton) return;

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
    this.effect(() => {
      const value = this.value;
      step && decrement && (decrement.disabled = (isNumber(min) && (value - step < min)));
      step && increment && (increment.disabled = (isNumber(max) && (value + step > max)));
    });
  }

}).define('input-field');
