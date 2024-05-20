import UIElement from '@efflore/ui-element';
import 'culori/css';
import { converter, inGamut, formatCss } from 'culori/fn';

define('color-graph', class extends UIElement {
  static observedAttributes = ['color'];

  attributeMapping = { color: ['base', v => converter('oklch')(v)] };

  connectedCallback() {
    const canvasSize = 400;
    let base = this.get('base');
    this.set('hue', base.h);

    const knob = this.querySelector('.knob');

    // reposition knob and scale if color changes
    const repositionScale = color => {
      base = color;

      const getStepColor = step => {
        const calcLightness = () => {
          const exp = 2 * Math.log((1 - color.l) / color.l);
          return (Math.exp(exp * step) - 1) / (Math.exp(exp) - 1);
        };
        const calcSinChroma = () => color.c * (8 * (Math.sin(Math.PI * (4 * step + 1) / 6) ** 3) - 1) / 7;
        const stepL = color.l !== 0.5 ? calcLightness() : step;
        const stepC = color.c > 0 ? calcSinChroma() : 0;
        return { mode: 'oklch', l: stepL, c: stepC, h: color.h };
      };

      const setStepPosition = (key, col) => {
        const x = Math.round(col.c * 2.5 * canvasSize);
        const y = Math.round((1 - col.l) * canvasSize);
        const el = this.querySelector(`.${key}`);
        el.style.top = `${y}px`;
        el.style.left = `${x}px`;
        el.style.borderColor = col.l > 0.71 ? 'black' : 'white';
      };

      const setStepColor = (key, step) => {
        const col = getStepColor(step);
        this.style.setProperty(`--color-${key}`, formatCss(col));
        setStepPosition(key, col);
      };

      const fn = (number, digits = 2) => new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: digits,
        useGrouping: false,
      }).format(number);

      this.style.setProperty('--color-base', formatCss(color));
      setStepPosition('knob', color);
      this.querySelector('.knob span').innerHTML = `${fn(color.l * 100)}%<br />${fn(color.c, 4)}`;
      for (let i = 4; i > 0; i--) setStepColor(`lighten${i * 20}`, (5 + i) / 10);
      for (let i = 1; i < 5; i++) setStepColor(`darken${i * 20}`, (5 - i) / 10);
    };

    // move knob to a new position
    const moveKnob = (x, y) => {
      const getColorFromPosition = (x, y) => ({
        mode: 'oklch',
        l: 1 - (Math.min(Math.max(y, 0), canvasSize) / canvasSize),
        c: Math.min(Math.max(x, 0), canvasSize) / (2.5 * canvasSize),
        h: base.h,
      });
      const inP3Gamut = inGamut('p3');
      const color = getColorFromPosition(x, y);
      inP3Gamut(color) && repositionScale(color);
    };

    // trigger color-change event to commit the color change
    const triggerChange = color => {
      this.set('base', color);
      const event = new CustomEvent('color-change', { detail: color, bubbles: true });
      this.dispatchEvent(event);
    };
    
    // handle dragging
    knob.onpointerdown = e => {
      knob.setPointerCapture(e.pointerId);
    
      knob.onpointermove = e => {
        const x = e.clientX - this.getBoundingClientRect().left;
        const y = e.clientY - this.getBoundingClientRect().top;
        moveKnob(x, y);
      };
    
      knob.onpointerup = () => {
        knob.onpointermove = null;
        knob.onpointerup = null;
        triggerChange(base);
      };
    };

    // handle arrow key events
    knob.onkeydown = e => {
      if (e.key.substring(0, 5) !== 'Arrow') return;
      e.stopPropagation();
      e.preventDefault();
  
      const stepOffset = e.shiftKey ? 10 : 1;
      let x = knob.offsetLeft;
      let y = knob.offsetTop;
  
      switch (e.key) {
        case 'ArrowDown':
          y += stepOffset;
          break;
        case 'ArrowUp':
          y -= stepOffset;
          break;
        case 'ArrowLeft':
          x -= stepOffset;
          break;
        case 'ArrowRight':
          x += stepOffset;
          break;
        default:
          return;
      }
      moveKnob(x, y);
      triggerChange(base);
    }

    // reclaculate if base color changes
    this.effect(() => {
      base = this.get('base');
      repositionScale(base);
      this.set('hue', base.h);
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