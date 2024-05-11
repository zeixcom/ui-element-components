import { html } from 'lit';

import './color-details.css';
import './color-details.js';

export default ({ color = '#143dda', name }) => html`
<color-details color=${color}>
  <details>
    <summary>
      <div class="summary">
        <span class="swatch"></span>
        <span class="label">
          <strong>${name}</strong>
          <small class="value">${color}</small>
      </div>
    </summary>
    <div class="details">
      <dl>
        <dt>Lightness:</dt>
        <dd class="lightness"></dd>
        <dt>Chroma:</dt>
        <dd class="chroma"></dd>
        <dt>Hue:</dt>
        <dd class="hue"></dd>
      </dl>
      <p><code class="css"></code></p>
    </div>
  </details>
</color-details>`;