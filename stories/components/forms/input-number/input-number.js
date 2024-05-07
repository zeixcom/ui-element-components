import UIElement from '@efflore/ui-element';

define('input-number', class extends UIElement {
  static observedAttributes = ['value', 'description'];

  attributeMapping = {
    value: v => Number.isInteger(this.step) ? parseInt(v, 10) : parseFloat(v),
  }

  connectedCallback() {
    const input = this.querySelector('input');
    const [decrement, increment, error, description] = ['decrement', 'increment', 'error', 'description']
      .map(className => this.querySelector(`.${className}`));
    !this.has('error') && this.set('error', error.textContent);
    description.textContent && !this.has('description') && this.set('description', description.textContent);

    const getNumber = (attr, valid, fallback) => {
      if (input.hasAttribute(attr)) {
        const num = parseFloat(input.getAttribute(attr));
        return valid(num) ? num : fallback;
      }
      return fallback;
    };

    // replace textContent while preserving Lit's marker nodes in Storybook
    const replaceText = (parentNode, text) => {
      Array.from(parentNode.childNodes).filter(node => node.nodeType !== Node.COMMENT_NODE).forEach(node => node.remove());
      parentNode.append(document.createTextNode(text));
    };

    this.step = getNumber('step', n => !Number.isNaN(n) && (n > 0), 1);

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
      replaceText(error, errorMsg);
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
        replaceText(description, descMsg);
        descMsg ? input.setAttribute(descAttr, descId) : input.removeAttribute(descAttr);
      }
    });

  }

});
