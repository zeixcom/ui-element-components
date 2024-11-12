import { UIElement, on, pass, setText, setProperty } from '@efflore/ui-element'

class TodoApp extends UIElement {
    connectedCallback() {
		const [todoList, todoFilter] = ['todo-list', 'input-radiogroup']
			.map(selector => this.querySelector(selector))

		// Event listener on own element
        this.self.forEach(on('add-todo', e => todoList?.addItem(e.detail)))
        
        // Coordinate todo-count
		this.first('todo-count').forEach(pass({
			active: () => todoList?.get('count').active
		}))

        // Coordinate todo-list
        this.first('todo-list').forEach(pass({
			filter: () => todoFilter?.get('value')
		}))

        // Coordinate .clear-completed button
        this.first('.clear-completed')
            .map(on('click', () => todoList?.clearCompleted()))
            .forEach(pass({ disabled: () => !todoList?.get('count').completed }))
    }
}
TodoApp.define('todo-app')

class TodoCount extends UIElement {
	connectedCallback() {
        this.set('active', 0, false)
		this.first('.count').forEach(setText('active'))
		this.first('.singular').forEach(setProperty('ariaHidden', () => this.get('active') > 1))
		this.first('.plural').forEach(setProperty('ariaHidden', () => this.get('active') === 1))
		this.first('.remaining').forEach(setProperty('ariaHidden', () => !this.get('active')))
		this.first('.all-done').forEach(setProperty('ariaHidden', () => !!this.get('active')))
    }
}
TodoCount.define('todo-count')