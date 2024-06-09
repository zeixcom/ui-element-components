import { html } from 'lit';

import './scroll-area.css';
import './scroll-area.js';

export default ({ content, orientation = 'vertical' }) => html`
<scroll-area orientation=${orientation}>
  <div class="scroll-area__content">
    ${content}
  </div>
</scroll-area>`;