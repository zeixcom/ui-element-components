import { UIElement, on } from '@efflore/ui-element'

class UserContext extends UIElement {
	static providedContexts = ['logged-in', 'display-name']

	connectedCallback() {
		super.connectedCallback()

		// set initial values from attributes if provided
		this.set('logged-in', this.hasAttribute('logged-in'))
		this.set('display-name', this.getAttribute('display-name'))

		// handle user login and logout events
		this.self
			.map(on('user-login', e => {
				this.set('logged-in', true)
				this.set('display-name', e.detail)
			}))
			.map(on('user-logout', () => {
				this.set('logged-in', false)
				// we don't delete the context, so registered listeners get updated if the user logs in again
				this.set('display-name', undefined)
			}))
	}
}

UserContext.define('user-context')