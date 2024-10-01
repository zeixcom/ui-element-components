import { html } from 'lit'

import './lazy-load.js'

export default ({ src }) => html`<lazy-load src=${src}></lazy-load>`