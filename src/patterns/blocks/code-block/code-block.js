import { Capsula, asBoolean, effect, enqueue, toggleAttribute } from '@efflore/capsula'
import Prism from 'prismjs'

class CodeBlock extends Capsula {
	static observedAttributes = ['collapsed']
	static states = {
		collapsed: asBoolean
	}

  	connectedCallback() {

		// Enhance code block with Prism.js
		const language = this.getAttribute('language') || 'html'
		const content = this.querySelector('code')
		this.set('code', content.textContent.trim(), false)
		effect(() => {
			// Apply syntax highlighting while preserving Lit's marker nodes in Storybook
			const code = document.createElement('code')
			code.innerHTML = Prism.highlight(
				this.get('code'),
				Prism.languages[language],
				language
			)
			enqueue(() => {
				Array.from(content.childNodes)
					.filter(node => node.nodeType !== Node.COMMENT_NODE)
					.forEach(node => node.remove())
				Array.from(code.childNodes)
					.forEach(node => content.appendChild(node))
			}, [content, 'h'])
		})

		// Copy to clipboard
		const button = this.querySelector('.copy')
		button.onclick = async () => {
			const label = button.textContent
			let status = 'success'
			try {
				await navigator.clipboard.writeText(content.textContent)
			} catch (err) {
				console.error('Error when trying to use navigator.clipboard.writeText()', err)
				status = 'error'
			}
			button.set('disabled', true)
			button.set('label', this.getAttribute(`copy-${status}`))
			setTimeout(() => {
				button.set('disabled', false)
				button.set('label', label)
			}, status === 'success' ? 1000 : 3000)
		}

		// Expand
		this.first('.overlay').on('click', () => this.set('collapsed', false))
		this.self.sync(toggleAttribute('collapsed'))
	}
}
CodeBlock.define('code-block')