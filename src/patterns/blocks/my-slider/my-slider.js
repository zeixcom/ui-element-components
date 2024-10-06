import { UIElement, on, toggleClass } from '@efflore/ui-element'

class MySlider extends UIElement {
	connectedCallback() {
	
		// Initialize state for the active slide index
		this.set('active', 0)
	
		// Event listeners for navigation
		const total = this.querySelectorAll('.slide').length
		const getNewIndex = (prev, direction) => (prev + direction + total) % total
		this.first('.prev').map(on('click', () => this.set('active', v => getNewIndex(v, -1))))
		this.first('.next').map(on('click', () => this.set('active', v => getNewIndex(v, 1))))
	
		// Auto-effects for updating slides and dots
		this.all('.slide').map((ui, idx) => toggleClass('active', () => idx === this.get('active'))(ui))
		this.all('.dots span').map((ui, idx) => toggleClass('active', () => idx === this.get('active'))(ui))
	}
}
MySlider.define('my-slider')