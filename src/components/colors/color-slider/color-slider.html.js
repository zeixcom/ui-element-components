import { html } from 'lit';

import './color-slider.css';
import './color-slider.js';

export default ({
  label = 'Hue',
  color = '#143dda',
  axis = 'h',
  min = 0,
  max = 360,
  onPointerDown,
  onKeyDown,
}) => html`
<color-slider color=${color} axis=${axis}>
  <canvas width="360" height="1"></canvas>
  <div
    class="thumb"
    role="slider"
    tabindex="0"
    aria-label=${label}
    aria-valuemin=${min}
    aria-valuemax=${max}
    aria-valuenow=${min}
    @pointerDown=${onPointerDown}
    @keydown=${onKeyDown}
  >
    <span></span>
  </div>
</color-slider>`;
