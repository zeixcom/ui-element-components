import UIElement from '../../../assets/js/ui-element';
import { define, replaceText } from '../../../assets/js/utils';
import { ContextConsumer } from '../../../assets/js/context-controller';

define('hello-world', class extends UIElement {
  static observedContexts = ['display-name'];

  connectedCallback() {
    const name = this.querySelector('span');
    const unknown = name.textContent;
    this.set('display-name', unknown);
    this.contextConsumer = new ContextConsumer(this);

    this.effect(() => {
      const providedName = this.get('display-name');
      replaceText(name, providedName || unknown);
    });
  }

  disconnectedCallback() {
    this.contextConsumer.disconnect();
  }
});