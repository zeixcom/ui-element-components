type LCHColor = {
	l: number,
	c: number,
	h: number
}

/**
 * Format a number with a given number of maximum fraction digits
 */
export const formatNumber = (number: number, digits: number = 2): string =>
	new Intl.NumberFormat('en-US', {
		style: 'decimal',
		minimumFractionDigits: 0,
		maximumFractionDigits: digits,
		useGrouping: false,
	}).format(number)

/**
 * Calculate a step color from a base color
 */
export const getStepColor = (base: LCHColor, step: number) => {
	const calcLightness = () => {
		const l = base.l
		const exp = 2 * Math.log((1 - l) / l)
		return (Math.exp(exp * step) - 1) / (Math.exp(exp) - 1)
	}
	const calcSinChroma = () => {
		return base.c * (8 * (Math.sin(Math.PI * (4 * step + 1) / 6) ** 3) - 1) / 7
	}
	const stepL = base.l !== 0.5 ? calcLightness() : step
	const stepC = base.c > 0 ? calcSinChroma() : 0
	return { mode: 'oklch', l: stepL, c: stepC, h: base.h }
}