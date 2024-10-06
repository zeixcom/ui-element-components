import { UIElement, setText, setProperty, effect } from '@efflore/ui-element';

class LazyLoad extends UIElement {
	static observedAttributes = ['src']
	static attributeMap = {
        src: v => v.map(src => {
				let url = ''
				try {
					url = new URL(src, location.href) // ensure 'src' attribute is a valid URL
					if (url.origin !== location.origin) { // sanity check for cross-origin URLs
						throw new TypeError('Invalid URL origin')
					}
				} catch (error) {
					console.error(error, url)
					url = ''
				}
				return url.toString()
			})
    }

	connectedCallback() {

		// show / hide loading message
		this.first('.loading')
			.forEach(setProperty('ariaHidden', () => !!this.get('error')))

		// set and show / hide error message
		this.first('.error')
			.map(setText('error'))
			.forEach(setProperty('ariaHidden', () => !this.get('error')))

		// load content from provided URL
		effect(enqueue => {
			const src = this.get('src')
			if (!src) return // silently fail if no valid URL is provided
			fetch(src)
				.then(async response => {
					if (response.ok) {
						const content = await response.text()
						enqueue(this.root, 'h', el => () => {
							// UNSAFE!, use only trusted sources in 'src' attribute
							el.innerHTML = content
							el.querySelectorAll('script').forEach(script => {
								const newScript = document.createElement('script')
								newScript.appendChild(document.createTextNode(script.textContent))
								el.appendChild(newScript)
								script.remove()
							})
						})
						this.set('error', '')
                    } else {
						this.set('error', response.status + ':'+ response.statusText)
					}
				})
				.catch(error => this.set('error', error))
		})
	}
}
LazyLoad.define('lazy-load')