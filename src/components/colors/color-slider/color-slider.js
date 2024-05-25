import UIElement from '@efflore/ui-element';
import 'culori/css';
import { converter, inGamut, formatCss } from 'culori/fn';
import { define, formatNumber } from '../../../assets/js/utils';

define('color-slider', class extends UIElement {
  static observedAttributes = ['color'];

  attributeMapping = { color: ['base', v => converter('oklch')(v)] };

  connectedCallback() {
    let base;
    let channel;
    const axis = this.getAttribute('axis') || 'h';
    const thumb = this.querySelector('.thumb');
    const track = this.querySelector('canvas');
    const max = parseFloat(thumb.getAttribute('aria-valuemax'), 10) || 360;
    const trackWidth = track.getBoundingClientRect().width;
    const trackOffset = 20;

    // return formatted value text
    const getValueText = color => {
      switch (axis) {
        case 'h': return `${formatNumber(color.h)}°`;
        case 'l': return `${formatNumber(color.l * 100)}%`;
        case 'c': return formatNumber(color.c, 4);
      }
    };

    // reposition thumb if color changes
    const repositionThumb = color => {
      channel = color[axis];
      thumb.style.left = `${Math.round((axis === 'l' ? color[axis] * 100 : color[axis]) * trackWidth / max) + trackOffset}px`;
      this.style.setProperty('--color-base', formatCss(color));
      this.querySelector('.thumb span').innerHTML = getValueText(color);
    };

    // move thumb to a new position
    const moveThumb = x => {
      const inP3Gamut = inGamut('p3');
      const color = {...base, [axis]: Math.min(Math.max(x, 0), 1) * (axis === 'l' ? max / 100 : max)};
      inP3Gamut(color) && repositionThumb(color);
    };

    // trigger color-change event to commit the color change
    const triggerChange = color => {
      this.set('base', color);
      thumb.setAttribute('aria-valuenow', color[axis]);
      thumb.setAttribute('aria-valuetext', getValueText(color));
      const event = new CustomEvent('color-change', { detail: color, bubbles: true });
      this.dispatchEvent(event);
    };
    
    // handle dragging
    thumb.onpointerdown = e => {
      thumb.setPointerCapture(e.pointerId);
    
      thumb.onpointermove = e => {
        moveThumb((e.clientX - track.getBoundingClientRect().left) / trackWidth);
      };
    
      thumb.onpointerup = () => {
        thumb.onpointermove = null;
        thumb.onpointerup = null;
        triggerChange({...base, [axis]: channel });
      };
    };

    // handle arrow key events
    thumb.onkeydown = e => {
      if (e.key.substring(0, 5) !== 'Arrow') return;
      e.stopPropagation();
      e.preventDefault();
  
      const stepOffset = e.shiftKey ? 10 : 1;
      let x = thumb.offsetLeft - trackOffset;
  
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
      moveThumb(x / trackWidth);
      triggerChange({...base, [axis]: channel });
    }

    // redraw slider track if color changes
    this.effect(() => {
      const color = this.get('base');
      const inP3Gamut = inGamut('p3');
      const inRGBGamut = inGamut('rgb');

      const shouldUpdateTrack = () => {
        if (!base) return true;
        switch (axis) {
          case 'h': return (color.l!== base.l) || (color.c!== base.c);
          case 'l': return (color.c!== base.c) || (color.h!== base.h);
          case 'c': return (color.l!== base.l) || (color.h!== base.h);
        }
      }

      const getColorFromPosition = x => {
        const newColor = {...color, [axis]: x * (axis === 'l' ? max / 100 : max) };
        if (inRGBGamut(newColor)) return newColor;
        inP3Gamut(newColor) ? newColor.alpha = 0.5 : newColor.alpha = 0;
        return newColor;
      };
      
      if (shouldUpdateTrack()) {
        const ctx = this.querySelector('canvas').getContext('2d', { colorSpace: 'display-p3' });
        ctx.clearRect(0, 0, trackWidth, 1);
        for (let x = 0; x < trackWidth; x++) {
          ctx.fillStyle = formatCss(getColorFromPosition(x / trackWidth));
          ctx.fillRect(x, 0, 1, 1);
        }
        thumb.style.borderColor = color.l > 0.71 ? 'black' : 'white';
      }
      base = color;
      repositionThumb(color);
    });
  }

});