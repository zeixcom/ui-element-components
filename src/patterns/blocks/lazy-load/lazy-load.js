import { UIElement, effect } from '@efflore/ui-element';

class LazyLoad extends UIElement {
	connectedCallback() {
		this.set('error', '')
		this.set('content', () => {
			fetch(this.getAttribute('src')) // TODO ensure 'src' attribute is a valid URL from a trusted source
				.then(async response => response.ok
					? this.set('content', await response.text())
					: this.set('error', response.statusText)
				)
				.catch(error => this.set('error', error))
			return // we don't return a fallback value
		})

		const loadingEl = this.querySelector('.loading')
		const errorEl = this.querySelector('.error')

		effect(enqueue => {
			const error = this.get('error')
			if (!error || !errorEl) return
			if (loadingEl) enqueue(loadingEl, 'r', el => () => el.remove()) // remove placeholder for pending state
			enqueue(errorEl, 't', el => () => el.textContent = error) // fill error message
		})

		effect(enqueue => {
			const content = this.get('content')
			if (!content) return
			this.root = this.shadowRoot || this.attachShadow({ mode: 'open' }) // we use shadow DOM to encapsulate styles
			enqueue(this.root, 'h', el => () => { // UNSAFE!, use only trusted sources in 'src' attribute
				el.innerHTML = content
				el.querySelectorAll('script').forEach(script => {
					const newScript = document.createElement('script')
					newScript.appendChild(document.createTextNode(script.textContent))
					el.appendChild(newScript)
					script.remove()
				})
			})
			if (loadingEl) enqueue(loadingEl, 'r', el => () => el.remove()) // remove placeholder for pending state
			if (errorEl) enqueue(errorEl, 'r', el => () => el.remove()) // won't be needed anymore as request was successful
		})
	 }
}
LazyLoad.define('lazy-load')