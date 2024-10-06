import { UIElement, toggleAttribute, setProperty } from '@efflore/ui-element'

class AccordionPanel extends UIElement {
	connectedCallback() {

		// Set defaults from attributes
		this.set('open', this.hasAttribute('open'), false)
		this.set('collapsible', this.hasAttribute('collapsible'), false)

		// Handle open and collapsible state changes
		this.self
		    .map(toggleAttribute('open'))
			.map(toggleAttribute('collapsible'))
			.forEach(setProperty('ariaHidden', () => !this.get('open') && !this.get('collapsible')))

		// Control inner details panel
		this.first('details')
			.map(setProperty('open'))
			.forEach(setProperty('ariaDisabled', () => !this.get('collapsible')))
	}
}
AccordionPanel.define('accordion-panel')