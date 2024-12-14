import { Capsula, setText, setProperty, effect, enqueue } from '@efflore/capsula'

class LazyLoad extends Capsula {
	static observedAttributes = ['src']
	static states = {
        src: v => {
				let url = ''
				try {
					url = new URL(v, location.href) // ensure 'src' attribute is a valid URL
					if (url.origin !== location.origin) // sanity check for cross-origin URLs
						throw new TypeError('Invalid URL origin')
				} catch (error) {
					console.error(error, url)
					url = ''
				}
				return url.toString()
			},
		error: ''
    }

	connectedCallback() {

		// Show / hide loading message
		this.first('.loading')
			.sync(setProperty('ariaHidden', () => !!this.get('error')))

		// Set and show / hide error message
		this.first('.error')
			.sync(setText('error'))
			.sync(setProperty('ariaHidden', () => !this.get('error')))

		// Load content from provided URL
		effect(async () => {
			const src = this.get('src')
			if (!src) return // silently fail if no valid URL is provided
			try {
				const response = await fetch(src)
				if (response.ok) {
					const content = await response.text()
					enqueue(() => {
						// UNSAFE!, use only trusted sources in 'src' attribute
						this.root.innerHTML = content
						this.root.querySelectorAll('script').forEach(script => {
							const newScript = document.createElement('script')
							newScript.appendChild(document.createTextNode(script.textContent))
							this.root.appendChild(newScript)
							script.remove()
						})
					}, [this.root, 'h'])
					this.set('error', '')
				} else {
					this.set('error', response.status + ':'+ response.statusText)
				}
			} catch (error) {
                this.set('error', error)
            }
		})
	}
}
LazyLoad.define('lazy-load')