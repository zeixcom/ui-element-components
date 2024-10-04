import ProgressGauge from './progress-gauge.html.js'

export default {
	title: 'atoms/progress-gauge',
    render: ProgressGauge,
	args: {
		label: 'Progress',
        max: 100,
        value: 79,
		unit: '%',
		thresholds: [
            { min: 80, label: 'Good', color: 'var(--color-success)' },
            { min: 50, label: 'Sufficient', color: 'var(--color-warning)' },
            { min: 0, label: 'Insufficient', color: 'var(--color-error)' },
        ],
		disabled: false,
		decrementLabel: 'Decrement',
		incrementLabel: 'Increment',
    }
}

export const Percentage = {}

export const Disabled = {
	args: {
        disabled: true,
    },
}