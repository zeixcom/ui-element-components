import { html } from 'lit';
import UIElement from '@efflore/ui-element';

import './input-text.css';

/**
 * Primary UI component for user interaction
 */
export const InputText = ({ label, id, name, value, onInput, onChange }) => {

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

  return html`
<input-text>
  <label for="${id}-input">${label}</label>
  <input
    type="text"
    id="${id}-input"
    name="${name || id}"
    value="${value}"
    autocomplete="off"
    @input=${onInput}
    @change=${onChange}
  />
</input-text>
  `;
};
