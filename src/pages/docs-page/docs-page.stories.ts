import DocsPage from './docs-page.html'

import * as PageHeaderStories from '../../patterns/sections/page-header/page-header.stories'

export default {
	title: 'pages/docs-page',
	render: DocsPage,
}

export const LoggedIn = {
	args: {
		...PageHeaderStories.LoggedIn.args,
	},
}

export const LoggedOut = {
	args: {
		...PageHeaderStories.LoggedOut.args,
	},
}
