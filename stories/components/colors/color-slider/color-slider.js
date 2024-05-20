import UIElement from '@efflore/ui-element';
import 'culori/css';
import { converter, inGamut, formatCss } from 'culori/fn';

define('color-slider', class extends UIElement {
  static observedAttributes = ['color'];

  attributeMapping = { color: ['base', v => converter('oklch')(v)] };

  connectedCallback() {
    const trackWidth = 360;
    const trackOffset = 20;
    // const axis = this.getAttribute('axis');
    let base;
    let hue;

    const thumb = this.querySelector('.thumb');
    const track = this.querySelector('canvas');

    // reposition thumb if color changes
    const repositionThumb = color => {
      hue = color.h;

      const fn = (number, digits = 2) => new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: digits,
        useGrouping: false,
      }).format(number);

      thumb.style.left = `${Math.round(color.h * 360 / trackWidth) + trackOffset}px`;
      this.style.setProperty('--color-base', formatCss(color));
      this.querySelector('.thumb span').innerHTML = `${fn(color.h)}°`;
    };

    // move thumb to a new position
    const moveThumb = x => {
      const inP3Gamut = inGamut('p3');
      const color = {...base, h: Math.min(Math.max(x, 0), trackWidth) * 360 / trackWidth};
      inP3Gamut(color) && repositionThumb(color);
    };

    // trigger color-change event to commit the color change
    const triggerChange = color => {
      this.set('base', color);
      const event = new CustomEvent('color-change', { detail: color, bubbles: true });
      this.dispatchEvent(event);
    };
    
    // handle dragging
    thumb.onpointerdown = e => {
      thumb.setPointerCapture(e.pointerId);
    
      thumb.onpointermove = e => {
        moveThumb(Math.round(e.clientX - track.getBoundingClientRect().left));
      };
    
      thumb.onpointerup = () => {
        thumb.onpointermove = null;
        thumb.onpointerup = null;
        triggerChange({...base, h: hue });
      };
    };

    // handle arrow key events
    thumb.onkeydown = e => {
      if (e.key.substring(0, 5) !== 'Arrow') return;
      e.stopPropagation();
      e.preventDefault();
  
      const stepOffset = e.shiftKey ? 10 : 1;
      let x = thumb.offsetLeft;
  
      switch (e.key) {
        case 'ArrowLeft':
          x -= stepOffset;
          break;
        case 'ArrowRight':
          x += stepOffset;
          break;
        default:
          return;
      }
      moveThumb(x);
      triggerChange({...base, h: hue });
    }

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