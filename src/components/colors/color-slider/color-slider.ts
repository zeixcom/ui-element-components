/* import { Capsula, effect } from '@efflore/capsula'
import { component } from '@zeix/ui-element'
import 'culori/css'
import { type Oklch, converter, inGamut, formatCss } from 'culori/fn'
import { formatNumber } from '../../../assets/js/utils'
import VisibilityObserver from '../../../assets/js/visibility-observer'
import RedrawObserver from '../../../assets/js/redraw-observer'
import dragHandler from '../../../assets/js/drag-handler'
import { asOklch } from '../../../assets/js/parsers'

export type ColorSliderProps = {
	color: Oklch
}

export default component('color-slider', {
	color: asOklch()
}, el => {
	let base
	let channel
	const axis = el.getAttribute('axis') || 'h'
	const thumb = el.querySelector('.thumb')
	const track = el.querySelector('canvas')
	const valuemax = el.getAttribute('aria-valuemax')
	const max = valuemax ? parseInt(valuemax, 10) : 360
	let trackWidth
	const trackOffset = 20 // pixels
	const redrawTimeout = 250 // milliseconds
	return []
})

class ColorSlider extends Capsula {
	static observedAttributes = ['color']
	static states = {
		color: converter('oklch')
	}

	connectedCallback() {
		let base
		let channel
		const axis = this.getAttribute('axis') || 'h'
		const thumb = this.querySelector('.thumb')
		const track = this.querySelector('canvas')
		const max = parseFloat(thumb.getAttribute('aria-valuemax'), 10) || 360
		let trackWidth
		const trackOffset = 20 // pixels
		const redrawTimeout = 250 // milliseconds
		this.visibilityObserver = new VisibilityObserver(this)

		// Return formatted value text
		const getValueText = color => {
			switch (axis) {
				case 'h': return `${formatNumber(color.h)}°`
				case 'l': return `${formatNumber(color.l * 100)}%`
				case 'c': return formatNumber(color.c, 4)
			}
		}

		// Redraw the track
		const redrawTrack = color => {
			const inP3Gamut = inGamut('p3')
			const inRGBGamut = inGamut('rgb')

			const getColorFromPosition = x => {
				const newColor = {...color, [axis]: x * (axis === 'l' ? max / 100 : max) }
				if (inRGBGamut(newColor)) return newColor
				inP3Gamut(newColor) ? newColor.alpha = 0.5 : newColor.alpha = 0
				return newColor
			}

			this.setAttribute('visible', '')
			this.set('redraw', false)
			const ctx = track.getContext('2d', { colorSpace: 'display-p3' })
			ctx.clearRect(0, 0, 360, 1)
			if (!trackWidth) {
				const sliderWidth = this.getBoundingClientRect().width
				trackWidth = sliderWidth - trackOffset * 2
				this.style.setProperty('--slider-width', sliderWidth)
				this.style.setProperty('--track-width', trackWidth)
			}
			track.setAttribute('width', trackWidth)
			for (let x = 0; x < trackWidth; x++) {
				ctx.fillStyle = formatCss(getColorFromPosition(x / trackWidth))
				ctx.fillRect(x, 0, 1, 1)
			}
			thumb.style.borderColor = color.l > 0.71 ? 'black' : 'white'
		};

		// Reposition thumb if color changes
		const repositionThumb = color => {
			channel = color[axis]
			thumb.style.left = `${Math.round((axis === 'l' ? color[axis] * 100 : color[axis]) * trackWidth / max) + trackOffset}px`
			this.style.setProperty('--color-base', formatCss(color))
			this.querySelector('.thumb span').innerHTML = getValueText(color)
		}

		// Adjust to box size changes
		const resizeCallback = contentBoxSize => {
			trackWidth = contentBoxSize.inlineSize - trackOffset * 2
			this.style.setProperty('--slider-width', contentBoxSize.inlineSize)
			this.style.setProperty('--track-width', trackWidth)
			repositionThumb(base)
		}
		this.redrawObserver = new RedrawObserver(this, resizeCallback, redrawTimeout)

		// Move thumb to a new position
		const moveThumb = x => {
			const inP3Gamut = inGamut('p3')
			const color = {...base, [axis]: Math.min(Math.max(x, 0), 1) * (axis === 'l' ? max / 100 : max)}
			inP3Gamut(color) && repositionThumb(color)
		}

		// Trigger color-change event to commit the color change
		const triggerChange = color => {
			this.set('color', color)
			thumb.setAttribute('aria-valuenow', color[axis])
			thumb.setAttribute('aria-valuetext', getValueText(color))
			const event = new CustomEvent('color-change', { detail: color, bubbles: true })
			this.dispatchEvent(event)
		}

		// Handle dragging
		let dragBoundingBox
		dragHandler({
			element: thumb,
			start: () => dragBoundingBox = track.getBoundingClientRect(),
			move: e => moveThumb((e.clientX - dragBoundingBox.left) / trackWidth),
			end: () => triggerChange({...base, [axis]: channel })
		})

		// Handle arrow key events
		thumb.onkeydown = e => {
			if (e.key.substring(0, 5) !== 'Arrow') return
			e.stopPropagation()
			e.preventDefault()

			const stepOffset = e.shiftKey ? 10 : 1
			let x = thumb.offsetLeft - trackOffset

			switch (e.key) {
				case 'ArrowLeft':
					x -= stepOffset
					break
				case 'ArrowRight':
					x += stepOffset
					break
				default:
					return
			}
			moveThumb(x / trackWidth)
			triggerChange({...base, [axis]: channel })
		}

		// Redraw slider track if color changes
		effect(() => {
			const shouldUpdateTrack = () => {
				if (!this.get('visible')) return false
				if (!base) return true
				switch (axis) {
					case 'h': return (color.l!== base.l) || (color.c!== base.c)
					case 'l': return (color.c!== base.c) || (color.h!== base.h)
					case 'c': return (color.l!== base.l) || (color.h!== base.h)
				}
			}

			const color = this.get('color')
			const updateTrack = shouldUpdateTrack()
			base = color
			repositionThumb(color)
			updateTrack && this.set('redraw', true)
		})

		// Redraw track after color change or resize
		effect(() => {
			this.get('redraw') && redrawTrack(base)
		})
	}

	disconnectedCallback() {
		this.visibilityObserver.disconnect()
		this.redrawObserver.disconnect()
	}

}
ColorSlider.define('color-slider')
*/
