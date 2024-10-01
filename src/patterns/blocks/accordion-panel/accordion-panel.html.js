import { html } from 'lit'

import './accordion-panel.js'
import './accordion-panel.css'

export default ({ open, collapsible, title, content }) => html`
<accordion-panel ?open=${open} ?collapsible=${collapsible}>
	<details ?open=${open} aria-disabled=${!collapsible}>
		<summary>
			<div class="summary">${title}</div>
		</summary>
		${content}
	</details>
</accordion-panel>`