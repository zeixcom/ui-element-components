import { html } from 'lit'

import './my-slider.js'
import './my-slider.css'

export default ({ slides , prevLabel, nextLabel }) => html`
<my-slider>
    <button type="button" class="prev" aria-label=${prevLabel}>‹</button>
	<div class="slides">
		${slides.map(slide => html`<div class="slide">${slide}</div>`)}
	</div>
    <button type="button" class="next" aria-label=${nextLabel}>›</button>
	<div class="dots" aria-live="polite">
	    ${Array(slides.length).fill().map(() => html`<span></span>`)}
	</div>
</my-slider>`