import { UIElement, asBoolean, on, setProperty, toggleAttribute } from '@efflore/ui-element'

class InputCheckbox extends UIElement {
	static observedAttributes = ['checked']
	static attributeMap = {
		checked: asBoolean,
	}

	connectedCallback() {
		this.first('input')
			.map(on('change', e => this.set('checked', Boolean(e.target.checked))))
			.forEach(setProperty('checked'))
		this.self.forEach(toggleAttribute('checked'))
	}
}
InputCheckbox.define('input-checkbox')
