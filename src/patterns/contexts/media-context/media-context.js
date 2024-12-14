import { Capsula } from '@efflore/capsula'

const MEDIA_MOTION = 'media-motion'
const MEDIA_THEME = 'media-theme'
const MEDIA_VIEWPORT = 'media-viewport'
const MEDIA_ORIENTATION = 'media-orientation'

class MediaContext extends Capsula {
	static providedContexts = [
		MEDIA_MOTION,
		MEDIA_THEME,
		MEDIA_VIEWPORT,
		MEDIA_ORIENTATION,
	]

	connectedCallback() {
		super.connectedCallback()

		const THEME_LIGHT = 'light'
		const THEME_DARK = 'dark'
		const VIEWPORT_XS = 'xs'
		const VIEWPORT_SM = 'sm'
		const VIEWPORT_MD = 'md'
		const VIEWPORT_LG = 'lg'
		const VIEWPORT_XL = 'xl'
		const ORIENTATION_LANDSCAPE = 'landscape'
		const ORIENTATION_PORTRAIT = 'portrait'

		// IIFE to parse breakpoints from attributes
		const breakpoints = (() => {
			const parseBreakpoint = breakpoint => {
				const attr = this.getAttribute(breakpoint)?.trim()
				if (!attr) return null
				const unit = attr.match(/em$/) ? 'em' : 'px'
				const value = parseFloat(attr)
				return Number.isFinite(value) ? value + unit : null
			}
			return {
				sm: parseBreakpoint(VIEWPORT_SM) || '32em',
				md: parseBreakpoint(VIEWPORT_MD) || '48em',
				lg: parseBreakpoint(VIEWPORT_LG) || '72em',
				xl: parseBreakpoint(VIEWPORT_XL) || '108em',
			}
		})()

		const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
		const colorScheme = matchMedia('(prefers-color-scheme: dark)')
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

		// Set initial values
		this.set(MEDIA_MOTION, reducedMotion.matches)
		this.set(MEDIA_THEME, colorScheme.matches ? THEME_DARK : THEME_LIGHT)
		this.set(MEDIA_VIEWPORT, getViewport())
		this.set(MEDIA_ORIENTATION, screenOrientation.matches ? ORIENTATION_LANDSCAPE : ORIENTATION_PORTRAIT)

		// Event listeners
		reducedMotion.addEventListener(
			'change',
			e => this.set(MEDIA_MOTION, e.matches)
		)
		colorScheme.addEventListener(
			'change',
			e => this.set(MEDIA_THEME, e.matches ? THEME_DARK : THEME_LIGHT)
		)
		screenSmall.addEventListener('change', () => this.set(MEDIA_VIEWPORT, getViewport()))
		screenMedium.addEventListener('change', () => this.set(MEDIA_VIEWPORT, getViewport()))
		screenLarge.addEventListener('change', () => this.set(MEDIA_VIEWPORT, getViewport()))
		screenXLarge.addEventListener('change', () => this.set(MEDIA_VIEWPORT, getViewport()))
		screenOrientation.addEventListener(
			'change',
			e => this.set(MEDIA_THEME, e.matches ? ORIENTATION_LANDSCAPE : ORIENTATION_PORTRAIT)
		)
	}
}
MediaContext.define('media-context')