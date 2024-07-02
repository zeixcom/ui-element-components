import UIElement from '@efflore/ui-element';
import { ContextConsumer } from '../../../assets/js/context-controller';
import { setText } from '../../../assets/js/dom-utils';

class HelloWorld extends UIElement {
  static observedContexts = ['display-name'];

  connectedCallback() {
    const name = this.querySelector('span');
    const unknown = name.textContent;
    this.set('display-name', unknown);
    this.contextConsumer = new ContextConsumer(this);

    this.effect(() => setText(name, this.get('display-name') || unknown));
  }

  disconnectedCallback() {
    this.contextConsumer.disconnect();
  }
}

HelloWorld.define('hello-world');