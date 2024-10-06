import { UIElement, maybe, on, setText } from '@efflore/ui-element'

class ShowAppreciation extends UIElement {
	#count = Symbol() // signal keys can be Symbols too

	connectedCallback() {

		// set initial count from attribute or default to 0
		this.set(this.#count, maybe(parseInt(this.getAttribute('count'), 10)).filter(Number.isFinite)[0] || 0)

		// update .count text when count changes
		this.first('.count').forEach(setText(this.#count))

		// bind click event to increment count
		this.first('button').forEach(on('click', () => this.set(this.#count, v => ++v)))
	}

	// read-only count property
	get count() {
		return this.get(this.#count)
	}
}
ShowAppreciation.define('show-appreciation')
