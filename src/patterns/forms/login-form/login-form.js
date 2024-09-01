import { UIElement, on, pass, toggleClass } from '@efflore/ui-element'

class LoginForm extends UIElement {
	static consumedContexts = ['logged-in']

	connectedCallback() {
		super.connectedCallback()

		// this.set('logged-in', false, false)
		this.set('logged-out', () => !this.get('logged-in'))

		const usernameField = this.querySelector('.username')
		const passwordField = this.querySelector('.password')

		this.first('form')
			.map(on('submit', async e => {
				e.preventDefault()
				await new Promise(resolve => setTimeout(resolve, 1000)) // TODO do real auth work here instead
				this.set('logged-in', true)
				this.dispatchEvent(new CustomEvent('user-login', {
					bubbles: true,
					detail: usernameField.get('value')
				}))
			}))
			.map(toggleClass('hidden', 'logged-in'))
		
		this.first('.login')
			.map(pass({
				disabled: () => usernameField.get('empty') || passwordField.get('empty')
			}))
		
		this.first('.logout')
			.map(on('click', () => {
				usernameField.clear()
				passwordField.clear()
				this.set('logged-in', false)
				this.dispatchEvent(new CustomEvent('user-logout', {
					bubbles: true
				}))
			}))
			.map(toggleClass('hidden', 'logged-out'))
	}

}

LoginForm.define('login-form')