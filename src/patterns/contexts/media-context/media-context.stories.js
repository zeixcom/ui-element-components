import MediaContext from './media-context.html'

import MediaInspect from '../../../components/atoms/media-inspect/media-inspect.html'

export default {
	title: 'contexts/media-context',
	render: MediaContext,
	argTypes: {},
	args: {
		sm: '32em',
		md: '48em',
		lg: '72em',
		xl: '108em',
		content: MediaInspect({
			motion: 'User prefers reduced motion',
			theme: 'User prefers dark color scheme',
			viewport: 'User screen viewport is',
			orientation: 'User screen orientation is',
		}),
	},
}

export const WithMediaInspect = {}
