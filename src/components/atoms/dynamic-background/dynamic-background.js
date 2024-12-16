import { Capsula, effect, enqueue } from '@efflore/capsula'
import 'culori/css'
import { converter, formatCss } from 'culori/fn'
import { getStepColor } from '../../../assets/js/utils'

class DynamicBackground extends Capsula {
	static observedAttributes = ['color']
	static consumedContexts = ['dark-mode']
	static states = {
		color: converter('oklch')
	}

	constructor() {
		super()

		// we only need to hydrate if there is no server-generated shadow root or the browser doesn't attach it
		if (!this.shadowRoot) {
		
			// polyfill shadow root if browser doesn't support declarative shadow root yet
			// or we are in a client-rendered environment like Storybook
			let template = this.querySelector('template[shadowrootmode]')
			if (template) {
				this.attachShadow({ mode: template.getAttribute('shadowrootmode') }).appendChild(template.content)
				template.remove()
			} else {
				const component = this.tagName.toLocaleLowerCase()
				template = this.getRootNode().getElementById(`${component}-template`)
				template
					? this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
					: console.error(`Could not attach shadow root for <${component}>`)
			}
		}
	}

	connectedCallback() {
		const pointerBubble = this.querySelector('gradient-bubble[move="pointer"]')
		if (pointerBubble) {
			let posX = 0
			let posY = 0
			let pointerX = 0
			let pointerY = 0
			
			const move = () => {
				posX += (pointerX - posX) / 20
				posY += (pointerY - posY) / 20
				pointerBubble.style.transform = `translate(${Math.round(posX)}px, ${Math.round(posY)}px)`
				requestAnimationFrame(move)
			}
			move()

			this.self.on('pointermove', e => {
				const rect = this.getBoundingClientRect()
				pointerX = e.clientX - rect.left
				pointerY = e.clientY - rect.top
			})
		}

		// update if base color changes
		effect(() => {
			const base = this.get('color')
			const dark = this.get('dark-mode')
			const prop = '--color-bubble'
			const bubbles = this.shadowRoot.querySelectorAll('gradient-bubble')
			for (let i = 0; i < 4; i++) {
				enqueue(() => {
					bubbles[i].style.setProperty(prop, formatCss(getStepColor(base, (dark ? 1 + i : 9 - i) / 10)))
				}, [bubbles[i], `s-${prop}`])
			}
			enqueue(() => {
				bubbles[4].style.setProperty(prop, formatCss(base))
			}, [bubbles[4], `s-${prop}`])
		})
	}
}
DynamicBackground.define('dynamic-background')