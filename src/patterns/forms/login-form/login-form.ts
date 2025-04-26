import { type Component, component, consume, first, on, pass, setProperty } from '@zeix/ui-element'
import { USER_LOGGEDIN } from '../../contexts/user-context/user-context'
import type { InputFieldProps } from '../../../components/inputs/input-field/input-field'

export type LoginFormProps = {
	loggedIn: boolean
}

export default component('login-form', {
	loggedIn: consume(USER_LOGGEDIN)
}, el => {
	const usernameField: Component<InputFieldProps> | null = el.querySelector('.username')
	const passwordField: Component<InputFieldProps> | null = el.querySelector('.password')
	if (!usernameField || !passwordField) throw new Error('No input fields found')
	return [
		first<LoginFormProps, HTMLFormElement>('form',
			setProperty('hidden', 'loggedIn'),
			on('submit', async (e: Event) => {
				e.preventDefault()
				await new Promise(resolve => setTimeout(resolve, 1000)) // TODO do real auth work here instead
				el.loggedIn = true
				el.dispatchEvent(new CustomEvent('user-login', {
					bubbles: true,
					detail: usernameField.value
				}))
			})
		),
		first('.login', pass({
			disabled: () => !usernameField.length || !passwordField.length || el.loggedIn,
		})),
		first('.logout',
			on('click', () => {
				usernameField.clear()
				passwordField.clear()
				el.loggedIn = false
				el.dispatchEvent(new CustomEvent('user-logout', {
					bubbles: true
				}))
			})
		)
	]
})

declare global {
	interface HTMLElementTagNameMap {
		'login-form': Component<LoginFormProps>
	}
}