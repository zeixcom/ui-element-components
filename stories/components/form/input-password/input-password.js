import UIElement from '@efflore/ui-element';

define('input-password', class extends UIElement {

  connectedCallback() {
    this.set('value', '');

    // event listener for 'input' event on the input field
    this.oninput = e => this.set('value', e.target.value);
  }

  /**
   * Clear the input field
   */
  clear() {
    this.set('value', '');
    this.querySelector('input').value = '';
  }

});