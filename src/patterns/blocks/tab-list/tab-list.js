import { UIElement, asBoolean, on, pass, toggleAttribute, setProperty } from '@efflore/ui-element'
			  
class TabList extends UIElement {
	static observedAttributes = ['accordion']
	static attributeMap = {
        accordion: asBoolean
    }
	static consumedContexts = ['media-viewport']

	connectedCallback() {
		super.connectedCallback()
		this.set('active', 0, false) // initial active tab

		// dynamically adjust accordion based on viewport size
		setTimeout(() => {
			if (this.get('media-viewport'))
				this.set('accordion', () => ['xs', 'sm'].includes(this.get('media-viewport')))
		}, 0)

		// reflect accordion attribute (may be used for styling)
		this.self.forEach(toggleAttribute('accordion'))

		// hide accordion tab navigation when in accordion mode
		this.first('menu').forEach(setProperty('ariaHidden', 'accordion'))

		// update active tab state and bind click handlers
		this.all('menu button')
			.map((ui, idx) => setProperty('ariaPressed', () => this.get('active') === idx)(ui))
			.forEach((ui, idx) => on('click', () => this.set('active', idx))(ui))

		// pass open and collapsible states to accordion panels
		this.all('accordion-panel').forEach((ui, idx) => pass({
			open: () => ui.host.get('active') === idx,
			collapsible: 'accordion'
		})(ui))
	}
}
TabList.define('tab-list')