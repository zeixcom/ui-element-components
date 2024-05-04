import UIElement from '@efflore/ui-element';

define('input-text', class extends UIElement {

  connectedCallback() {
    const value = this.hasAttribute('value') ? this.getAttribute('value') : '';
    this.set('value', value);

    // event listener for 'input' event on the input field
    this.oninput = e => {
      this.set('value', e.target.value);
    };
  }

  /**
   * Clear the input field
   */
  clear() {
    this.set('value', '');
    this.querySelector('input').value = '';
  }

});
