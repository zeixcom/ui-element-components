import InputRadiogroup from './input-radiogroup.html'

export default {
	title: 'inputs/input-radiogroup',
    render: InputRadiogroup,
    args: {
		legend: 'Gender',
		legendHidden: false,
		name: 'gender',
		selected: 'other',
        onChange: () => {},
        options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
		]
    },
}

export const Base = {}

export const WithHiddenLegend = {
	args: {
		name: 'gender2',
        legendHidden: true,
    },
}

export const AsSplitButton = {
	args: {
		name: 'gender3',
        className: 'split-button',
    },
}