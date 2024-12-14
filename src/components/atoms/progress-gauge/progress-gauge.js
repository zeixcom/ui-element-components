import { Capsula, asInteger, setProperty, setAttribute, setText, setStyle } from '@efflore/capsula'

class ProgressGauge extends Capsula {
	static observedAttributes = ['value']
	static states = {
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
        this.first('progress').sync(setProperty('value'))
		this.first('.value span').sync(setText('value'))

		// set progress-gauge styles based on progress and qualification
		this.self.sync(
			setAttribute('value'),
			setStyle('--progress-gauge-degree', () => `${240 * this.get('value') / max}deg`),
		    setStyle('--progress-gauge-color', () => this.get('qualification').color)
		)
		this.first('small').sync(setText(() => this.get('qualification').label))

		// spin-button click handlers
		this.first('.decrement')
			.on('click', () => this.set('value', v => --v))
			.sync(setProperty('disabled', () => this.get('value') < 1))
		this.first('.increment')
			.on('click', () => this.set('value', v => ++v))
		    .sync(setProperty('disabled', () => this.get('value') >= max))
    }
}
ProgressGauge.define('progress-gauge')