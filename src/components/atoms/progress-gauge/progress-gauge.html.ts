import { html } from 'lit'

import './progress-gauge.ts'
import './progress-gauge.css'

export default ({
	label,
	value,
	max = 100,
	unit = '%',
	thresholds,
	disabled,
	decrementLabel,
	incrementLabel
}) => html`
<progress-gauge value=${value} thresholds=${JSON.stringify(thresholds)} ?disabled=${disabled}>
    <label>
		<span class="label">${label}</span>
		<progress class="visually-hidden" value=${value} max=${max}></progress>
		<span class="value"><span>${value}</span>${unit}</span>
		<small>${thresholds[thresholds.length - 1].label}</small>
	</label>
	<button type="button" class="decrement" aria-label=${decrementLabel}>−</button>
	<button type="button" class="increment" aria-label=${incrementLabel}>+</button>
</progress-gauge>`