import { UIElement, toggleAttribute, setProperty } from '@efflore/ui-element'

class AccordionPanel extends UIElement {
	connectedCallback() {
		this.set('open', this.hasAttribute('open'))
		this.set('collapsible', this.hasAttribute('collapsible'))
		this.self
		    .map(toggleAttribute('open'))
			.map(toggleAttribute('collapsible'))
			.map(setProperty('ariaHidden', () => !this.get('open') && !this.get('collapsible')))
		this.first('details')
			.map(setProperty('open'))
			.map(setProperty('ariaDisabled', () => !this.get('collapsible')))
	}
}
AccordionPanel.define('accordion-panel')