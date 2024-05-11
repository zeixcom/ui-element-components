import { html } from 'lit';

import './modal-dialog.css';
import './modal-dialog.js';

export default ({ title }) => html`
<modal-dialog>
  <button type="button" class="open" aria-haspopup="dialog">Open Dialog</button>
  <dialog>
    <header>
      <h2>${title}</h2>
      <button type="button" class="close" aria-label="Close">×</button>
    </header>
    <div class="content"></div>
    <footer>
    </footer>
  </dialog>
</modal-dialog>`;