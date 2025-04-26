import {
	type Component, type Context, type State,
	component, on, provide, UNSET
} from '@zeix/ui-element'

type UserContextProps = {
	[USER_LOGGEDIN]: boolean,
	[USER_NAME]: string
}

export const USER_LOGGEDIN = 'user-loggedin' as Context<'user-loggedin', State<boolean>>
export const USER_NAME = 'user-name' as Context<'user-name', State<string>>

export default component('user-context', {
	[USER_LOGGEDIN]: false,
	[USER_NAME]: UNSET
}, el => {
	el[USER_LOGGEDIN] = el.hasAttribute(USER_LOGGEDIN)
	el[USER_NAME] = el.getAttribute(USER_NAME) || UNSET
	return [
		provide([USER_LOGGEDIN, USER_NAME]),
		on('user-login', (e: Event) => {
			el[USER_LOGGEDIN] = true
			el[USER_NAME] = (e as CustomEvent).detail
		}),
		on('user-logout', () => {
			el[USER_LOGGEDIN] = false
			el[USER_NAME] = UNSET
		})
	]
})

declare global {
	interface HTMLElementTagNameMap {
		'user-context': Component<UserContextProps>
	}
}