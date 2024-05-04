import UIElement from '@efflore/ui-element';

define('input-button', class extends UIElement {
  static observedAttributes = ['disabled'];

  attributeMapping = { disabled: 'boolean' };

  connectedCallback() {
    const button = this.querySelector('button');

    !this.has('disabled') && this.set('disabled', button.disabled);
    const classList = button.classList;
    !this.has('variant') && this.set('variant', classList[0] || 'secondary');
    !this.has('size') && this.set('size', classList[1] || 'medium');

    // effect to update the disabled state
    this.effect(() => {
      const disabled = this.get('disabled');
      button.disabled = disabled;
      disabled ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
    });

    // effect to update the label
    this.effect(() => {
      this.has('label') && (button.textContent = this.get('label'));
    });

    // effect to update type and size via className
    this.effect(() => {
      button.className = `${this.get('variant')} ${this.get('size')}`;
    });
  }
});