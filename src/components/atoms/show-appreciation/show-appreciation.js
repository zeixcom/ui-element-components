import UIElement from '../../../assets/js/ui-element';
import { define, replaceText } from '../../../assets/js/utils';

define('show-appreciation', class extends UIElement {
  #count = Symbol();

  connectedCallback() {
    const count = this.querySelector('.count');
    this.set(this.#count, parseInt(this.getAttribute('count') || count.textContent, 10), false);
    
    this.querySelector('button').onclick = () => this.set(this.#count, v => ++v);

    this.effect(() => replaceText(count, this.get(this.#count)));
  }

  get count() {
    return this.get(this.#count);
  }
});
