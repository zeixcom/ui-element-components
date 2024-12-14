import { Capsula, asInteger, setText } from '@efflore/capsula'

class ShowAppreciation extends Capsula {
	#count = Symbol() // Use a private Symbol as state key

	connectedCallback() {
		// Initialize count state
		this.set(this.#count, asInteger(this.querySelector('.count').textContent) ?? 0)

		// Bind click event to increment count
		this.first('button').on('click', () => this.set(this.#count, v => ++v))

		// Update .count text when count changes
		this.first('.count').sync(setText(this.#count))
	}

	// Expose read-only property for count
	get count() {
		return this.get(this.#count)
	}
}
ShowAppreciation.define('show-appreciation')
