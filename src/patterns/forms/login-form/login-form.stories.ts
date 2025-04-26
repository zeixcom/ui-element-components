import { fn } from '@storybook/test'

import LoginForm from './login-form.html'

export default {
	title: 'forms/login-form',
	render: LoginForm,
	argTypes: {},
	args: {
		onLoginSubmit: fn(),
		onLogoutClick: fn(),
	},
}

export const Base = {
	args: {},
}