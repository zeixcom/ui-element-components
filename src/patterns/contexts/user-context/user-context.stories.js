import { html } from 'lit'

import UserContext from './user-context.html'

import HelloWorld from '../../../components/atoms/hello-world/hello-world.html'
import LoginForm from '../../forms/login-form/login-form.html'

export default {
	title: 'contexts/user-context',
	render: UserContext,
	argTypes: {
		loggedIn: {
			control: { type: 'boolean' },
			defaultValue: { summary: false },
		},
		displayName: {
			control: { type: 'text' },
			defaultValue: { summary: 'Jane Doe' },
		},
	},
	args: {
		content: html`${HelloWorld({ greeting: 'Hello', name: 'World' })}
			${LoginForm({
				onLoginSubmit: e => console.log('Login'),
				onLogoutClick: () => console.log('Logout'),
			})}`,
		/* content: [
			HelloWorld({ greeting: 'Hello', name: 'World' }),
			LoginForm({
				onLoginSubmit: () => console.log('Login'),
				onLogoutClick: () => console.log('Logout'),
			})
		], */
		loggedIn: false,
		displayName: undefined,
	},
}

export const LoggedOut = {
	args: {},
}

export const LoggedIn = {
	args: {
		loggedIn: true,
		displayName: 'Jane Doe',
	},
}