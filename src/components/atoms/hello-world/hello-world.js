import { UIElement, setText } from '@efflore/ui-element'

class HelloWorld extends UIElement {
	static consumedContexts = ['display-name']

	connectedCallback() {
		super.connectedCallback()
		this.first('span').map(setText('display-name'))
	}
}
HelloWorld.define('hello-world')