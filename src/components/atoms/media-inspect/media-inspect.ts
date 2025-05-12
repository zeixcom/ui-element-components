import { type Component, component, first, setText } from "@zeix/ui-element";

export default component("media-inspect", {}, () =>
	["media-motion", "media-theme", "media-viewport", "media-orientation"].map(
		(context) => first(`.${context}`, setText(context)),
	),
);

declare global {
	interface HTMLElementTagNameMap {
		"media-inspect": Component<{}>;
	}
}
