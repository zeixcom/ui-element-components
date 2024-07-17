import { UIElement, effect, uiRef } from '../../../assets/js/ui-component';

class HelloWorld extends UIElement {
  static consumedContexts = ['display-name'];

  connectedCallback() {
    const name = uiRef(this).first('span');
    const unknown = name.text.get();
    this.set('display-name', unknown);

    effect(enqueue => enqueue(name(), name.text.set(this.get('display-name') || unknown)));
  }
}

HelloWorld.define('hello-world');