import { UIElement, setText, setAttribute } from '@efflore/ui-element'
import 'culori/css'
import { converter, formatCss, formatHex, formatRgb, formatHsl } from 'culori/fn'
import { formatNumber } from '../../../assets/js/utils'

class ColorDetails extends UIElement {
	static observedAttributes = ['color', 'name']
	static attributeMap = {
		color: v => v.map(converter('oklch'))
	}

	connectedCallback() {

		// derived states
		this.set('css', () => `--color-swatch: ${formatCss(this.get('color'))}`)
		this.set('hex', () => formatHex(this.get('color')))
	    this.set('rgb', () => formatRgb(this.get('color')))
		this.set('hsl', () => formatHsl(this.get('color')))
		this.set('lightness', () => `${formatNumber(this.get('color').l * 100)}%`)
		this.set('chroma', () => formatNumber(this.get('color').c, 4))
		this.set('hue', () => `${formatNumber(this.get('color').h)}°`)
		this.set('oklch', () => `oklch(${this.get('lightness')} ${this.get('chroma')} ${formatNumber(this.get('color').h)})`)

		// effects
		this.self.forEach(setAttribute('style', 'css')) // no idea why setStyle doesn't work here
		this.first('.label strong').forEach(setText('name'))
		this.first('.value').forEach(setText('hex'))
		for (const value of ['lightness', 'chroma', 'hue', 'oklch', 'rgb', 'hsl']) {
			this.first(`.${value}`).forEach(setText(value))
		}
	}
}

ColorDetails.define('color-details')
