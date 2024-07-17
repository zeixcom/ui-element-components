import uiComponent, { effect, uiRef } from '../../../assets/js/ui-component';
import 'culori/css';
import { converter, formatCss, formatHex, formatRgb, formatHsl } from 'culori/fn';
import { formatNumber } from '../../../assets/js/utils';

uiComponent('color-details', {
  color: v => converter('oklch')(v),
  name: v => v
}, el => {
  const ref = uiRef(el);
  const name = ref.first('.label strong');
  el.set('name', name.text.get(), false);

  // update if name changes
  effect(q => q(name(), name.text.set(el.get('name'))));

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
  });
});
