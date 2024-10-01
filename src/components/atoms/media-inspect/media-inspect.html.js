import { html } from 'lit'

import './media-inspect.css'
import './media-inspect.js'

export default ({ motion, theme, viewport, orientation }) => html`
<media-inspect>
	<dl>
		${motion && html`<dt>${motion}:</dt><dd class="media-motion"></dd>`}
		${theme && html`<dt>${theme}:</dt><dd class="media-theme"></dd>`}
		${viewport && html`<dt>${viewport}:</dt><dd class="media-viewport"></dd>`}
		${orientation && html`<dt>${orientation}:</dt><dd class="media-orientation"></dd>`}
	</dl>
</media-inspect>`