import UIElement from '@efflore/ui-element';
import { define } from '../../../assets/js/utils';

define('show-appreciation', class extends UIElement {
  static observedAttributes = ['count'];

  attributeMapping = { count: 'integer' };

  connectedCallback() {
    const count = this.querySelector('.count');
    !this.has('count') && this.set('count', count.textContent);
    
    this.querySelector('button').onclick = () => this.set('count', v => ++v);

    this.effect(() => {
      Array.from(count.childNodes).filter(node => node.nodeType !== Node.COMMENT_NODE).forEach(node => node.remove());
      count.append(document.createTextNode(this.get('count')));
    });
  }
});
