import UIElement from '@efflore/ui-element';
import 'culori/css';
import { converter, formatCss, formatHex, round } from 'culori/fn';

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
      this.style.setProperty('--color-swatch', formatCss(color));
      replaceText(this.querySelector('.value'), formatHex(color));
      replaceText(this.querySelector('.lightness'), `${round(2)(color.l * 100)}%`);
      replaceText(this.querySelector('.chroma'), round(4)(color.c));
      replaceText(this.querySelector('.hue'), `${round(2)(color.h)}°`);
      replaceText(this.querySelector('.css'), `oklch(${round(4)(color.l)} ${round(4)(color.c)} ${round(2)(color.h)})`);
    });

  }

});