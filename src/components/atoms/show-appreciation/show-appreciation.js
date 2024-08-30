import { UIElement, on, setText } from '@efflore/ui-element'

class ShowAppreciation extends UIElement {
  #count = Symbol()

  connectedCallback() {
    this.set(this.#count, parseInt(this.getAttribute('count'), 10))
    this.first('.count').map(setText(this.#count))
    this.first('button').map(on('click', () => this.set(this.#count, v => ++v)))
  }

  get count() {
    return this.get(this.#count)
  }
}

ShowAppreciation.define('show-appreciation')
