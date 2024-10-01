import { UIElement, on, toggleClass, setProperty, setAttribute } from '@efflore/ui-element'

export class InputRadiogroup extends UIElement {
	static observedAttributes = ['value']

	connectedCallback() {
		this.self
		    .map(setAttribute('value'))
        this.all('input')
			.map(on('change', e => this.set('value', e.target.value)))
		this.all('label')
		    .map(ui => toggleClass(
				'selected',
				() => ui.host.get('value') === ui.target.querySelector('input').value
			)(ui))
    }
}
InputRadiogroup.define('input-radiogroup')