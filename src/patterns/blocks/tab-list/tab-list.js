import { Capsula, UI, asBoolean, toggleAttribute, setProperty } from '@efflore/capsula'
			  
class TabList extends Capsula {
	static observedAttributes = ['accordion']
	static consumedContexts = ['media-viewport']
	static states = {
		active: 0,
        accordion: asBoolean
    }

	connectedCallback() {
		super.connectedCallback()

		// Dynamically adjust accordion based on viewport size
		setTimeout(() => {
			if (this.get('media-viewport'))
				this.set(
					'accordion',
					() => ['xs', 'sm'].includes(this.get('media-viewport'))
				)
		}, 0)

		// Reflect accordion attribute (may be used for styling)
		this.self.sync(toggleAttribute('accordion'))

		// Hide accordion tab navigation when in accordion mode
		this.first('menu').sync(setProperty('ariaHidden', 'accordion'))

		// Update active tab state and bind click handlers
		this.all('menu button')
			.sync((host, target, index) => setProperty(
				'ariaPressed',
				() => host.get('active') === index)(host, target)
			)
			.on('click', (_target, index) => () => this.set('active', index))

		// Pass open and collapsible states to accordion panels
		this.all('accordion-panel').pass({
			open: (_target, index) => () => this.get('active') === index,
			collapsible: 'accordion'
		})
	}
}
TabList.define('tab-list')