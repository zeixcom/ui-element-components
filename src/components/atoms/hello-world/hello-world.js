import { UIElement, setText } from '@efflore/ui-element'

class HelloWorld extends UIElement {
	static consumedContexts = ['display-name']

	connectedCallback() {
		this.first('span').map(setText(this.get('display-name')))
	}
}

HelloWorld.define('hello-world')