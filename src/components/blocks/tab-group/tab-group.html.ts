import { html } from 'lit'

import './tab-group.ts'
import './tab-group.css'

export default ({ tabs }) => html`
<tab-group>
	<div role="tablist">
	    ${tabs.map(({ id, title, selected }) => html`
            <button
				type="button"
				role="tab"
				id="tab_${id}"
				aria-controls="tabpanel_${id}"
				aria-selected="${String(selected)}"
				tabindex="${selected ? '0' : '-1'}"
			>${title}</button>`
		)}
	</div>
    ${tabs.map(({ id, selected, content }) => html`
		<div
			role="tabpanel"
			id="tabpanel_${id}"
			aria-labelledby="tab_${id}"
			?hidden=${!selected}
		>
			${content}
		</div>`
	)}
</tab-group>`
