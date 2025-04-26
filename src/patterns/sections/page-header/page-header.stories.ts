import { fn } from '@storybook/test'

import PageHeader from './page-header.html'

export default {
	title: 'sections/page-header',
	render: PageHeader,
	args: {
		onLogin: fn(),
		onLogout: fn(),
		onCreateAccount: fn(),
	},
}

export const LoggedIn = {
	args: {
		user: {
			name: 'Jane Doe',
		},
	},
}

export const LoggedOut = {}
