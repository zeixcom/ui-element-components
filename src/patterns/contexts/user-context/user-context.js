import { Capsula, UNSET } from '@efflore/capsula'

const USER_LOGGED_IN = 'logged-in'
const USER_DISPLAY_NAME = 'display-name'

class UserContext extends Capsula {
	static providedContexts = [USER_LOGGED_IN, USER_DISPLAY_NAME]

	connectedCallback() {
		super.connectedCallback()

		// set initial values from attributes if provided
		this.set(USER_LOGGED_IN, this.hasAttribute(USER_LOGGED_IN))
		this.set(USER_DISPLAY_NAME, this.getAttribute(USER_DISPLAY_NAME))

		// handle user login and logout events
		this.self
			.on('user-login', e => {
				this.set(USER_LOGGED_IN, true)
				this.set(USER_DISPLAY_NAME, e.detail)
			})
			.on('user-logout', () => {
				this.set(USER_LOGGED_IN, false)
				// we don't delete the context, so registered listeners get updated if the user logs in again
				this.set(USER_DISPLAY_NAME, UNSET)
			})
	}
}
UserContext.define('user-context')