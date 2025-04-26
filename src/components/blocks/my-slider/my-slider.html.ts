import { html, nothing } from 'lit'

import './my-slider.ts'
import './my-slider.css'

export default ({ slides, prevLabel, nextLabel }) => html`
<my-slider>
    <button type="button" class="prev" aria-label=${prevLabel}>‹</button>
	<div class="slides">
		${slides.map((slide: string, index: number) => html`
			<div class="slide${index === 0 ? ' active' : ''}">${slide}</div>`
		)}
	</div>
    <button type="button" class="next" aria-label=${nextLabel}>›</button>
	<div class="dots" aria-live="polite">
		${slides.map((_: string, index: number) => html`
			<span class=${index === 0 ? 'active' : nothing}></span>`
		)}
	</div>
</my-slider>`