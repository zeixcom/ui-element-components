import { type Component, asInteger, setProperty, setAttribute, setText, setStyle, component, computed, first, on, RESET } from '@zeix/ui-element'

export type ProgressGaugeProps = {
	value: number
}

export type ProgressGaugeThreshold = {
	min: number
	label: string
	color: string
}

component('progress-gauge', {
	value: asInteger(RESET)
}, el => {
	const max = el.querySelector('progress')?.max ?? 100
	const thresholds: ProgressGaugeThreshold[] = (() => {
		const attr = el.getAttribute('thresholds')
		if (!attr) return []
		try {
			return JSON.parse(attr)
		} catch (e) {
			return []
		}
	})()
	const qualification = computed(() => {
		return thresholds.find(threshold => el.value >= threshold.min) || {
			label: '',
			color: 'var(--color-primary)'
		}
	})
	return [

		// Bind progress value to value state
        first<ProgressGaugeProps, HTMLProgressElement>('progress',
			setProperty('value')
		),
		first('.value span',
			setText('value')
		),

		// Set progress-gauge styles based on progress and qualification
		setAttribute('value'),
		setStyle('--progress-gauge-degree', () => `${240 * el.value / max}deg`),
		setStyle('--progress-gauge-color', () => qualification.get().color),
		first('small', setText(() => qualification.get().label)),

		// Spin-button click handlers
		first<ProgressGaugeProps, HTMLButtonElement>('.decrement',
			on('click', () => el.value--),
			setProperty('disabled', () => el.value < 1)
		),
		first<ProgressGaugeProps, HTMLButtonElement>('.increment',
			on('click', () => el.value++),
			setProperty('disabled', () => el.value >= max)
		)
	]
})

declare global {
	interface HTMLElementTagNameMap {
		'progress-gauge': Component<ProgressGaugeProps>
	}
}