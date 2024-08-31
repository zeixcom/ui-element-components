import { UIElement } from '@efflore/ui-element'

const VIEWPORT_XS = 'xs'
const VIEWPORT_SM = 'sm'
const VIEWPORT_MD = 'md'
const VIEWPORT_LG = 'lg'
const VIEWPORT_XL = 'xl'
const ORIENTATION_LANDSCAPE = 'landscape'
const ORIENTATION_PORTRAIT = 'portrait'

class UserContext extends UIElement {
	static providedContexts = ['reduced-motion', 'dark-mode', 'screen-viewport', 'screen-orientation']

	connectedCallback() {
		super.connectedCallback()

		const getBreakpoints = () => {
			const defaultBreakpoints = {
				sm: '32em',  // 512px
				md: '48em',  // 768px
				lg: '72em',  // 1152px
				xl: '108em', // 1728px
			}
			const validateBreakpoints = parsedBreakpoints => {
				const validBreakpointKeys = [VIEWPORT_SM, VIEWPORT_MD, VIEWPORT_LG, VIEWPORT_XL]
				if (!validBreakpointKeys.every(breakpoint => breakpoint in parsedBreakpoints))
					throw new Error('Not all required breakpoints provided')
				for (const breakpoint in parsedBreakpoints) {
					if (!validBreakpointKeys.includes(breakpoint))
						continue
                    if (typeof parsedBreakpoints[breakpoint] !== 'string' || parsedBreakpoints[breakpoint].trim() === '')
						throw new Error(`Empty breakpoint value for key: ${breakpoint}`)
					const unit = parsedBreakpoints[breakpoint].match(/em$/)? 'em' : 'px'
					const value = parseFloat(parsedBreakpoints[breakpoint].trim())
					if (!Number.isFinite(value) || value <= 0)
						throw new Error(`Invalid breakpoint value for key: ${breakpoint}: ${value + unit} is not a valid number or unit`)
					parsedBreakpoints[breakpoint] = value + unit
				}
				return parsedBreakpoints
			}
			try {
				return validateBreakpoints(JSON.parse(this.getAttribute('breakpoints')))
			} catch (error) {
				console.error('Invalid breakpoints attribute, falling back to defaults', error)
				return defaultBreakpoints
			}
		}
		const breakpoints = getBreakpoints()

		const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
		const darkMode = matchMedia('(prefers-color-scheme: dark)')
		const screenSmall = matchMedia(`(min-width: ${breakpoints.sm})`)
		const screenMedium = matchMedia(`(min-width: ${breakpoints.md})`)
		const screenLarge = matchMedia(`(min-width: ${breakpoints.lg})`)
		const screenXLarge = matchMedia(`(min-width: ${breakpoints.xl})`)
		const screenOrientation = matchMedia('(orientation: landscape)')

		const getViewport = () => {
			if (screenXLarge.matches) return VIEWPORT_XL
            if (screenLarge.matches) return VIEWPORT_LG
            if (screenMedium.matches) return VIEWPORT_MD
            if (screenSmall.matches) return VIEWPORT_SM
            return VIEWPORT_XS
		}

		// set initial values
		this.set('reduced-motion', reducedMotion.matches)
		this.set('dark-mode', darkMode.matches)
		this.set('screen-viewport', getViewport())
		this.set('screen-orientation', screenOrientation.matches ? ORIENTATION_LANDSCAPE : ORIENTATION_PORTRAIT)

		// event listeners
		reducedMotion.onchange = e => this.set('reduced-motion', e.matches)
        darkMode.onchange = e => this.set('dark-mode', e.matches)
		screenSmall.onchange = e => this.set('screen-viewport', getViewport())
		screenMedium.onchange = e => this.set('screen-viewport', getViewport())
		screenLarge.onchange = e => this.set('screen-viewport', getViewport())
		screenXLarge.onchange = e => this.set('screen-viewport', getViewport())
        screenOrientation.onchange = e => this.set('screen-orientation', e.matches ? ORIENTATION_LANDSCAPE : ORIENTATION_PORTRAIT)
	}
}

UserContext.define('user-context')