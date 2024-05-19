import UIElement from '@efflore/ui-element';
import 'culori/css';
import { converter, inGamut, formatCss } from 'culori/fn';

define('color-slider', class extends UIElement {
  static observedAttributes = ['color'];

  attributeMapping = { color: ['base', v => converter('oklch')(v)] };

  connectedCallback() {
    const trackWidth = 360;
    const thumbOffset = 4; // left margin of canvas - thumb size / 2
    // const axis = this.getAttribute('axis');
    let dragging = false;
    let base;
    let hue;

    const thumb = this.querySelector('.thumb');

    const repositionThumb = color => {
      hue = color.h;

      const fn = (number, digits = 2) => new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: digits,
        useGrouping: false,
      }).format(number);

      thumb.style.left = `${Math.round(color.h * 360 / trackWidth) + 4}px`;
      this.style.setProperty('--color-base', formatCss(color));
      this.querySelector('.thumb span').innerHTML = `${fn(color.h)}°`;
    };
    
    // handle dragging
    this.onmousedown = () => dragging = true;
    this.onmousemove = e => {
      if (!dragging || (e.buttons !== 1) || (e.target.localName !== this.localName)) return;
      const getHueFromPosition = x => Math.min(Math.max(x - thumbOffset, 0), trackWidth) * 360 / trackWidth;
      const inP3Gamut = inGamut('p3');
      const color = {...base, h: getHueFromPosition(e.offsetX)};
      inP3Gamut(color) && repositionThumb(color);
    };
    this.onmouseup = () => {
      if (!dragging) return;
      dragging = false;
      this.set('base', {...base, h: hue });
      const event = new CustomEvent('color-change', { detail: base, bubbles: true });
      this.dispatchEvent(event);
    };

    // redraw slider track if color changes
    this.effect(() => {
      const color = this.get('base');
      const l = color.l;
      const c = color.c;
      const inP3Gamut = inGamut('p3');
      const inRGBGamut = inGamut('rgb');

      const getColorFromPosition = x => {
        const h = x * 360 / trackWidth;
        const newColor = `oklch(${l} ${c} ${h})`;
        if (inRGBGamut(newColor)) {
          return newColor;
        } else if (inP3Gamut(newColor)) {
          return `oklch(${l} ${c} ${h} / 0.5)`;
        }
        return 'transparent';
      };
      
      if (!base || (color.l !== base.l) && (color.c !== base.c)) {
        const ctx = this.querySelector('canvas').getContext('2d', { colorSpace: 'display-p3' });
        ctx.clearRect(0, 0, trackWidth, 1);
        for (let x = 0; x < trackWidth; x++) {
          ctx.fillStyle = getColorFromPosition(x);
          ctx.fillRect(x, 0, 1, 1);
        }
        thumb.style.borderColor = color.l > 0.71 ? 'black' : 'white';
      }
      base = color;
      repositionThumb(color);
    });
  }

});