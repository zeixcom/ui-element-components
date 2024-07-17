import { UIElement, effect, uiRef } from '../../../assets/js/ui-component';

class ShowAppreciation extends UIElement {
  #count = Symbol();

  connectedCallback() {
    const count = uiRef(this).first('.count');
    this.set(this.#count, parseInt(this.getAttribute('count') || count.text.get(), 10), false);
    
    this.querySelector('button').onclick = () => this.set(this.#count, v => ++v);

    effect(enqueue => enqueue(count(), count.text.set(this.get(this.#count))));
  }

  get count() {
    return this.get(this.#count);
  }
}

ShowAppreciation.define('show-appreciation');
