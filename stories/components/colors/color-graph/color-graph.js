import UIElement from '@efflore/ui-element';
import 'culori/css';
import { converter, inGamut, formatCss } from 'culori/fn';

define('color-graph', class extends UIElement {
  static observedAttributes = ['color'];

  attributeMapping = { color: ['base', v => converter('oklch')(v)] };

  connectedCallback() {
    const canvasSize = 400;
    let dragging = false;
    let resetColor = this.get('base');
    this.set('hue', resetColor.h);

    const knob = this.querySelector('.knob');
    
    // handle dragging
    knob.onmousedown = () => dragging = true;
    this.onmousemove = e => {
      if (!dragging || (e.buttons !== 1) || (e.target.localName !== 'canvas')) return;
      const h = this.get('hue');
      const inCanvas = (x, y) => x && (x >= 0) && (x < canvasSize) && y && (y >= 0) && (y < canvasSize);
      const getColorFromPosition = (x, y) => ({ mode: 'oklch', l: 1 - (y / canvasSize), c: x / (2.5 * canvasSize), h });
      const inP3Gamut = inGamut('p3');
      const x = e.offsetX;
      const y = e.offsetY;
      if (inCanvas(x, y)) {
        const color = getColorFromPosition(x, y);
        inP3Gamut(color) && this.set('base', color);
      }
    };
    this.onmouseleave = () => {
      dragging = false;
      this.set('base', resetColor);
    }
    knob.onmouseup = () => {
      dragging = false;
      resetColor = this.get('base');
      const event = new CustomEvent('color-change', { detail: this.get('base'), bubbles: true });
      this.dispatchEvent(event);
    };

    // reclaculate if base color changes
    this.effect(() => {
      const base = this.get('base');
      this.set('hue', base.h);

      const getStepColor = step => {
        const calcLightness = () => {
          const exp = 2 * Math.log((1 - base.l) / base.l);
          return (Math.exp(exp * step) - 1) / (Math.exp(exp) - 1);
        };
        const calcSinChroma = () => base.c * (8 * (Math.sin(Math.PI * (4 * step + 1) / 6) ** 3) - 1) / 7;
        const stepL = base.l !== 0.5 ? calcLightness() : step;
        const stepC = base.c > 0 ? calcSinChroma() : 0;
        return { mode: 'oklch', l: stepL, c: stepC, h: base.h };
      };

      const setStepPosition = (key, color) => {
        const x = Math.round(color.c * 2.5 * canvasSize);
        const y = Math.round((1 - color.l) * canvasSize);
        const el = this.querySelector(`.${key}`);
        el.style.top = `${y}px`;
        el.style.left = `${x}px`;
        el.style.borderColor = color.l > 0.71 ? 'black' : 'white';
      };

      const fn = (number, digits = 2) => new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: digits,
        useGrouping: false,
      }).format(number);

      this.style.setProperty('--color-base', formatCss(base));
      setStepPosition('knob', base);
      this.querySelector('.knob span').innerHTML = `${fn(base.l * 100)}%<br />${fn(base.c, 4)}`;
      for (let i = 4; i > 0; i--) {
        const key = `lighten${i * 20}`;
        const color = getStepColor((5 + i) / 10);
        this.style.setProperty(`--color-${key}`, formatCss(color));
        setStepPosition(key, color);
      }
      for (let i = 1; i < 5; i++) {
        const key = `darken${i * 20}`;
        const color = getStepColor((5 - i) / 10);
        this.style.setProperty(`--color-${key}`, formatCss(color));
        setStepPosition(key, color);
      }
    });

    // redraw canvas if hue changes
    this.effect(() => {
      const h = this.get('hue');
      const inP3Gamut = inGamut('p3');
      const inRGBGamut = inGamut('rgb');

      const getColorFromPosition = (x, y) => {
        const l = 1 - (y / canvasSize);
        const c = x / (2.5 * canvasSize);
        const color = `oklch(${l} ${c} ${h})`;
        if (inRGBGamut(color)) {
          return color;
        } else if (inP3Gamut(color)) {
          return `oklch(${l} ${c} ${h} / 0.5)`;
        }
        return;
      };
      
      const ctx = this.querySelector('canvas').getContext('2d', { colorSpace: 'display-p3' });
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      for (let y = 0; y < canvasSize; y++) {
        for (let x = 0; x < canvasSize; x++) {
          const bgColor = getColorFromPosition(x, y);
          if (bgColor) {
            ctx.fillStyle = bgColor;
            ctx.fillRect(x, y, 1, 1);
          } else {
            x = canvasSize;
          }
        }
      }
    });
  }

});