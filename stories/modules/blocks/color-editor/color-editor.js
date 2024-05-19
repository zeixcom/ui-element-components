import UIElement from '@efflore/ui-element';
import 'culori/css';
import { converter, formatCss } from 'culori/fn';

define('color-editor', class extends UIElement {
  static observedAttributes = ['color'];

  attributeMapping = { color: ['base', v => converter('oklch')(v)] };

  connectedCallback() {
    const graph = this.querySelector('color-graph');
    const slider = this.querySelector('color-slider');
    const scale = this.querySelector('color-scale');

    this.set('name', this.querySelector('input-field.name').getAttribute('value'));

    // handle color-change event from color-graph or color-slider
    this.addEventListener('color-change', e => {
      this.set('base', e.detail);
    });

    // handle value-change event from input-field
    this.addEventListener('value-change', e => {
      e.stopPropagation();
      const value = e.detail;
      const comp = e.target.className[0];
      if (e.target.className === 'name') {
        this.set('name', e.detail);
      } else {
        const color = {...this.get('base')};
        color[comp] = comp === 'l' ? value / 100 : value;
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

      const fn = (number, digits = 2) => new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: digits,
        useGrouping: false,
      }).format(number);

      graph.set('base', base);
      slider.set('base', base);
      scale.set('base', base);
      this.querySelector('input-field.lightness').set('value', fn(base.l * 100));
      this.querySelector('input-field.chroma').set('value', fn(base.c, 4));
      this.querySelector('input-field.hue').set('value', fn(base.h));
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