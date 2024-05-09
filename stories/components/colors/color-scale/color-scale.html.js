import { html } from 'lit';

import './color-scale.css';
import './color-scale.js';

export default ({ color = '#325df1', name, size = 'medium' }) => html`
<color-scale color=${color} class=${size}>
  <ol>
    <li class="lighten80"></li>
    <li class="lighten60"></li>
    <li class="lighten40"></li>
    <li class="lighten20"></li>
    <li class="base">
      <span class="label">
        <strong>${name}</strong>
        <small>${color}</small>
      </span>
    </li>
    <li class="darken20"></li>
    <li class="darken40"></li>
    <li class="darken60"></li>
    <li class="darken80"></li>
  </ol>
</color-scale>`;