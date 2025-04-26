import { html, nothing } from 'lit';

import ScrollArea from '../../../components/blocks/scroll-area/scroll-area.html.js';

import './modal-dialog.css';
import './modal-dialog.ts';

type ModalDialogParams = {
  openLabel?: any,
  closeLabel?: string,
  title?: string,
  content: unknown,
  footer?: unknown,
  className?: string
}

export default ({
  openLabel = 'Open dialog',
  closeLabel = 'Close dialog',
  title = 'Modal Dialog',
  content,
  footer,
  className
}: ModalDialogParams) => html`
<modal-dialog class=${className || nothing}>
  <button type="button" class="open" aria-haspopup="dialog">${openLabel}</button>
  <dialog>
    <header>
      <h2>${title}</h2>
      <button type="button" class="close" aria-label=${closeLabel}>×</button>
    </header>
    ${ScrollArea({
      orientation: 'vertical',
      content: html`
        <form method="dialog">
          <div class="content">${content}</div>
          ${footer ? html`<footer>${footer}</footer>` : nothing}
        </form>`
    })}
  </dialog>
</modal-dialog>`;