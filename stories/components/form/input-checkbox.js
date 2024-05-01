import { html } from 'lit';
import UIElement from '@efflore/ui-element';

import './input-checkbox.css';

/**
 * Primary UI component for user interaction
 */
export const InputCheckbox = ({ label, checked = false, onChange }) => {

  define('input-checkbox', class extends UIElement {
    static observedAttributes = ['checked'];

    attributeMapping = { checked: 'boolean' };

    connectedCallback() {
      this.set('checked', this.querySelector('input').checked);

      // event listener for 'change' event on input[type="checkbox"]
      this.onchange = e => {
        this.set('checked', e.target.checked);
      };

      // effect to update the checked attribute on the element
      this.effect(() => {
        this.get('checked') ? this.setAttribute('checked', '') : this.removeAttribute('checked');
      });
    }
  });

  return html`
<input-checkbox ?checked=${checked}>
  <label>
    <input
      class="visually-hidden"
      type="checkbox"
      ?checked=${checked}
      @change=${onChange}
    />
    <span>${label}</span>
  </label>
</input-checkbox>
  `;
};
