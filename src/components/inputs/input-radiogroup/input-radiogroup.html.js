import { html, nothing } from 'lit'

import './input-radiogroup.js'
import './input-radiogroup.css'

export default ({ legend, legendHidden, className, options, name, selected, onChange }) => html`
<input-radiogroup class=${className || nothing } value=${ selected || nothing }>
	<fieldset>
		<legend class=${ legendHidden ? 'visually-hidden' : nothing }>${legend}</legend>
		${options.map(({ label, value }) => html`
		    <label class=${ value === selected ? 'selected' : nothing }>
			    <input
					type="radio"
					class=${ className ? 'visually-hidden' : nothing }
					name=${name}
					value=${value}
					checked=${ value === selected ? '' : nothing }
					@change=${onChange}
				>
				<span>${label}</span>
			</label>`
		)}
	</fieldset>
</input-radiogroup>`