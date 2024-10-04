import ComponentDemo from './component-demo.html'

export default {
	title: 'blocks/component-demo',
    render: ComponentDemo,
    argTypes: {},
    args: {
		name: 'hello-world',
		content: 'Hello World!',
        htmlSource: `<hello-world>
	<p>Hello <span>World</span>!</p>
</hello-world>`,
		cssSource: `hello-world {
	display: block;
}`,
        jsSource: `import { UIElement, setText } from '@efflore/ui-element'

class HelloWorld extends UIElement {
	static consumedContexts = ['display-name']

	connectedCallback() {
		super.connectedCallback()
		this.first('span').map(setText('display-name'))
	}
}
HelloWorld.define('hello-world')`,
        codeLabel: 'Source Code',
        htmlLabel: 'HTML',
		cssLabel: 'CSS',
		jsLabel: 'JavaScript',
    },
}

export const HelloWorld = {}