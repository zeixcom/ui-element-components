import {
	type Component,
	type FxFunction,
	all,
	component,
	consume,
	on,
	setStyle,
} from "@zeix/ui-element";
import "culori/css";
import { type Oklch, formatCss } from "culori/fn";
import { getStepColor } from "../../../assets/js/utils";
import { asOklch } from "../../../assets/js/parsers";
import { MEDIA_THEME } from "../../../patterns/contexts/media-context/media-context";

export type DynamicBackgroundProps = {
	color: Oklch;
	theme: "light" | "dark";
};

const polyfillShadowRoot = (host: HTMLElement): void => {
	if (host.shadowRoot) return; // We already have a ShadowRoot

	const getTemplate = () => {
		const tpl = (host.getRootNode() as DocumentFragment).getElementById(
			`${host.localName}-template`,
		);
		return tpl instanceof HTMLTemplateElement ? tpl : null;
	};

	let template = host.querySelector<HTMLTemplateElement>(
		"template[shadowrootmode]",
	);
	if (template) {
		host.attachShadow({
			mode: (template.getAttribute("shadowrootmode") ??
				"open") as ShadowRootMode,
		}).appendChild(template.content);
		template.remove();
	} else {
		template = getTemplate();
		template
			? host
					.attachShadow({
						mode: "open",
					})
					.appendChild(template.content.cloneNode(true))
			: console.error(`Could not attach shadow root for <${component}>`);
	}
};

export default component(
	"dynamic-background",
	{
		color: asOklch(),
		theme: consume(MEDIA_THEME),
	},
	(el) => {
		const fns: FxFunction<DynamicBackgroundProps, HTMLElement>[] = [];
		polyfillShadowRoot(el);

		const pointerBubble = el.querySelector<HTMLElement>(
			'gradient-bubble[move="pointer"]',
		);
		if (pointerBubble) {
			let posX = 0;
			let posY = 0;
			let pointerX = 0;
			let pointerY = 0;

			const move = () => {
				posX += (pointerX - posX) / 20;
				posY += (pointerY - posY) / 20;
				pointerBubble.style.transform = `translate(${Math.round(posX)}px, ${Math.round(posY)}px)`;
				requestAnimationFrame(move);
			};
			move();

			fns.push(
				on("pointermove", (e: Event) => {
					const rect = el.getBoundingClientRect();
					pointerX = (e as PointerEvent).clientX - rect.left;
					pointerY = (e as PointerEvent).clientY - rect.top;
				}),
			);
		}

		fns.push(
			all(
				"gradient-bubble",
				setStyle("--color-bubble", (target) => {
					const i = Array.from(target.parentNode!.children).indexOf(
						target,
					);
					const color =
						i === 4
							? el.color
							: getStepColor(
									el.color,
									(el.theme === "dark" ? 1 + i : 9 - i) / 10,
								);
					return formatCss(color);
				}),
			),
		);

		return fns;
	},
);

declare global {
	interface HTMLElementTagNameMap {
		"dynamic-background": Component<DynamicBackgroundProps>;
	}
}
