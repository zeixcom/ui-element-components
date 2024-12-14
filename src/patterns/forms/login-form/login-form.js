import { Capsula, toggleClass } from '@efflore/capsula'

class LoginForm extends Capsula {
	static consumedContexts = ['logged-in']

	connectedCallback() {
		super.connectedCallback()

		const usernameField = this.querySelector('.username')
		const passwordField = this.querySelector('.password')

		this.first('form')
			.on('submit', async e => {
				e.preventDefault()
				await new Promise(resolve => setTimeout(resolve, 1000)) // TODO do real auth work here instead
				this.set('logged-in', true)
				this.dispatchEvent(new CustomEvent('user-login', {
					bubbles: true,
					detail: usernameField.get('value')
				}))
			})
			.sync(toggleClass('hidden', 'logged-in'))
		
		this.first('.login').pass({
			disabled: () => usernameField.get('empty') || passwordField.get('empty')
		})
		
		this.first('.logout')
			.on('click', () => {
				usernameField.clear()
				passwordField.clear()
				this.set('logged-in', false)
				this.dispatchEvent(new CustomEvent('user-logout', {
					bubbles: true
				}))
			})
			.sync(toggleClass('hidden', () => !this.get('logged-in')))
	}

}
LoginForm.define('login-form')