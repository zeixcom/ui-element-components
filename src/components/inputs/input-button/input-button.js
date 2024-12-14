import { Capsula, asBoolean, setText, setProperty } from '@efflore/capsula'

class InputButton extends Capsula {
	static observedAttributes = ['disabled']
	static states = {
		disabled: asBoolean
	}

	connectedCallback() {
		this.first('button')
			.sync(setText('label'))
			.sync(setProperty('disabled'))
	}
}
InputButton.define('input-button')