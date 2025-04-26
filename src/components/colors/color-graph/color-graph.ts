/* import { Capsula, effect } from '@efflore/capsula'
import 'culori/css'
import { converter, inGamut, formatCss } from 'culori/fn'
import { formatNumber, getStepColor } from '../../../assets/js/utils'
import VisibilityObserver from '../../../assets/js/visibility-observer'
import RedrawObserver from '../../../assets/js/redraw-observer'
import dragHandler from '../../../assets/js/drag-handler'

class ColorGraph extends Capsula {
	static observedAttributes = ['color']
	static states = {
		color: converter('oklch')
	}

	connectedCallback() {
		let canvasSize
		let base = this.get('color')
		let hue
		this.visibilityObserver = new VisibilityObserver(this)
		const redrawTimeout = 250; // milliseconds
		const knob = this.querySelector('.knob')

		// Redraw canvas if size or hue changes
		const redrawCanvas = h => {
			const inP3Gamut = inGamut('p3')
			const inRGBGamut = inGamut('rgb')
			const getColorFromPosition = (x, y) => {
				const l = 1 - (y / canvasSize)
				const c = x / (2.5 * canvasSize)
				const color = { mode: 'oklch', l, c, h }
				if (inRGBGamut(color)) return color
				if (inP3Gamut(color)) {
					color.alpha = 0.5
					return color
				}
				return
			};

			this.setAttribute('visible', '')
			this.set('redraw', false)
			hue = h
			if (!canvasSize) {
				canvasSize = this.getBoundingClientRect().width
				this.style.setProperty('--canvas-size', canvasSize)
			}
			const canvas = this.querySelector('canvas')
			canvas.setAttribute('width', canvasSize)
			canvas.setAttribute('height', canvasSize)
			// const start = performance.now();
			// const ctx = canvas.getContext('bitmaprenderer', { colorSpace: 'display-p3' })
			// const offscreen = new OffscreenCanvas(canvasSize, canvasSize);
			// const offscreenCtx = offscreen.getContext('2d', { colorSpace: 'display-p3' })
			const ctx = canvas.getContext('2d', { colorSpace: 'display-p3' })
			for (let y = 0; y < canvasSize; y++) {
				for (let x = 0; x < canvasSize; x++) {
					const bgColor = getColorFromPosition(x, y)
					if (bgColor) {
						ctx.fillStyle = formatCss(bgColor)
						ctx.fillRect(x, y, 1, 1)
					} else {
						x = canvasSize
					}
				}
			}
			// ctx.transferFromImageBitmap(offscreen.transferToImageBitmap())
			// console.log(`time to draw canvas: ${performance.now() - start}ms`)
		};

		// Reposition knob and scale if color changes
		const repositionScale = color => {
			base = color

			const setStepPosition = (key, col) => {
				const x = Math.round(col.c * 2.5 * canvasSize)
				const y = Math.round((1 - col.l) * canvasSize)
				const el = this.querySelector(`.${key}`)
				el.style.top = `${y}px`
				el.style.left = `${x}px`
				el.style.borderColor = col.l > 0.71 ? 'black' : 'white'
			};

			const setStepColor = (key, step) => {
				const col = getStepColor(color, step)
				this.style.setProperty(`--color-${key}`, formatCss(col))
				setStepPosition(key, col)
			};

			this.style.setProperty('--color-base', formatCss(color))
			setStepPosition('knob', color)
			this.querySelector('.knob span').innerHTML = `${formatNumber(color.l * 100)}%<br />${formatNumber(color.c, 4)}`
			for (let i = 4; i > 0; i--) setStepColor(`lighten${i * 20}`, (5 + i) / 10)
			for (let i = 1; i < 5; i++) setStepColor(`darken${i * 20}`, (5 - i) / 10)
		};

		// Adjust to box size changes
		const resizeCallback = contentBoxSize => {
			canvasSize = contentBoxSize.inlineSize
			this.style.setProperty('--canvas-size', canvasSize)
			repositionScale(base)
		}
		this.redrawObserver = new RedrawObserver(this, resizeCallback, redrawTimeout)

		// Move knob to a new position
		const moveKnob = (x, y) => {
			const getColorFromPosition = (x, y) => ({
				mode: 'oklch',
				l: 1 - (Math.min(Math.max(y, 0), canvasSize) / canvasSize),
				c: Math.min(Math.max(x, 0), canvasSize) / (2.5 * canvasSize),
				h: base.h,
			})

			const inP3Gamut = inGamut('p3')
			const color = getColorFromPosition(x, y)
			inP3Gamut(color) && repositionScale(color)
		};

		// Trigger color-change event to commit the color change
		const triggerChange = color => {
			this.set('color', color)
			const event = new CustomEvent('color-change', { detail: color, bubbles: true })
			this.dispatchEvent(event)
		};
		
		// Handle dragging
		let dragBoundingBox
		dragHandler({
			element: knob,
			start: () => dragBoundingBox = this.getBoundingClientRect(),
			move: e => moveKnob(e.clientX - dragBoundingBox.left, e.clientY - dragBoundingBox.top),
			end: () => triggerChange(base),
		});

		// Handle arrow key events
		knob.onkeydown = e => {
			if (e.key.substring(0, 5) !== 'Arrow') return
			e.stopPropagation()
			e.preventDefault()
	
			const stepOffset = e.shiftKey ? 10 : 1
			let x = knob.offsetLeft
			let y = knob.offsetTop
	
			switch (e.key) {
				case 'ArrowDown':
					y += stepOffset
					break
				case 'ArrowUp':
					y -= stepOffset
					break
				case 'ArrowLeft':
					x -= stepOffset
					break;
				case 'ArrowRight':
					x += stepOffset
					break
				default:
					return
			}
			moveKnob(x, y)
			triggerChange(base)
		}

		// Recalculate if base color changes
		effect(() => {
			base = this.get('color')
			repositionScale(base)
			this.get('visible') && (hue !== base.h) && this.set('redraw', true)
		})

		// Redraw canvas after hue change or resize
		effect(() => {
			this.get('redraw') && redrawCanvas(base.h)
		})
	}

	disconnectedCallback() {
		this.visibilityObserver.disconnect()
		this.redrawObserver.disconnect()
	}

}
ColorGraph.define('color-graph')
*/