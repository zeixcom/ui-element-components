import {
	type Component,
	type Context,
	type State,
	component,
	provide,
	state,
} from "@zeix/ui-element";

export type MediaContextProps = {
	[MEDIA_MOTION]: boolean;
	[MEDIA_THEME]: "light" | "dark";
	[MEDIA_VIEWPORT]: "xs" | "sm" | "md" | "lg" | "xl";
	[MEDIA_ORIENTATION]: "portrait" | "landscape";
};

/* === Exported Contexts === */

export const MEDIA_MOTION = "media-motion" as Context<
	"media-motion",
	State<boolean>
>;
export const MEDIA_THEME = "media-theme" as Context<
	"media-theme",
	State<"light" | "dark">
>;
export const MEDIA_VIEWPORT = "media-viewport" as Context<
	"media-viewport",
	State<"xs" | "sm" | "md" | "lg" | "xl">
>;
export const MEDIA_ORIENTATION = "media-orientation" as Context<
	"media-orientation",
	State<"portrait" | "landscape">
>;

/* === Signal Producers === */

const matchMotion = () => {
	const mql = matchMedia("(prefers-reduced-motion: reduce)");
	const reducedMotion = state(mql.matches);
	mql.addEventListener("change", (e) => {
		reducedMotion.set(e.matches);
	});
	return reducedMotion;
};

const matchTheme = () => {
	const mql = matchMedia("(prefers-color-scheme: dark)");
	const colorScheme = state(mql.matches ? "dark" : "light");
	mql.addEventListener("change", (e) => {
		colorScheme.set(e.matches ? "dark" : "light");
	});
	return colorScheme;
};

const matchViewport = (el: HTMLElement) => {
	const getBreakpoint = (attr: string, fallback: string) => {
		const value = el.getAttribute(attr);
		const trimmed = value?.trim();
		if (!trimmed) return fallback;
		const unit = trimmed.match(/em$/) ? "em" : "px";
		const v = parseFloat(trimmed);
		return Number.isFinite(v) ? v + unit : fallback;
	};
	const mqlSM = matchMedia(`(min-width: ${getBreakpoint("sm", "32em")})`);
	const mqlMD = matchMedia(`(min-width: ${getBreakpoint("md", "48em")})`);
	const mqlLG = matchMedia(`(min-width: ${getBreakpoint("lg", "72em")})`);
	const mqlXL = matchMedia(`(min-width: ${getBreakpoint("xl", "104em")})`);
	const getViewport = () =>
		mqlXL.matches
			? "xl"
			: mqlLG.matches
				? "lg"
				: mqlMD.matches
					? "md"
					: mqlSM.matches
						? "sm"
						: "xs";
	const viewport = state(getViewport());
	mqlSM.addEventListener("change", () => {
		viewport.set(getViewport());
	});
	mqlMD.addEventListener("change", () => {
		viewport.set(getViewport());
	});
	mqlLG.addEventListener("change", () => {
		viewport.set(getViewport());
	});
	mqlXL.addEventListener("change", () => {
		viewport.set(getViewport());
	});
	return viewport;
};

const matchOrientation = () => {
	const mql = matchMedia("(orientation: landscape)");
	const orientation = state(mql.matches ? "landscape" : "portrait");
	mql.addEventListener("change", (e) => {
		orientation.set(e.matches ? "landscape" : "portrait");
	});
	return orientation;
};

/* === Component === */

export default component(
	"media-context",
	{
		[MEDIA_MOTION]: matchMotion,
		[MEDIA_THEME]: matchTheme,
		[MEDIA_VIEWPORT]: matchViewport,
		[MEDIA_ORIENTATION]: matchOrientation,
	},
	() => [
		provide([MEDIA_MOTION, MEDIA_THEME, MEDIA_VIEWPORT, MEDIA_ORIENTATION]),
	],
);

declare global {
	interface HTMLElementTagNameMap {
		"media-context": Component<MediaContextProps>;
	}
}
