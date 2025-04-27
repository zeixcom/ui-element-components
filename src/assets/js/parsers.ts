import { converter } from "culori/fn"

export type LCHColor = {
	l: number,
	c: number,
	h: number
}

export const asLCHColor = (fallback: LCHColor = { l: 0.46, c: 0.24, h: 265 }) =>
	(_: HTMLElement, v: string | null) =>
		v ? converter('oklch')(v) : fallback