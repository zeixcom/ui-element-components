import { html } from 'lit'

import AccordionPanel from '../accordion-panel/accordion-panel.html'

import './tab-list.js'
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
    ${tabs.map(AccordionPanel)}
</tab-list>`