import UIElement from '@efflore/ui-element';

define('input-range', class extends UIElement {

  connectedCallback() {
    const input = this.querySelector('input');
    const [error, description] = ['error', 'description'].map(className => this.querySelector(`.${className}`));
    input.onchange = () => this.set('value', input.value);
  }
});