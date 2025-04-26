import MediaInspect from './media-inspect.html'

export default {
	title: 'atoms/media-inspect',
	render: MediaInspect,
	argTypes: {},
	args: {
		motion: 'User prefers reduced motion',
        theme: 'User prefers color scheme',
        viewport: 'User screen viewport is',
        orientation: 'User screen orientation is',
	},
}

export const Base = {}