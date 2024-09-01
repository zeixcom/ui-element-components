import { html } from 'lit'

import './media-inspect.css'
import './media-inspect.js'

export default () => html`
<media-inspect>
	<dl>
	    <dt>User prefers reduced motion:</dt>
		<dd class="reduced-motion"></dd>
		<dt>User prefers dark color scheme:</dt>
		<dd class="dark-mode"></dd>
		<dt>User screen viewport is:</dt>
		<dd class="screen-viewport"></dd>
		<dt>User screen orientation is:</dt>
		<dd class="screen-orientation"></dd>
	</dl>
</media-inspect>`