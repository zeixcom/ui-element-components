import { Capsula, asBoolean, setProperty, toggleAttribute } from '@efflore/capsula'

class InputCheckbox extends Capsula {
	static observedAttributes = ['checked']
	static states = {
		checked: asBoolean,
	}

	connectedCallback() {
		this.first('input')
			.on('change', e => this.set('checked', Boolean(e.target.checked)))
			.sync(setProperty('checked'))
		this.self.sync(toggleAttribute('checked'))
	}
}
InputCheckbox.define('input-checkbox')
