import { Capsula, toggleClass } from '@efflore/capsula'

class MySlider extends Capsula {
	static states = {
		active: 0 // Initialize state for the active slide index
	}
	
	connectedCallback() {
		super.connectedCallback()
	
		// Event listeners for navigation
		const total = this.querySelectorAll('.slide').length
		const newIndex = (prev, direction) => (prev + direction + total) % total
		this.first('.prev').on('click', () => this.set('active', v => newIndex(v, -1)))
		this.first('.next').on('click', () => this.set('active', v => newIndex(v, 1)))
	
		// Auto-effects for updating slides and dots
		this.all('.slide').sync((host, target, idx) => toggleClass(
			'active',
			() => idx === this.get('active')
		)(host, target))
		this.all('.dots span').sync((host, target, idx) => toggleClass(
			'active',
			() => idx === this.get('active')
		)(host, target))
	}
}
MySlider.define('my-slider')