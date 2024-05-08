import UIElement from '@efflore/ui-element';
import 'culori/css';
import { converter, formatCss } from 'culori/fn';

define('color-scale', class extends UIElement {
  static observedAttributes = ['color'];

  constructor() {
    super();
    this.hydrate();
  }

  connectedCallback() {

    this.effect(() => {
      const oklch = converter('oklch');
      this.set('base', oklch(this.get('color')));
    });

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
        return formatCss({ l: stepL, c: stepC, h: base.h, mode: 'oklch' });
      };
      this.style.setProperty('--color-base', formatCss(base));
      for (let i = 4; i > 0; i--) {
        this.style.setProperty(`--color-lighten${i * 20}`, getStepColor((5 + i) / 10));
      }
      for (let i = 1; i < 5; i++) {
        this.style.setProperty(`--color-darken${i * 20}`, getStepColor((5 - i) / 10));
      }
    });
  }

  hydrate() {

    // we only need to hydrate if there is no server-generated shadow root or the browser doesn't attach it
    if (!this.shadowRoot) {

      // polyfill shadow root if browser doesn't support declarative shadow root yet
      let template = this.querySelector('template[shadowrootmode]');
      if (template) {
        this.attachShadow({ mode: template.getAttribute('shadowrootmode') }).appendChild(template.content);
        template.remove();
      
      // clone own template to hydrate
      } else {
        template = this.getRootNode().getElementById('color-scale-template');
        if (!template) {
          console.error('Could not attach shadow root for <color-scale>');
        } else {
          this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
        }
      }
    }
  }
});