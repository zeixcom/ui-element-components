import ColorEditor from './color-editor.html'

export default {
	title: 'colors/color-editor',
	render: ColorEditor,
	argTypes: {},
	args: {
		color: '#143dda',
		name: 'Blue',
	},
}

export const Base = {
	args: {},
}