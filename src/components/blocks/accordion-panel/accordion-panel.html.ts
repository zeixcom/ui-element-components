import { html, nothing } from 'lit'

import './accordion-panel.ts'
import './accordion-panel.css'

export default ({ open, title, content }) => html`
<accordion-panel ?open=${open}>
	<details ?open=${open}>
		<summary>
			<div class="summary">${title}</div>
		</summary>
		${content}
	</details>
</accordion-panel>`