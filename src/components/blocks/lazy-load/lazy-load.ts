import {
	type Component,
	type SignalProducer,
	setProperty,
	setText,
	dangerouslySetInnerHTML,
	component,
	first,
} from "@zeix/ui-element";
import { asURL } from "../../../assets/js/parsers";

export type LazyLoadProps = {
	error: string;
	src: string;
	content: string;
};

/* === Signal Producer === */

const fetchText: SignalProducer<
	HTMLElement & { error: string; src: string },
	string
> = (el) => async (abort) => {
	// Async Computed callback
	const url = el.src;
	if (!url) return "";
	try {
		const response = await fetch(url, { signal: abort });
		el.querySelector(".loading")?.remove();
		if (response.ok) return response.text();
		else el.error = response.statusText;
	} catch (error) {
		el.error = error.message;
	}
	return "";
};

/* === Component === */

export default component(
	"lazy-load",
	{
		error: "",
		src: asURL,
		content: fetchText,
	},
	(el) => [
		dangerouslySetInnerHTML("content"),
		first<LazyLoadProps, HTMLElement>(
			".error",
			setText("error"),
			setProperty("hidden", () => !el.error),
		),
	],
);

declare global {
	interface HTMLElementTagNameMap {
		"lazy-load": Component<LazyLoadProps>;
	}
}
