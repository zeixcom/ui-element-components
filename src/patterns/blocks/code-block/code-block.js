import { UIElement, asBoolean, on, effect, toggleAttribute } from '@efflore/ui-element'
import Prism from 'prismjs'

class CodeBlock extends UIElement {
	static observedAttributes = ['collapsed']
	static attributeMap = {
		collapsed: asBoolean
	}

  	connectedCallback() {
		// enhance code block with Prism.js
		const language = this.getAttribute('language') || 'html'
		const content = this.querySelector('code')
		this.set('code', content.textContent.trim(), false)
		effect(enqueue => {
			// apply syntax highlighting while preserving Lit's marker nodes in Storybook
			const code = document.createElement('code')
			code.innerHTML = Prism.highlight(this.get('code'), Prism.languages[language], language)
			enqueue(content, 'h', el => () => {
				Array.from(el.childNodes)
					.filter(node => node.nodeType !== Node.COMMENT_NODE)
					.forEach(node => node.remove())
				Array.from(code.childNodes)
					.forEach(node => el.appendChild(node))
			})
		})

		// copy to clipboard
		this.first('.copy').map(ui => on('click', async () => {
			const copyButton = ui.target
			const label = copyButton.textContent
			let status = 'success'
			try {
				await navigator.clipboard.writeText(content.textContent)
			} catch (err) {
				console.error('Error when trying to use navigator.clipboard.writeText()', err)
				status = 'error'
			}
			copyButton.set('disabled', true)
			copyButton.set('label', ui.host.getAttribute(`copy-${status}`))
			setTimeout(() => {
				copyButton.set('disabled', false)
				copyButton.set('label', label)
			}, status === 'success' ? 1000 : 3000)
		})(ui))

		// expand
		this.first('.overlay').map(on('click', () => this.set('collapsed', false)))
		this.self.map(toggleAttribute('collapsed'))
	}
}
CodeBlock.define('code-block')