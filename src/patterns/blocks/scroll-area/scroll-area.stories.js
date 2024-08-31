import ScrollArea from './scroll-area.html';

export default {
	title: 'blocks/scroll-area',
	render: ScrollArea,
	argTypes: {
		orientation: {
			control: { type: 'radio' },
			options: ['vertical', 'horizontal'],
			defaultValue: { summary: 'vertical' },
		},
	},
	args: {
		orientation: 'vertical',
		content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
	}
}

export const Vertical = {
	args: {},
}

export const Horizontal = {
	args: {
		orientation: 'horizontal',
	},
}