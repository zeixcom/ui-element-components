import UIElement from '@efflore/ui-element';
import { define } from '../../../assets/js/utils';

define('modal-dialog', class extends UIElement {

  connectedCallback() {
    const openButton = this.querySelector('.open');
    const closeButton = this.querySelector('.close');
    const dialog = this.querySelector('dialog');
    const form = this.querySelector('form');

    openButton.onclick = () => dialog.showModal();
    closeButton.onclick = () => dialog.close();
    dialog.addEventListener('pointerdown', e => (e.target === dialog) && dialog.close());
    form.onsubmit = e => e.preventDefault();
  }
});