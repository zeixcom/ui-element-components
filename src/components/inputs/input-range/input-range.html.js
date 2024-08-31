import { html, nothing } from 'lit'

import './input-range.css'
import './input-range.js'

export default ({ label, id, name, value, min, max, step, className, onChange }) => html`
<input-range class=${className}>
	<label for="${id}-input">${label}</label>
	<input
		type="range"
		id="${id}-input"
		name=${name || id}
		value=${value || nothing}
		min=${min || nothing}
		max=${max || nothing}
		step=${step ? step : 'any'}
		@change=${onChange}
	/>
</input-range>`