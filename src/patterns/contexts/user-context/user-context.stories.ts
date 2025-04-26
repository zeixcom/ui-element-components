import UserContext from './user-context.html'

export default {
	title: 'contexts/user-context',
	render: UserContext,
	argTypes: {
		loggedIn: {
			control: { type: 'boolean' },
			defaultValue: { summary: false },
		},
		displayName: {
			control: { type: 'text' },
			defaultValue: { summary: 'Jane Doe' },
		},
	},
	args: {
		content: 'Content goes here',
		loggedIn: false,
		displayName: undefined,
	},
}

export const LoggedOut = {
	args: {},
}

export const LoggedIn = {
	args: {
		loggedIn: true,
		displayName: 'Jane Doe',
	},
}