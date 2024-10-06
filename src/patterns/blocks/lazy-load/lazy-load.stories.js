import LazyLoad from './lazy-load.html'

export default {
	title: 'blocks/lazy-load',
	render: LazyLoad,
	args: {
		src: '/lazy-load/snippet.html',
		loading: 'Loading...',
	},
}

export const Base = {}