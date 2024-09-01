import { UIElement, setText } from '@efflore/ui-element'

class MediaInspect extends UIElement {
	static consumedContexts = ['reduced-motion', 'dark-mode', 'screen-viewport', 'screen-orientation']

	connectedCallback() {
		super.connectedCallback()

		for (const context of MediaInspect.consumedContexts) {
			this.first(`.${context}`).map(setText(context))
		}
	}
}

MediaInspect.define('media-inspect')