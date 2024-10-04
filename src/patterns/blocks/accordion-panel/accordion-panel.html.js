import { html, nothing } from 'lit'

import './accordion-panel.js'
import './accordion-panel.css'

export default ({ open, collapsible, title, titleHidden = false, content }) => html`
<accordion-panel ?open=${open} ?collapsible=${collapsible}>
	<details ?open=${open} aria-disabled=${!collapsible}>
		<summary class=${ !collapsible && titleHidden ? 'visually-hidden' : nothing }>
			<div class="summary">${title}</div>
		</summary>
		${content}
	</details>
</accordion-panel>`