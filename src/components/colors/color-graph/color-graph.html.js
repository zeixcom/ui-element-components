import { html, nothing } from 'lit';

import './color-graph.css';
import './color-graph.js';

export default ({ color, className, onPointerDown, onKeyDown }) => html`
<color-graph color=${color || nothing} class=${className || nothing}>
  <canvas width="400" height="400"></canvas>
  <ol role="presentation">
    <li class="lighten80"></li>
    <li class="lighten60"></li>
    <li class="lighten40"></li>
    <li class="lighten20"></li>
    <li class="darken20"></li>
    <li class="darken40"></li>
    <li class="darken60"></li>
    <li class="darken80"></li>
  </ol>
  <button class="knob" @pointerdown=${onPointerDown} @keydown=${onKeyDown}>
    <span></span>
  </button>
</color-graph>`;