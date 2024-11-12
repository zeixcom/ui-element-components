import { UIElement, on, pass } from '@efflore/ui-element'

class TodoForm extends UIElement {
	connectedCallback() {
		const inputField = this.querySelector('input-field')

        this.first('form').forEach(on('submit', e => {
			e.preventDefault()
			setTimeout(() => {
				this.dispatchEvent(new CustomEvent('add-todo', {
					bubbles: true,
					detail: inputField.get('value')
				}))
				inputField.clear()
			}, 0)
		}))
		
		this.first('input-button').forEach(pass({
			disabled: () => inputField.get('empty')
		}))
    }
}
TodoForm.define('todo-form')