import {
	type Component,
	all,
	asString,
	component,
	on,
	setAttribute,
	toggleClass,
} from "@zeix/ui-element";

export type InputRadiogroupProps = {
	value: string;
};

export default component(
	"input-radiogroup",
	{
		value: asString(),
	},
	(el) => [
		setAttribute("value"),
		all(
			"input",
			on("change", (e: Event) => {
				el.value = (e.target as HTMLInputElement)?.value;
			}),
		),
		all(
			"label",
			toggleClass(
				"selected",
				(target) => el.value === target.querySelector("input")?.value,
			),
		),
	],
);

declare global {
	interface HTMLElementTagNameMap {
		"input-radiogroup": Component<InputRadiogroupProps>;
	}
}
