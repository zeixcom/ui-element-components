import { Capsula, setText, effect, enqueue } from '@efflore/capsula'
import 'culori/css'
import { converter, formatCss, formatHex } from 'culori/fn'
import { getStepColor } from '../../../assets/js/utils'

class ColorScale extends Capsula {
	static observedAttributes = ['color', 'name']
	static states = {
		color: converter('oklch')
	}

	connectedCallback() {
		
		// Derived states
		this.set('hex', () => formatHex(this.get('color')))
		this.set('colorProps', () => {
			const base = this.get('color')
			const isLight = base.l > 0.71
			const softStep = isLight ? 0.1 : 0.9
			const props = new Map()
			props.set('base', formatCss(base))
			props.set('text', isLight ? 'black' : 'white')
			props.set('text-soft', formatCss(getStepColor(base, softStep)))
			for (let i = 4; i > 0; i--) {
				props.set(`lighten${i * 20}`, formatCss(getStepColor(base, (5 + i) / 10)))
			}
			for (let i = 1; i < 5; i++) {
				props.set(`darken${i * 20}`, formatCss(getStepColor(base, (5 - i) / 10)))
			}
			return props
		})

		// Effects
		this.first('.label strong').sync(setText('name'))
		this.first('.label small').sync(setText('hex'))
		effect(() => {
			for (const [key, value] of this.get('colorProps')) {
				enqueue(() => {
					this.style.setProperty(`--color-${key}`, value)
				}, [this, `s-${key}`])
			}
		})
	}
}

ColorScale.define('color-scale')
