import { html } from 'lit';

import './color-slider.css';
import './color-slider.js';

export default ({ color = '#143dda', axis = 'hue' }) => {
  const label = 'Hue';
  const min = 0;
  const max = 360;
  /* const [label, min, max] = axis => {
    if (axis === 'hue') return ['Hue', 0, 360];
    else if (axis === 'lightness') return ['Lightness', 0, 100];
    else if (axis === 'chroma') return ['Chroma', 0, 0.4];
    else return [];
  }; */
  return html`
  <color-slider
    color=${color}
    axis=${axis}
    role="slider"
    aria-label=${label}
    aria-valuemin=${min}
    aria-valuemax=${max}
  >
    <canvas width="360" height="1"></canvas>
    <button class="thumb">
      <span></span>
    </button>
  </color-slider>`;
};