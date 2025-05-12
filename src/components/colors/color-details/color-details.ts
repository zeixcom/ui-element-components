import {
	type Component,
	asString,
	component,
	first,
	FxFunction,
	RESET,
	setStyle,
	setText,
} from "@zeix/ui-element";
import "culori/css";
import {
	type Oklch,
	formatCss,
	formatHex,
	formatRgb,
	formatHsl,
} from "culori/fn";
import { formatNumber } from "../../../assets/js/utils";
import { asOklch } from "../../../assets/js/parsers";

export type ColorDetailsProps = {
	name: string;
	color: Oklch;
};

export default component(
	"color-details",
	{
		name: asString(RESET),
		color: asOklch(),
	},
	(el) => {
		const fns: FxFunction<ColorDetailsProps, HTMLElement>[] = [
			setStyle("--color-swatch", () => formatCss(el.color)),
			first(".label strong", setText("name")),
		];
		for (const [name, fn] of Object.entries({
			value: () => formatHex(el.color),
			lightness: () => `${formatNumber(el.color.l * 100)}%`,
			chroma: () => formatNumber(el.color.c, 4),
			hue: () => `${formatNumber(el.color.h ?? 0)}°`,
			oklch: () =>
				`oklch(${formatNumber(el.color.l, 4)} ${formatNumber(el.color.c, 4)} ${formatNumber(el.color.h ?? 0)})`,
			rgb: () => formatRgb(el.color),
			hsl: () => formatHsl(el.color),
		})) {
			fns.push(first(`.${name}`, setText(fn)));
		}
		return fns;
	},
);

declare global {
	interface HTMLElementTagNameMap {
		"color-details": Component<ColorDetailsProps>;
	}
}
