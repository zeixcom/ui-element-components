import { Capsula } from '@efflore/capsula'

class TodoForm extends Capsula {
	connectedCallback() {
		const inputField = this.querySelector('input-field')

        this.first('form').on('submit', e => {
			e.preventDefault()
			setTimeout(() => {
				this.dispatchEvent(new CustomEvent('add-todo', {
					bubbles: true,
					detail: inputField.get('value')
				}))
				inputField.clear()
			}, 0)
		})
		
		this.first('input-button').pass({
			disabled: () => inputField.get('empty')
		})
    }
}
TodoForm.define('todo-form')