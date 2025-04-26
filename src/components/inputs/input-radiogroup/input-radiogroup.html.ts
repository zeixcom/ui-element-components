import { html, nothing } from 'lit'

import './input-radiogroup.ts'
import './input-radiogroup.css'

type InputRadiogroupOption = {
	label: string,
	value: string
}

type InputRadiogroupParams = {
	legend: string,
	legendHidden: boolean,
	className: string,
	options: InputRadiogroupOption[],
	name: string,
	selected: string,
	onChange?: (e: InputEvent) => void
}

export default ({
	legend,
	legendHidden,
	className,
	options,
	name,
	selected,
	onChange
}: InputRadiogroupParams) => html`
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