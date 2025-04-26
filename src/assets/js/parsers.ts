import { AttributeParser } from "@zeix/ui-element"
import { converter } from "culori/fn"

export type LCHColor = {
	l: number,
	c: number,
	h: number
}

export const asLCHColor: AttributeParser<HTMLElement, LCHColor> = (_, v) => {
	return v ? converter('oklch')(v) : { l: 0, c: 0, h: 0  }
}