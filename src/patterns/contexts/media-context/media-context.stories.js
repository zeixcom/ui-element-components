import MediaContext from './media-context.html'

export default {
	title: 'contexts/media-context',
	render: MediaContext,
	argTypes: {},
	args: {
		sm: '32em',
		md: '48em',
		lg: '72em',
		xl: '108em',
		content: 'Content goes here',
	},
}

export const WithMediaInspect = {}
