import { UIElement, on, pass, setText, setProperty } from '@efflore/ui-element'

class TodoApp extends UIElement {
    connectedCallback() {
		const [todoList, todoFilter] = ['todo-list', 'input-radiogroup']
			.map(selector => this.querySelector(selector))

		// event listener on own element
        this.self
            .map(on('add-todo', e => todoList?.addItem(e.detail)))
        
        // coordinate todo-count
		this.first('todo-count')
            .map(pass({ active: () => todoList?.get('count').active }))

        // coordinate todo-list
        this.first('todo-list')
            .map(pass({ filter: () => todoFilter?.get('value') }))

        // coordinate .clear-completed button
        this.first('.clear-completed')
            .map(on('click', () => todoList?.clearCompleted()))
            .map(pass({ disabled: () => !todoList?.get('count').completed }))
    }
}
TodoApp.define('todo-app')

class TodoCount extends UIElement {
	connectedCallback() {
        this.set('active', 0, false)
		this.first('.count')
			.map(setText('active'))
		this.first('.singular')
		    .map(setProperty('ariaHidden', () => this.get('active') > 1))
		this.first('.plural')
		    .map(setProperty('ariaHidden', () => this.get('active') === 1))
		this.first('.remaining')
			.map(setProperty('ariaHidden', () => !this.get('active')))
		this.first('.all-done')
			.map(setProperty('ariaHidden', () => !!this.get('active')))
    }
}
TodoCount.define('todo-count')