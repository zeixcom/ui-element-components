import { UIElement, maybe } from '@efflore/ui-element'

const VIEWPORT_XS = 'xs'
const VIEWPORT_SM = 'sm'
const VIEWPORT_MD = 'md'
const VIEWPORT_LG = 'lg'
const VIEWPORT_XL = 'xl'
const ORIENTATION_LANDSCAPE = 'landscape'
const ORIENTATION_PORTRAIT = 'portrait'

class MediaContext extends UIElement {
	static providedContexts = ['reduced-motion', 'dark-mode', 'screen-viewport', 'screen-orientation']

	connectedCallback() {
		super.connectedCallback()

		const getBreakpoints = () => {
			const parseBreakpoint = breakpoint => {
				const attr = this.getAttribute(breakpoint)?.trim()
				if (!attr) return null
				const unit = attr.match(/em$/) ? 'em' : 'px'
				const value = maybe(parseFloat(attr)).filter(Number.isFinite)[0]
				return value ? value + unit : null
			}
			const sm = parseBreakpoint(VIEWPORT_SM) || '32em'
			const md = parseBreakpoint(VIEWPORT_MD) || '48em'
			const lg = parseBreakpoint(VIEWPORT_LG) || '72em'
			const xl = parseBreakpoint(VIEWPORT_XL) || '108em'
			return { sm, md, lg, xl }
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
		screenSmall.onchange = () => this.set('screen-viewport', getViewport())
		screenMedium.onchange = () => this.set('screen-viewport', getViewport())
		screenLarge.onchange = () => this.set('screen-viewport', getViewport())
		screenXLarge.onchange = () => this.set('screen-viewport', getViewport())
        screenOrientation.onchange = e => this.set('screen-orientation', e.matches ? ORIENTATION_LANDSCAPE : ORIENTATION_PORTRAIT)
	}
}

MediaContext.define('media-context')