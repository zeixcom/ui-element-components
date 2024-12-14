import { Capsula, toggleAttribute, setProperty } from '@efflore/capsula'

class AccordionPanel extends Capsula {
	connectedCallback() {

		// Set defaults from attributes
		this.set('open', this.hasAttribute('open'), false)
		this.set('collapsible', this.hasAttribute('collapsible'), false)

		// Handle open and collapsible state changes
		this.self.sync(
			toggleAttribute('open'),
			toggleAttribute('collapsible'),
			setProperty('ariaHidden', () => !this.get('open') && !this.get('collapsible'))
		)

		// Control inner details panel
		this.first('details').sync(
			setProperty('open'),
			setProperty('ariaDisabled', () => !this.get('collapsible'))
		)
	}
}
AccordionPanel.define('accordion-panel')