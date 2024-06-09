import UIElement from '../../../assets/js/ui-element';
import { define, replaceText } from '../../../assets/js/utils';

define('input-button', class extends UIElement {
  static observedAttributes = ['disabled'];
  attributeMap = new Map([['disabled', 'boolean']]);

  connectedCallback() {
    const button = this.querySelector('button');
    this.set('label', button.textContent, false);
    this.set('disabled', button.disabled, false);
    const classList = button.classList;
    this.set('variant', classList[0] || 'secondary', false);
    this.set('size', classList[1] || 'medium', false);

    // effect to update the disabled state
    this.effect(() => {
      const disabled = this.get('disabled');
      button.disabled = disabled;
      disabled ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
    });

    // effect to update the label
    this.effect(() => {
      replaceText(button, this.get('label'));
    });

    // effect to update type and size via className
    this.effect(() => {
      button.className = `${this.get('variant')} ${this.get('size')}`;
    });
  }
});