import { html } from 'lit'

import './input-checkbox.css'
import './input-checkbox.ts'

export default ({ label, checked = false, className, onChange }) => html`
<input-checkbox ?checked=${checked} class=${className}>
	<label>
		<input
			${className ?? 'visually-hidden'}
			type="checkbox"
			?checked=${checked}
			@change=${onChange}
		/>
		<span>${label}</span>
	</label>
</input-checkbox>`
