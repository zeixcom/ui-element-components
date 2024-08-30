import { UIElement, setText } from '@efflore/ui-element'
import 'culori/css'
import { converter, formatCss, formatHex, formatRgb, formatHsl } from 'culori/fn'
import { formatNumber } from '../../../assets/js/utils'

class ColorDetails extends UIElement {
	static observedAttributes = ['color', 'name']
	static attributeMap = {
		color: v => v.map(converter('oklch'))
	}

  connectedCallback() {
    this.first('.label strong').map(setText('name'))

    // update if color changes
    effect(q => {
      const setTextContent = (selector, value) => {
        const element = ref.first(selector);
        q(element(), element.text.set(value));
      };

      const color = el.get('color');
      const value = ref.first('.value');

      q(el, ref.style.set('--color-swatch', formatCss(color)));
      q(value(), value.text.set(formatHex(color)));
      setTextContent('.lightness', `${formatNumber(color.l * 100)}%`);
      setTextContent('.chroma', formatNumber(color.c, 4));
      setTextContent('.hue', `${formatNumber(color.h)}°`);
      setTextContent('.oklch', `oklch(${formatNumber(color.l * 100)}% ${formatNumber(color.c, 4)} ${formatNumber(color.h)})`);
      setTextContent('.rgb', formatRgb(color));
      setTextContent('.hsl', formatHsl(color));
    })
  }
}

ColorDetails.define('color-details')
