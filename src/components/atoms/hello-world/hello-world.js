import { Capsula, setText } from '@efflore/capsula'

class HelloWorld extends Capsula {
	static consumedContexts = ['display-name']

	connectedCallback() {
		super.connectedCallback()
		this.first('span')
			.sync(setText('display-name'))
	}
}
HelloWorld.define('hello-world')