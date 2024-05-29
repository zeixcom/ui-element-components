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
    let resizing;
    this.set('visible', false);
    this.set('redraw', true);
    const redrawTimeout = 250; // milliseconds
    let trackWidth;
    const trackOffset = 20; // pixels

    // return formatted value text
    const getValueText = color => {
      switch (axis) {
        case 'h': return `${formatNumber(color.h)}°`;
        case 'l': return `${formatNumber(color.l * 100)}%`;
        case 'c': return formatNumber(color.c, 4);
      }
    };

    // redraw the track
    const redrawTrack = color => {
      const inP3Gamut = inGamut('p3');
      const inRGBGamut = inGamut('rgb');

      const getColorFromPosition = x => {
        const newColor = {...color, [axis]: x * (axis === 'l' ? max / 100 : max) };
        if (inRGBGamut(newColor)) return newColor;
        inP3Gamut(newColor) ? newColor.alpha = 0.5 : newColor.alpha = 0;
        return newColor;
      };

      this.setAttribute('visible', '');
      this.set('redraw', false);
      const ctx = track.getContext('2d', { colorSpace: 'display-p3' });
      ctx.clearRect(0, 0, 360, 1);
      if (!trackWidth) {
        const sliderWidth = this.getBoundingClientRect().width;
        trackWidth = sliderWidth - trackOffset * 2;
        this.style.setProperty('--slider-width', sliderWidth);
        this.style.setProperty('--track-width', trackWidth);
      }
      track.setAttribute('width', trackWidth);
      for (let x = 0; x < trackWidth; x++) {
        ctx.fillStyle = formatCss(getColorFromPosition(x / trackWidth));
        ctx.fillRect(x, 0, 1, 1);
      }
      thumb.style.borderColor = color.l > 0.71 ? 'black' : 'white';
    };

    // reposition thumb if color changes
    const repositionThumb = color => {
      channel = color[axis];
      thumb.style.left = `${Math.round((axis === 'l' ? color[axis] * 100 : color[axis]) * trackWidth / max) + trackOffset}px`;
      this.style.setProperty('--color-base', formatCss(color));
      this.querySelector('.thumb span').innerHTML = getValueText(color);
    };

    // adjust to visibility changes
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.set('visible', entry.intersectionRatio > 0);
    }).observe(this);

    // adjust to box size changes
    this.resizeObserver = new ResizeObserver(([entry]) => {
      if (entry.contentBoxSize) {
        const sliderWidth = entry.contentBoxSize[0].inlineSize;
        trackWidth = sliderWidth - trackOffset * 2;
        this.style.setProperty('--slider-width', sliderWidth);
        this.style.setProperty('--track-width', trackWidth);
        // redraw is expensive, so we wait longer than for the next animation frame
        resizing && clearTimeout(resizing);
        resizing = setTimeout(() => {
          resizing = null;
          this.set('redraw', true);
        }, redrawTimeout);
        repositionThumb(base);
      }
    });

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
      const rect = track.getBoundingClientRect();
      thumb.setPointerCapture(e.pointerId);
      thumb.onpointermove = e => moveThumb((e.clientX - rect.left) / trackWidth);
    
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
      const shouldUpdateTrack = () => {
        if (!base) return true;
        switch (axis) {
          case 'h': return (color.l!== base.l) || (color.c!== base.c);
          case 'l': return (color.c!== base.c) || (color.h!== base.h);
          case 'c': return (color.l!== base.l) || (color.h!== base.h);
        }
      }
      
      const color = this.get('base');
      const updateTrack = shouldUpdateTrack();
      base = color;
      repositionThumb(color);
      updateTrack && this.set('redraw', true);
    });

    // redraw track after color change or resize
    this.effect(() => {
      this.get('visible') && !resizing && this.get('redraw') && redrawTrack(base);
    });

    // bind resize observer only when visible
    this.effect(() => {
      this.get('visible') ? this.resizeObserver.observe(this) : this.resizeObserver.unobserve(this);
    });
  }

  disconnectedCallback() {
    this.intersectionObserver && this.intersectionObserver.disconnect();
    this.resizeObserver && this.resizeObserver.disconnect();
  }

});