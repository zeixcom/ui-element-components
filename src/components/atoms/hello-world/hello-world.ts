import {
	type Component,
	asString,
	component,
	first,
	RESET,
	setText,
} from "@zeix/ui-element";

export type HelloWorldProps = {
	name: string;
};

export default component(
	"hello-world",
	{
		name: asString(RESET),
	},
	() => [first("span", setText("name"))],
);

declare global {
	interface HTMLElementTagNameMap {
		"hello-world": Component<HelloWorldProps>;
	}
}
