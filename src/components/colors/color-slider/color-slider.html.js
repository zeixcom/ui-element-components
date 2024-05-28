import { html, nothing } from 'lit';

import './color-slider.css';
import './color-slider.js';

export default ({
  label = 'Hue',
  color,
  axis = 'h',
  min = 0,
  max = 360,
  className,
  onPointerDown,
  onKeyDown,
}) => html`
<color-slider color=${color || nothing} axis=${axis} class=${className || nothing}>
  <canvas width="360" height="1"></canvas>
  <div
    class="thumb"
    role="slider"
    tabindex="0"
    aria-label=${label}
    aria-valuemin=${min}
    aria-valuemax=${max}
    aria-valuenow=${min}
    @pointerdown=${onPointerDown}
    @keydown=${onKeyDown}
  >
    <span></span>
  </div>
</color-slider>`;
