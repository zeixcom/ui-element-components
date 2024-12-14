import { Capsula, setText } from '@efflore/capsula'

class MediaInspect extends Capsula {
	static consumedContexts = ['media-motion', 'media-theme', 'media-viewport', 'media-orientation']

	connectedCallback() {
		super.connectedCallback()

		MediaInspect.consumedContexts.forEach(context => {
			this.first(`.${context}`).sync(setText(context))
		})
	}
}
MediaInspect.define('media-inspect')