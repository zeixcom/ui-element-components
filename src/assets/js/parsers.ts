import { type Oklch, converter } from "culori/fn";

export const asOklch =
	(
		fallback: Oklch = {
			mode: "oklch",
			l: 0.46,
			c: 0.24,
			h: 265,
		},
	) =>
	(_: HTMLElement, v: string | null) =>
		(v ? converter("oklch")(v) : fallback) ?? fallback;

export const asURL = (
	el: HTMLElement & { error: string },
	v: string | null,
) => {
	if (!v) {
		el.error = "No URL provided in src attribute";
		return "";
	} else if (
		(el.parentElement || (el.getRootNode() as ShadowRoot).host)?.closest(
			`${el.localName}[src="${v}"]`,
		)
	) {
		el.error = "Recursive loading detected";
		return "";
	}
	const url = new URL(v, location.href); // Ensure 'src' attribute is a valid URL
	if (url.origin === location.origin) {
		// Sanity check for cross-origin URLs
		el.error = ""; // Success: wipe previous error if there was any
		return String(url);
	}
	el.error = "Invalid URL origin";
	return "";
};
