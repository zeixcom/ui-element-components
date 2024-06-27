import UIElement from '../../../assets/js/ui-element';
import 'culori/css';
import { converter, formatCss, formatHex, formatRgb, formatHsl } from 'culori/fn';
import { formatNumber } from '../../../assets/js/utils';
import { updateText } from '../../../assets/js/dom-update';

class ColorDetails extends UIElement {
  static observedAttributes = ['color', 'name'];
  attributeMap = new Map([['color', v => converter('oklch')(v)]]);

  connectedCallback() {
    const name = this.querySelector('.label strong');
    this.set('name', name.textContent, false);

    // update if name changes
    this.effect(() => updateText(name, this.get('name')));

    // update if color changes
    this.effect(() => {
      const color = this.get('color');
      const setTextContent = (selector, value) => this.querySelector(selector).textContent = value;

      this.style.setProperty('--color-swatch', formatCss(color));
      updateText(this.querySelector('.value'), formatHex(color));
      setTextContent('.lightness', `${formatNumber(color.l * 100)}%`);
      setTextContent('.chroma', formatNumber(color.c, 4));
      setTextContent('.hue', `${formatNumber(color.h)}°`);
      setTextContent('.oklch', `oklch(${formatNumber(color.l * 100)}% ${formatNumber(color.c, 4)} ${formatNumber(color.h)})`);
      setTextContent('.rgb', formatRgb(color));
      setTextContent('.hsl', formatHsl(color));
    });
  }

}

ColorDetails.define('color-details');