import { Capsula } from '@efflore/capsula'
class InputRange extends Capsula {

	connectedCallback() {
		this.first('input').on('change', e => this.set('value', e.target.value))
	}
}

InputRange.define('input-range')