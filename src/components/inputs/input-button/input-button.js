import { UIElement, asBoolean, setText, setProperty } from '@efflore/ui-element';

class InputButton extends UIElement {
	static observedAttributes = ['disabled'];
	static attributeMap = {
		disabled: asBoolean
	}

	connectedCallback() {
		const button = this.first('button')
		if (!button[0]) return
		
		// state defaults
		const classList = button[0].target.classList
		this.set('variant', classList[0] || 'secondary', false);
		this.set('size', classList[1] || 'medium', false);

		// derived state
		this.set('className', () => `${this.get('variant')} ${this.get('size')}`)

		// effects
		button
			.map(setText('label'))
			.map(setProperty('className'))
			.map(setProperty('disabled'))
	}
}

InputButton.define('input-button');