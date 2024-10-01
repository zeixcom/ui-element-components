import { UIElement, asBoolean, setText, setProperty } from '@efflore/ui-element'

class InputButton extends UIElement {
	static observedAttributes = ['disabled']
	static attributeMap = {
		disabled: asBoolean
	}

	connectedCallback() {
		this.first('button')
			.map(setText('label'))
			.map(setProperty('disabled'))
	}
}
InputButton.define('input-button')