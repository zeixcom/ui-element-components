import UIElement from '../../../assets/js/ui-element';
import { ContextConsumer } from '../../../assets/js/context-controller';
import { updateText } from '../../../assets/js/dom-update';

class HelloWorld extends UIElement {
  static observedContexts = ['display-name'];

  connectedCallback() {
    const name = this.querySelector('span');
    const unknown = name.textContent;
    this.set('display-name', unknown);
    this.contextConsumer = new ContextConsumer(this);

    this.effect(() => updateText(name, this.get('display-name') || unknown));
  }

  disconnectedCallback() {
    this.contextConsumer.disconnect();
  }
}

HelloWorld.define('hello-world');