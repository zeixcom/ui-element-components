import { html } from 'lit';

import './color-slider.css';
import './color-slider.js';

export default ({ color = '#143dda', axis = 'hue' }) => html`
<color-slider color=${color} axis=${axis}>
  <canvas width="360" height="1"></canvas>
  <button class="thumb">
    <span></span>
  </button>
</color-slider>`;