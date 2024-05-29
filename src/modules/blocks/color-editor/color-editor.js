import UIElement from '@efflore/ui-element';
import 'culori/css';
import { converter, formatHex } from 'culori/fn';
import { define, formatNumber, getStepColor } from '../../../assets/js/utils';

define('color-editor', class extends UIElement {
  static observedAttributes = ['color'];

  attributeMapping = { color: ['base', v => converter('oklch')(v)] };

  connectedCallback() {
    const scale = this.querySelector('color-scale');
    this.set('name', this.querySelector('input-field.name').getAttribute('value'));

    // handle color-change event from color-graph or color-slider
    this.addEventListener('color-change', e => {
      this.set('base', e.detail);
    });

    // handle value-change event from input-field
    this.addEventListener('value-change', e => {
      const value = e.detail;
      const comp = e.target.className[0];
      if (e.target.className === 'name') {
        this.set('name', e.detail);
      } else {
        e.stopPropagation(); // only color-change event should bubble up
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

      this.querySelector('color-graph').set('base', base);
      this.querySelector('color-slider').set('base', base);
      scale.set('base', base);
      this.querySelector('input-field.lightness').set('value', formatNumber(base.l * 100));
      this.querySelector('input-field.chroma').set('value', formatNumber(base.c, 4));
      this.querySelector('input-field.hue').set('value', formatNumber(base.h));
      this.querySelector(`.base color-details`).set('color', base);
      for (let i = 4; i > 0; i--) {
        this.querySelector(`.lighten${i * 20} color-details`).set('color',  getStepColor(base, (5 + i) / 10));
      }
      for (let i = 1; i < 5; i++) {
        this.querySelector(`.darken${i * 20} color-details`).set('color', getStepColor(base, (5 - i) / 10));
      }
    });

    // update css custom properties if base color or name changes
    this.effect(() => {
      const base = this.get('base');
      const name = this.get('name').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

      let code = '';
      for (let i = 1; i < 10; i++) {
        const color = getStepColor(base, 1 - (i / 10));
        code += `--color-${name}-${i * 10}: oklch(${formatNumber(color.l * 100)}% ${formatNumber(color.c, 4)} ${formatNumber(color.h)}); /* ${formatHex(color)} */` + '\n';
      }
      this.querySelector('code-block').set('code', code);
    });
  }
});