customElements.define('scroll-area', class ScrollArea extends HTMLElement {
	connectedCallback() {
		const orientation = this.getAttribute('orientation')
		const threshold = 0.999 // ignore rounding errors of fraction pixels
		let scrolling

		// Scroll event handler
		const onScroll = () => {
			if (scrolling) cancelAnimationFrame(scrolling)
			scrolling = requestAnimationFrame(() => {
				scrolling = null
				this.classList.toggle(
					'overflow-start',
					orientation === 'horizontal'
						? (this.scrollLeft > 0)
						: (this.scrollTop > 0)
				)
				this.classList.toggle(
					'overflow-end',
					orientation === 'horizontal'
						? (this.scrollLeft < (this.scrollWidth - this.offsetWidth))
						: (this.scrollTop < (this.scrollHeight - this.offsetHeight))
				)
			})
		}

		// Setup intersection observer
		this.intersectionObserver = new IntersectionObserver(([entry]) => {
			if (entry.intersectionRatio > 0 && entry.intersectionRatio < threshold) {
				this.addEventListener('scroll', onScroll)
				this.classList.add('overflow', 'overflow-end')
			} else {
				this.removeEventListener('scroll', onScroll)
				this.classList.remove('overflow', 'overflow-start', 'overflow-end')
			}
		}, {
			root: this,
			threshold: [0, threshold]
		}).observe(this.children[0])
	}

	disconnectedCallback() {
		if (this.intersectionObserver) this.intersectionObserver.disconnect()
	}
})