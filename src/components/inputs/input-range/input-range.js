import { UIElement, on } from '@efflore/ui-element'
class InputRange extends UIElement {

	connectedCallback() {
		this.first('input')
			.map(on('change', e => this.set('value', e.target.value)))
	}
}

InputRange.define('input-range')