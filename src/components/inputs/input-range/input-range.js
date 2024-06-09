import UIElement from '../../../assets/js/ui-element';
import { define } from '../../../assets/js/utils';


define('input-range', class extends UIElement {

  connectedCallback() {
    const input = this.querySelector('input');
    const [error, description] = ['error', 'description'].map(className => this.querySelector(`.${className}`));
    input.onchange = () => this.set('value', input.value);
  }
});