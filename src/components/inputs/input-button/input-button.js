import { UIElement, effect, uiRef } from '../../../assets/js/ui-component';

class InputButton extends UIElement {
  static observedAttributes = ['disabled'];
  attributeMap = {disabled: 'boolean' };

  connectedCallback() {
    const button = this.querySelector('button');
    this.set('label', button.textContent, false);
    this.set('disabled', button.disabled, false);
    const classList = button.classList;
    this.set('variant', classList[0] || 'secondary', false);
    this.set('size', classList[1] || 'medium', false);

    // effect to update the disabled state
    effect(() => {
      const disabled = this.get('disabled');
      button.disabled = disabled;
      disabled ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
    });

    // effect to update the label
    effect(q => q(button, uiRef(button).text.set(this.get('label'))));

    // effect to update type and size via className
    effect(() => {
      button.className = `${this.get('variant')} ${this.get('size')}`;
    });
  }
}

InputButton.define('input-button');