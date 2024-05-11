import UIElement from '@efflore/ui-element';
import 'culori/css';
import { converter, formatCss, round } from 'culori/fn';

define('color-editor', class extends UIElement {
  static observedAttributes = ['color'];

  attributeMapping = { color: ['base', v => converter('oklch')(v)] };

  connectedCallback() {
    const graph = this.querySelector('color-graph');
    const scale = this.querySelector('color-scale');

    this.set('name', this.querySelector('input-text.name').getAttribute('value'));

    // handle color-change event from color-graph
    this.addEventListener('color-change', e => {
      this.set('base', e.detail);
    });

    // handle value-change event from input-number and input-text
    this.addEventListener('value-change', e => {
      e.stopPropagation();
      const value = e.detail;
      const id = e.target.id;
      if (e.target.className === 'name') {
        this.set('name', e.detail);
      } else {
        const color = {...this.get('base')};
        color[id[0]] = id[0] === 'l' ? value / 100 : value;
        this.set('base', color);
        const event = new CustomEvent('color-change', { detail: color, bubbles: true });
        this.dispatchEvent(event);
      }
    });

    // update if name changes
    this.effect(() => {
      const name = this.get('name');
      scale.set('name', name);
      this.querySelectorAll('color-details').forEach((el, i) => el.set('name', `${name} ${(i + 1) * 10}`));
    });

    // update if base color changes
    this.effect(() => {
      const base = this.get('base');

      const getStepColor = step => {
        const calcLightness = () => {
          const exp = 2 * Math.log((1 - base.l) / base.l);
          return (Math.exp(exp * step) - 1) / (Math.exp(exp) - 1);
        };
        const calcSinChroma = () => {
          return base.c * (8 * (Math.sin(Math.PI * (4 * step + 1) / 6) ** 3) - 1) / 7;
        };
        const stepL = base.l !== 0.5 ? calcLightness() : step;
        const stepC = base.c > 0 ? calcSinChroma() : 0;
        return { mode: 'oklch', l: stepL, c: stepC, h: base.h };
      };

      graph.set('base', base);
      scale.set('base', base);
      this.querySelector('input-number.lightness').set('value', round(2)(base.l * 100));
      this.querySelector('input-number.chroma').set('value', round(4)(base.c));
      this.querySelector('input-number.hue').set('value', round(2)(base.h));
      this.style.setProperty('--color-base', formatCss(base));
      this.querySelector(`.base color-details`).set('color', base);
      for (let i = 4; i > 0; i--) {
        const key = `lighten${i * 20}`;
        const color = getStepColor((5 + i) / 10);
        this.style.setProperty(`--color-${key}`, formatCss(color));
        this.querySelector(`.${key} color-details`).set('color', color);
      }
      for (let i = 1; i < 5; i++) {
        const key = `darken${i * 20}`;
        const color = getStepColor((5 - i) / 10);
        this.style.setProperty(`--color-${key}`, formatCss(color));
        this.querySelector(`.${key} color-details`).set('color', color);
      }
    });
  }
});