import UIElement from '@efflore/ui-element';
import { define, replaceText, formatNumber } from '../../../assets/js/utils';

define('input-field', class extends UIElement {
  static observedAttributes = ['value', 'description'];

  attributeMapping = {
    value: v => {
      if (this.isNumber) return this.parseNumber(v);
      return v;
    }
  };

  connectedCallback() {
    const input = this.querySelector('input');
    this.isNumber = input && input.type === 'number';
    this.isInteger = this.hasAttribute('integer');
    const [error, description, spinbutton, decrement, increment] = ['error', 'description', 'spinbutton', 'decrement', 'increment']
      .map(className => this.querySelector(`.${className}`));
    !this.has('error') && this.set('error', error.textContent);
    description.textContent && !this.has('description') && this.set('description', description.textContent);

    // setup spinbutton with step and min/max attributes
    const [step, min, max] = (() => {
      if (!this.isNumber || !spinbutton) return [];
      const getNumber = attr => {
        const num = this.parseNumber(input.getAttribute(attr));
        return !Number.isNaN(num) && num;
      };
      // ensure value is a number in case attributeChangedCallback before connectedCallback
      this.set('value', this.parseNumber(input.value));
      const temp = this.parseNumber(spinbutton.dataset.step);
      return !Number.isNaN(temp) ? [temp, getNumber('min'), getNumber('max')] : [];
    })();

    const nearestStep = v => {
      const steps = Math.round((max - min) / step);
      let zerone = Math.round((v - min) * steps / (max - min)) / steps; // bring to 0-1 range    
      zerone = Math.min(Math.max(zerone, 0), 1); // keep in range in case value is off limits
      return zerone * (max - min) + min;
    };

    // trigger value-change event to commit the value change
    const triggerChange = value => {
      this.set('value', value);
      const newValue = this.get('value'); // we need to get the evaluated value in case value is a function
      (input.value !== String(newValue)) && (value = newValue);
      this.set('error', input.validationMessage);
      const event = new CustomEvent('value-change', { detail: newValue, bubbles: true });
      this.dispatchEvent(event);
    };

    // handle input and click event changes
    input.onchange = () => triggerChange(this.isNumber ? input.valueAsNumber : input.value);
    if (spinbutton) {
      decrement && (decrement.onclick = () => triggerChange(v => nearestStep(v - step)));
      increment && (increment.onclick = () => triggerChange(v => nearestStep(v + step)));
    }

    // update value
    this.effect(() => {
      let value = this.get('value');
      if (this.isNumber && (typeof value !== 'number')) {
        value = this.parseNumber(value);
        return this.set('value', value); // effect will be called again with numeric value
      }
      if (this.isNumber && !Number.isNaN(value)) {
        input.value = value;
        step && decrement && (decrement.disabled = (min && (value - step < min)));
        step && increment && (increment.disabled = (max && (value + step > max)));
      }
      (input.type !== 'password') && this.setAttribute('value', value);
    });

    // update error message and aria-invalid attribute
    this.effect(() => {
      const errorMsg = this.get('error');
      const errorId = error.getAttribute('id');
      const invalidAttr = 'aria-invalid';
      const erorAttr = 'aria-errormessage';
      replaceText(error, errorMsg);
      if (errorMsg) {
        input.setAttribute(invalidAttr, 'true');
        input.setAttribute(erorAttr, errorId);
      } else {
        input.setAttribute(invalidAttr, 'false');
        input.removeAttribute(erorAttr);
      }
    });

    // update description message and aria-describedby attribute
    this.effect(() => {
      if (this.has('description')) {
        const descMsg = this.get('description');
        const descId = description.getAttribute('id');
        const descAttr = 'aria-describedby';
        replaceText(description, descMsg);
        descMsg ? input.setAttribute(descAttr, descId) : input.removeAttribute(descAttr);
      }
    });

  }

  /**
   * Parse number from string
   */
  parseNumber(v) {
    return this.isInteger? parseInt(v, 10) : parseFloat(v);
  }

  /**
   * Clear the input field
   */
  clear() {
    this.set('value', '');
    this.querySelector('input').value = '';
  }

});
