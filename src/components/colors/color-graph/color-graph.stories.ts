import { expect, fn, userEvent, within } from '@storybook/test'

import ColorGraph from './color-graph.html'

export default {
	title: 'colors/color-graph',
	render: ColorGraph,
	argTypes: {
		color: {
			control: 'color',
			defaultValue: { summary: '#143dda' },
		},
	},
	args: {
		color: '#143dda',
		onPointerDown: fn(),
		onKeyDown: fn(),
	},
}

export const Base = {
	args: {},
}
