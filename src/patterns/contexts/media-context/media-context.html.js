import { html, nothing } from 'lit'

import './media-context.js'

export default ({ sm, md, lg, xl, content }) => html`
<media-context
	sm=${sm || nothing}
	md=${md || nothing}
	lg=${lg || nothing}
	xl=${xl || nothing}
>
	${content}
</media-context>`