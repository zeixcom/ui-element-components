import { type Component, asString, component, effect, enqueue, first, RESET, setText } from '@zeix/ui-element'
import 'culori/css'
import { formatCss, formatHex } from 'culori/fn'
import { getStepColor } from '../../../assets/js/utils'
import { type LCHColor, asLCHColor } from '../../../assets/js/parsers'

export type ColorScaleProps = {
	name: string
	color: LCHColor,
}

export default component('color-scale', {
	name: asString(RESET),
	color: asLCHColor()
}, el => [
	first('.label strong', setText('name')),
	first('.label small', setText(() => formatHex(el.color))),
	() => effect(() => {
		const props = new Map()
		const isLight = el.color.l > 0.71
		const softStep = isLight ? 0.1 : 0.9
		props.set('base', formatCss(el.color))
		props.set('text', isLight ? 'black' : 'white')
		props.set('text-soft', formatCss(getStepColor(el.color, softStep)))
		for (let i = 4; i > 0; i--) {
			props.set(`lighten${i * 20}`, formatCss(getStepColor(el.color, (5 + i) / 10)))
		}
		for (let i = 1; i < 5; i++) {
			props.set(`darken${i * 20}`, formatCss(getStepColor(el.color, (5 - i) / 10)))
		}
		enqueue(() => {
			for (const [key, value] of props) {
				el.style.setProperty(`--color-${key}`, value)
			}
		}, [el, 's'])
	})
])

declare global {
	interface HTMLElementTagNameMap {
		'color-scale': Component<ColorScaleProps>
	}
}