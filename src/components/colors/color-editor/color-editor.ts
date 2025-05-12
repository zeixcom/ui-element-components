/* import { Capsula, effect } from '@efflore/capsula'
import { type Component, all, asString, component, first, on, pass, RESET, setProperty } from '@zeix/ui-element'
import 'culori/css'
import { converter, formatHex } from 'culori/fn'
import { formatNumber, getStepColor } from '../../../assets/js/utils'
import { type LCHColor, asOklch } from '../../../assets/js/parsers'
import { InputFieldProps } from '../../inputs/input-field/input-field'

export type ColorEditorProps = {
	color: LCHColor,
	name: string
}

export default component('color-editor', {
	color: asOklch(),
	name: asString(RESET)
}, el => {
	return [
		on('color-change', (e: Event) => {
			el.color = (e as CustomEvent).detail
		}),
		first<ColorEditorProps, Component<InputFieldProps>>('input-field.name',
			setProperty('value', 'name'),
			on('change', (e: Event) => {
				const target = e.target as HTMLInputElement
				if (target.className === 'name') el.name = target.value
			})
		),
		first<ColorEditorProps, Component<InputFieldProps>>('input-field.lightness',
			setProperty('value', () => formatNumber(el.color.l * 100))
		),
		first<ColorEditorProps, Component<InputFieldProps>>('input-field.chroma',
			setProperty('value', () => formatNumber(el.color.c, 4))
		),
		first<ColorEditorProps, Component<InputFieldProps>>('input-field.hue',
			setProperty('value', () => formatNumber(el.color.h))
		),
		all('color-details',
			pass({
				color: (element, index) => el.color,
				name: (_, index) => el.name + ' ' + (index + 1) * 10
			})
		)
	]
})

class ColorEditor extends Capsula {
	static observedAttributes = ['color']
	static states = {
		color: converter('oklch')
	}

	connectedCallback() {
		const scale = this.querySelector('color-scale')
		this.set('name', this.querySelector('input-field.name').getAttribute('value'))

		this.self
			.on('color-change', e => {
				this.set('color', e.detail)
			})
			.on('value-change', e => {
				const value = e.detail
				const comp = e.target.className[0]
				if (e.target.className === 'name') {
					this.set('name', e.detail)
				} else {
					e.stopPropagation() // only color-change event should bubble up
					const color = {...this.get('color')}
					color[comp] = comp === 'l' ? value / 100 : value
					this.set('color', color)
					const event = new CustomEvent('color-change', { detail: color, bubbles: true })
					this.dispatchEvent(event)
				}
			})

		// Update if name changes
		effect(() => {
			const name = this.get('name')

			scale.set('name', name)
			this.querySelectorAll('color-details')
				.forEach((el, i) => el.set('name', `${name} ${(i + 1) * 10}`))
		});

		// Update if base color changes
		effect(() => {
			const base = this.get('color')

			this.querySelector('dynamic-background').set('color', base)
			this.querySelector('color-graph').set('color', base)
			this.querySelector('color-slider').set('color', base)
			scale.set('color', base)
			this.querySelector('input-field.lightness').set('value', formatNumber(base.l * 100))
			this.querySelector('input-field.chroma').set('value', formatNumber(base.c, 4))
			this.querySelector('input-field.hue').set('value', formatNumber(base.h))
			this.querySelector(`.base color-details`).set('color', base)
			for (let i = 4; i > 0; i--) {
				this.querySelector(`.lighten${i * 20} color-details`).set('color',  getStepColor(base, (5 + i) / 10))
			}
			for (let i = 1; i < 5; i++) {
				this.querySelector(`.darken${i * 20} color-details`).set('color', getStepColor(base, (5 - i) / 10))
			}
		})

		// Update CSS custom properties if base color or name changes
		effect(() => {
			const base = this.get('color')
			const name = this.get('name').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()

			let code = ''
			for (let i = 1; i < 10; i++) {
				const color = getStepColor(base, 1 - (i / 10))
				code += `--color-${name}-${i * 10}: oklch(${formatNumber(color.l * 100)}% ${formatNumber(color.c, 4)} ${formatNumber(color.h)}); /* ${formatHex(color)} * /` + '\n'
			}
			this.querySelector('code-block').set('code', code)
		})
	}
}
ColorEditor.define('color-editor')

*/
