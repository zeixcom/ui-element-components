import UIElement from '../../../assets/js/ui-element';
import 'culori/css';
import { converter, formatCss, formatHex } from 'culori/fn';
import { getStepColor } from '../../../assets/js/utils';
import { updateText } from '../../../assets/js/dom-update';
class ColorScale extends UIElement {
  static observedAttributes = ['color', 'name'];
  attributeMap = new Map([['color', ['base', v => converter('oklch')(v)]]]);

  connectedCallback() {
    const name = this.querySelector('.label strong');
    this.set('name', name.textContent, false);

    // update if name changes
    this.effect(() => updateText(name, this.get('name')));

    // update if base color changes
    this.effect(() => {
      const base = this.get('base');

      updateText(this.querySelector('.label small'), formatHex(base));
      this.style.setProperty('--color-base', formatCss(base));
      for (let i = 4; i > 0; i--) {
        this.style.setProperty(`--color-lighten${i * 20}`, formatCss(getStepColor(base, (5 + i) / 10)));
      }
      for (let i = 1; i < 5; i++) {
        this.style.setProperty(`--color-darken${i * 20}`, formatCss(getStepColor(base, (5 - i) / 10)));
      }

      // lightness of base color > 71%: black has better contrast
      if (base.l > 0.71) {
        this.style.setProperty('--color-text', 'black');
        this.style.setProperty('--color-text-soft', formatCss(getStepColor(base, 0.1)));
      } else {
        this.style.setProperty('--color-text', 'white');
        this.style.setProperty('--color-text-soft', formatCss(getStepColor(base, 0.9)));
      }
    });
  }
}

ColorScale.define('color-scale');