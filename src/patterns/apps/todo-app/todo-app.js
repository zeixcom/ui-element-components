import { Capsula, setText, setProperty } from '@efflore/capsula'

class TodoApp extends Capsula {
    connectedCallback() {
		const [todoList, todoFilter] = ['todo-list', 'input-radiogroup']
			.map(selector => this.querySelector(selector))

		// Event listener on own element
        this.self.on('add-todo', e => todoList?.addItem(e.detail))
        
        // Coordinate todo-count
		this.first('todo-count').pass({
			active: () => todoList?.get('count').active
		})

        // Coordinate todo-list
        this.first('todo-list').pass({
			filter: () => todoFilter?.get('value')
		})

        // Coordinate .clear-completed button
        this.first('.clear-completed')
            .on('click', () => todoList?.clearCompleted())
            .pass({ disabled: () => !todoList?.get('count').completed })
    }
}
TodoApp.define('todo-app')

class TodoCount extends Capsula {
	static states = {
		active: 0
	}

	connectedCallback() {
		this.first('.count').sync(setText('active'))
		this.first('.singular').sync(setProperty('ariaHidden', () => this.get('active') > 1))
		this.first('.plural').sync(setProperty('ariaHidden', () => this.get('active') === 1))
		this.first('.remaining').sync(setProperty('ariaHidden', () => !this.get('active')))
		this.first('.all-done').sync(setProperty('ariaHidden', () => !!this.get('active')))
    }
}
TodoCount.define('todo-count')