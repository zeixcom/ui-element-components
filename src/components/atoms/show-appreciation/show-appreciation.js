import UIElement from '../../../assets/js/ui-element';
import { updateText } from '../../../assets/js/dom-update';

class ShowAppreciation extends UIElement {
  #count = Symbol();

  connectedCallback() {
    const count = this.querySelector('.count');
    this.set(this.#count, parseInt(this.getAttribute('count') || count.textContent, 10), false);
    
    this.querySelector('button').onclick = () => this.set(this.#count, v => ++v);

    this.effect(() => updateText(count, this.get(this.#count)));
  }

  get count() {
    return this.get(this.#count);
  }
}

ShowAppreciation.define('show-appreciation');
