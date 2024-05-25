import UIElement from '@efflore/ui-element';
import { define } from '../../../assets/js/utils';

define('modal-dialog', class extends UIElement {

  connectedCallback() {
    const dialog = this.querySelector('dialog');
    const openButton = this.querySelector('.open');
    const closeButton = this.querySelector('.close');

    openButton.onclick = () => dialog.showModal();
    closeButton.onclick = () => dialog.close();
  }
});