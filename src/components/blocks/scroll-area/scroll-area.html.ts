import { html } from 'lit';

import './scroll-area.css';
import './scroll-area.ts';

export default ({ content, orientation = 'vertical' }) => html`
<scroll-area orientation=${orientation}>
	<div>
		${content}
	</div>
</scroll-area>`;