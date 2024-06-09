import { html, nothing } from 'lit';

import './user-context.js';

export default ({ content, loggedIn = false, displayName }) => html`
<user-context ?logged-in=${loggedIn} display-name=${displayName || nothing}>
  ${content}
</user-context>`;