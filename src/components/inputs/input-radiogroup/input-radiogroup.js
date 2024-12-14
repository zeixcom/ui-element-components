import { Capsula, toggleClass, setAttribute } from '@efflore/capsula'

export class InputRadiogroup extends Capsula {
	static observedAttributes = ['value']

	connectedCallback() {
		this.self.sync(setAttribute('value'))
        this.all('input').on('change', e => this.set('value', e.target.value))
		this.all('label').sync((host, target) => toggleClass(
			'selected',
			() => host.get('value') === target.querySelector('input').value
		)(host, target))
    }
}
InputRadiogroup.define('input-radiogroup')