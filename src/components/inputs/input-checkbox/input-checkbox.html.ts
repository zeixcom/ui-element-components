import { html, nothing } from 'lit'

import './input-checkbox.css'
import './input-checkbox.ts'

export default ({ label, checked = false, className, onChange }) => html`
<input-checkbox ?checked=${checked} class=${className}>
	<label>
		<input
			class=${className ? 'visually-hidden' : nothing}
			type="checkbox"
			?checked=${checked}
			@change=${onChange}
		/>
		<span class="label">${label}</span>
	</label>
</input-checkbox>`
