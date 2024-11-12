import { UIElement, on, toggleClass, setAttribute } from '@efflore/ui-element'

export class InputRadiogroup extends UIElement {
	static observedAttributes = ['value']

	connectedCallback() {
		this.self.forEach(setAttribute('value'))
        this.all('input').forEach(on('change', e => this.set('value', e.target.value)))
		this.all('label').forEach(ui => toggleClass(
				'selected',
				() => ui.host.get('value') === ui.target.querySelector('input').value
			)(ui))
    }
}
InputRadiogroup.define('input-radiogroup')