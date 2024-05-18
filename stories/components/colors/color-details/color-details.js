import UIElement from '@efflore/ui-element';
import 'culori/css';
import { converter, formatCss, formatHex } from 'culori/fn';

define('color-details', class extends UIElement {
  static observedAttributes = ['color', 'name'];

  attributeMapping = { color: v => converter('oklch')(v) };

  connectedCallback() {
    const name = this.querySelector('.label strong');
    !this.has('name') && this.set('name', name.textContent);

    // replace textContent while preserving Lit's marker nodes in Storybook
    const replaceText = (parentNode, text) => {
      Array.from(parentNode.childNodes).filter(node => node.nodeType !== Node.COMMENT_NODE).forEach(node => node.remove());
      parentNode.append(document.createTextNode(text));
    };

    // update if name changes
    this.effect(() => {
      replaceText(name, this.get('name'));
    });

    // update if color changes
    this.effect(() => {
      const color = this.get('color');

      const fn = (number, digits = 2) => new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: digits,
        useGrouping: false,
      }).format(number);

      this.style.setProperty('--color-swatch', formatCss(color));
      replaceText(this.querySelector('.value'), formatHex(color));
      replaceText(this.querySelector('.lightness'), `${fn(color.l * 100)}%`);
      replaceText(this.querySelector('.chroma'), fn(color.c, 4));
      replaceText(this.querySelector('.hue'), `${fn(color.h)}°`);
      replaceText(this.querySelector('.css'), `oklch(${fn(color.l, 4)} ${fn(color.c, 4)} ${fn(color.h)})`);
    });

  }

});