import UIElement from '@efflore/ui-element';
import { define } from '../../../assets/js/utils';

define('modal-dialog', class extends UIElement {
  scrollLockClass = 'scroll-lock';
  scrollTop = 0;

  connectedCallback() {
    const openButton = this.querySelector('.open');
    const closeButton = this.querySelector('.close');
    this.dialog = this.querySelector('dialog');
    const form = this.querySelector('form');

    openButton.onclick = () => this.open();
    closeButton.onclick = () => this.close();
    this.dialog.addEventListener('pointerdown', e => (e.target === this.dialog) && this.close());
    form.onsubmit = e => e.preventDefault();
  }

  disconnectedCallback() {
    this.close();
  }

  open() {
    this.dialog.showModal();
    this.scrollTop = document.documentElement.scrollTop;
    document.body.classList.add(this.scrollLockClass);
    document.body.style.top = `-${this.scrollTop}px`;
  }

  close() {
    document.body.classList.remove(this.scrollLockClass);
    window.scrollTo({ top: this.scrollTop, left: 0, behavior: 'instant' });
    document.body.style.top = null;
    this.dialog.close();
  }
});