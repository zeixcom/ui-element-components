import { UIElement, asInteger, on, setProperty, setAttribute, setText, setStyle } from '@efflore/ui-element'

class ProgressGauge extends UIElement {
	static observedAttributes = ['value']
	static attributeMap = {
        value: asInteger
    }

	connectedCallback() {
		const max = this.querySelector('progress').max
		const thresholds = (() => {
			try {
				return JSON.parse(this.getAttribute('thresholds'))
			} catch (e) {
				return []
            }
		})()

		// derive a qualification based on progress
		this.set('qualification', () => {
			const value = this.get('value')
            return thresholds.find(threshold => value >= threshold.min) || {
				label: '',
				color: 'var(--color-primary)'
			}
		})

		// bind progress value to value state
        this.first('progress').forEach(setProperty('value'))
		this.first('.value span').forEach(setText('value'))

		// set progress-gauge styles based on progress and qualification
		this.self
			.map(setAttribute('value'))
			.map(setStyle('--progress-gauge-degree', () => `${240 * this.get('value') / max}deg`))
		    .forEach(setStyle('--progress-gauge-color', () => this.get('qualification').color))
		this.first('small').forEach(setText(() => this.get('qualification').label))

		// spin-button click handlers
		this.first('.decrement')
			.map(setProperty('disabled', () => this.get('value') < 1))
			.forEach(on('click', () => this.set('value', v => --v)))
		this.first('.increment')
		    .map(setProperty('disabled', () => this.get('value') >= max))
			.forEach(on('click', () => this.set('value', v => ++v)))
    }
}
ProgressGauge.define('progress-gauge')