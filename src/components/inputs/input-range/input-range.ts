import {
	type Component,
	asInteger,
	component,
	first,
	on,
	RESET,
} from "@zeix/ui-element";

export type InputRangeProps = {
	value: number;
};

export default component(
	"input-range",
	{
		value: asInteger(RESET),
	},
	() => [
		first<InputRangeProps, HTMLInputElement>(
			"input",
			on("change", (e: Event) => (e.target as HTMLInputElement).value),
		),
	],
);

declare global {
	interface HTMLElementTagNameMap {
		"input-range": Component<InputRangeProps>;
	}
}
