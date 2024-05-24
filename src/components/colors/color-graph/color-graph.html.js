import { html } from 'lit';

import './color-graph.css';
import './color-graph.js';

export default ({ color = '#143dda' }) => html`
<color-graph color=${color}>
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
  <button class="knob">
    <span></span>
  </button>
</color-graph>`;