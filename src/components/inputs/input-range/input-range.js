import UIElement from '@efflore/ui-element';
class InputRange extends UIElement {

  connectedCallback() {
    const input = this.querySelector('input');
    const [error, description] = ['error', 'description'].map(className => this.querySelector(`.${className}`));
    input.onchange = () => this.set('value', input.value);
  }
}

InputRange.define('input-range');