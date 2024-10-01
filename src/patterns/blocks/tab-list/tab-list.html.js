import { html } from 'lit'

import AccordionPanel from '../accordion-panel/accordion-panel.html'

import './tab-list.js'
import './tab-list.css'

export default ({ accordion, tabs }) => html`
<tab-list ?accordion=${accordion}>
	<ul class="tab-nav" aria-hidden=${accordion}>
	    ${tabs.map(({ title, active }) => html`
            <li>
                <button class="tab-button" ?aria-pressed=${active}>
                    ${title}
                </button>
			</li>`)}
	</ul>
    ${tabs.map(AccordionPanel)}
</tab-list>`