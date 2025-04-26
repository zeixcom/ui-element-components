import { fn } from '@storybook/test'

import ModalDialog from './modal-dialog.html'

export default {
	title: 'overlays/modal-dialog',
	render: ModalDialog,
	argTypes: {},
	args: {
		title: 'Dialog Title',
		onClick: fn(),
	},
}

export const Base = {
	args: {},
}