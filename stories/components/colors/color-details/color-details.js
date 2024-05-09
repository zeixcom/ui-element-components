import UIElement from '@efflore/ui-element';
import 'culori/css';
import { converter, round } from 'culori/fn';

define('color-details', class extends UIElement {
  static observedAttributes = ['color'];

  connectedCallback() {
    const name = this.querySelector('.label strong');
    !this.has('name') && this.set('name', name.textContent);

    // replace textContent while preserving Lit's marker nodes in Storybook
    const replaceText = (parentNode, text) => {
      Array.from(parentNode.childNodes).filter(node => node.nodeType !== Node.COMMENT_NODE).forEach(node => node.remove());
      parentNode.append(document.createTextNode(text));
    };

    this.effect(() => {
      replaceText(name, this.get('name'));
    });

    this.effect(() => {
      const oklch = converter('oklch');
      const color = this.get('color');
      const base = oklch(color);
      this.style.setProperty('--color-swatch', color);
      replaceText(this.querySelector('.value'), color);
      replaceText(this.querySelector('.lightness'), `${round(2)(base.l * 100)}%`);
      replaceText(this.querySelector('.chroma'), round(4)(base.c));
      replaceText(this.querySelector('.hue'), `${round(2)(base.h)}°`);
      replaceText(this.querySelector('.css'), `oklch(${round(4)(base.l)} ${round(4)(base.c)} ${round(2)(base.h)})`);
    });

  }

});