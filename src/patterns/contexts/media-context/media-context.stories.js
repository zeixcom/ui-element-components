import MediaContext from './media-context.html'

export default {
	title: 'contexts/media-context',
	render: MediaContext,
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
		content: [],
	},
}

export const ReducedMotion = {
	args: {},
}

export const DarkMode = {
	args: {},
}

export const ScreenViewport = {
	args: {},
}

export const ScreenOrientation = {
	args: {},
}