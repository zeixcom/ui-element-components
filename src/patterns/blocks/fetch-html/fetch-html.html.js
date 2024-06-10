import { html } from 'lit';

import './fetch-html.js';

export default ({ src }) => html`
<fetch-html src=${src}></fetch-html>`;