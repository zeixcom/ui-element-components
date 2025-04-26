import { type Component, asInteger, component, first, on, RESET, setText } from '@zeix/ui-element'

export type ShowAppreciationProps = {
	count: number
}

export default component('show-appreciation', {
	count: asInteger(RESET)
}, el => [
	first('.count', setText('count')),
	first('button', on('click', () => el.count++))
])

declare global {
	interface HTMLElementTagNameMap {
		'show-appreciation': Component<ShowAppreciationProps>
	}
}