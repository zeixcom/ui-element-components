import ColorScale from './color-scale.html';

export default {
	title: 'colors/color-scale',
	render: ColorScale,
	argTypes: {
		color: {
			control: 'color',
			defaultValue: { summary: '#143dda' },
		},
		size: {
			control: { type: 'select' },
			options: ['tiny', 'small', 'medium', 'large'],
			defaultValue: { summary: 'medium' },
		},
	},
	args: {
		color: '#143dda',
		name: 'Blue',
		size: 'medium',
	},
}

export const Tiny = {
	args: {
		size:'tiny',
	},
}

export const Small = {
	args: {
		size:'small',
	},
}

export const Medium = {
	args: {},
}

export const Large = {
	args: {
		size: 'large',
	},
}
