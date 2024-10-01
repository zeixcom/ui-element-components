import { UIElement, asBoolean, on, pass, toggleAttribute, setProperty } from '@efflore/ui-element'
			  
class TabList extends UIElement {
	static observedAttributes = ['accordion']
	static attributeMap = {
        accordion: asBoolean
    }
	static consumedContexts = ['media-viewport']

	connectedCallback() {
		super.connectedCallback()
		this.set('active', 0, false)
		setTimeout(() => {
			if (this.get('media-viewport'))
				this.set('accordion', () => ['xs', 'sm'].includes(this.get('media-viewport')))
		}, 0)
		this.self
		    .map(toggleAttribute('accordion'))
		this.first('.tab-nav')
			.map(setProperty('ariaHidden', 'accordion'))
		this.all('.tab-button')
			.map((ui, idx) => setProperty('ariaPressed', () => this.get('active') === idx)(ui))
			.map((ui, idx) => on('click', () => this.set('active', idx))(ui))
		this.all('accordion-panel')
			.map((ui, idx) => pass({
				open: () => ui.host.get('active') === idx,
				collapsible: 'accordion'
			})(ui))
	}
}
TabList.define('tab-list')