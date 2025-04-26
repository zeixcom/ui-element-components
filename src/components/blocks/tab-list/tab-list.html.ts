import { html, nothing } from 'lit'

import './tab-list.ts'
import './tab-list.css'

export default ({ accordion, tabs }) => html`
<tab-list ?accordion=${accordion}>
	<menu aria-hidden=${accordion}>
	    ${tabs.map(({ title, active }) => html`
            <li>
                <button type="button" ?aria-pressed=${active}>${title}</button>
			</li>`
		)}
	</menu>
    ${tabs.map(({ title, active, content }) => html`
		<details ?open=${active} ?aria-disabled=${accordion}>
			<summary class=${ accordion ? 'visually-hidden' : nothing }>
				${title}
			</summary>
			${content}
		</details>`
	)}
</tab-list>`