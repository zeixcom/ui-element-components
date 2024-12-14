import { html } from 'lit'

import './show-appreciation.css'
import './show-appreciation.js'

export default ({ label, emoji = '💐', count = 0, onClick }) => html`
<show-appreciation aria-label=${label}>
	<button type="button" @click=${onClick}>
		<span class="emoji">${emoji}</span>
		<span class="count">${count}</span>
	</button>
</show-appreciation>`
