import UIElement from '@efflore/ui-element';

define('input-number', class extends UIElement {
  static observedAttributes = ['value', 'description'];

  attributeMapping = { value: v => this.isInteger ? parseInt(v, 10) : parseFloat(v) };

  connectedCallback() {
    this.isInteger = this.hasAttribute('integer');
    const input = this.querySelector('input');
    const [spinbutton, decrement, increment, error, description] = ['spinbutton', 'decrement', 'increment', 'error', 'description']
      .map(className => this.querySelector(`.${className}`));
    !this.has('error') && this.set('error', error.textContent);
    description.textContent && !this.has('description') && this.set('description', description.textContent);

    // replace textContent while preserving Lit's marker nodes in Storybook
    const replaceText = (parentNode, text) => {
      Array.from(parentNode.childNodes).filter(node => node.nodeType !== Node.COMMENT_NODE).forEach(node => node.remove());
      parentNode.append(document.createTextNode(text));
    };

    // setup spinbutton with step and min/max attributes
    const [step, min, max] = (() => {
      const parseNumber = v => this.isInteger ? parseInt(v, 10) : parseFloat(v);
      const getNumber = attr => {
        const num = parseNumber(input.getAttribute(attr));
        return !Number.isNaN(num) && num;
      };
      if (!spinbutton) return [,,];
      const temp = parseNumber(spinbutton.dataset.step);
      return !Number.isNaN(temp) ? [temp, getNumber('min'), getNumber('max')] : [,,];
    })();

    // handle input and click event changes
    input.onchange = () => this.set('value', input.valueAsNumber);
    decrement && (decrement.onclick = () => this.set('value', v => v - step));
    increment && (increment.onclick = () => this.set('value', v => v + step));

    // update value
    this.effect(() => {
      const value = this.get('value');
      if (!Number.isNaN(value)) {
        input.value = value;
        step && decrement && (decrement.disabled = (min && (value - step < min)));
        step && increment && (increment.disabled = (max && (value + step > max)));
        this.setAttribute('value', value);
      }
      this.set('error', input.validationMessage);
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

});
