import UIElement from '@efflore/ui-element';
import 'culori/css';
import { converter, formatCss, formatHex } from 'culori/fn';

define('color-scale', class extends UIElement {
  static observedAttributes = ['color', 'name'];

  attributeMapping = { color: ['base', v => converter('oklch')(v)] };

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

    // update if base color changes
    this.effect(() => {
      const base = this.get('base');

      const getStepColor = step => {
        const calcLightness = () => {
          const l = base.l;
          const exp = 2 * Math.log((1 - l) / l);
          return (Math.exp(exp * step) - 1) / (Math.exp(exp) - 1);
        };
        const calcSinChroma = () => {
          return base.c * (8 * (Math.sin(Math.PI * (4 * step + 1) / 6) ** 3) - 1) / 7;
        };
        const stepL = base.l !== 0.5 ? calcLightness() : step;
        const stepC = base.c > 0 ? calcSinChroma() : 0;
        return formatCss({ mode: 'oklch', l: stepL, c: stepC, h: base.h });
      };

      replaceText(this.querySelector('.label small'), formatHex(base));
      this.style.setProperty('--color-base', formatCss(base));
      for (let i = 4; i > 0; i--) {
        this.style.setProperty(`--color-lighten${i * 20}`, getStepColor((5 + i) / 10));
      }
      for (let i = 1; i < 5; i++) {
        this.style.setProperty(`--color-darken${i * 20}`, getStepColor((5 - i) / 10));
      }

      // lightness of base color > 71%: black has better contrast
      if (base.l > 0.71) {
        this.style.setProperty('--color-text', 'black');
        this.style.setProperty('--color-text-soft', getStepColor(0.1));
      } else {
        this.style.setProperty('--color-text', 'white');
        this.style.setProperty('--color-text-soft', getStepColor(0.9));
      }
    });
  }
});