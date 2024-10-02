import { UIElement, on, setAttribute } from '@efflore/ui-element'

class TodoList extends UIElement {
    connectedCallback() {
        this.set('filter', 'all') // set initial filter
		this.#updateList()

		// event listener and attribute on own element
        this.self
            .map(on('click', e => {
                if (e.target.localName === 'button') this.removeItem(e.target)
            }))
            .map(setAttribute('filter'))

        // update count on each change
        this.set('count', () => {
            const tasks = this.get('tasks').map(el => el.signal('checked'))
            const completed = tasks.filter(fn => fn()).length
            const total = tasks.length
            return {
				active: total - completed,
				completed,
				total
			}
        })
    }

    addItem = task => {
        const template = this.querySelector('template').content.cloneNode(true)
        template.querySelector('span').textContent = task
        this.querySelector('ol').appendChild(template)
        this.#updateList()
    }

    removeItem = element => {
        element.closest('li').remove()
        this.#updateList()
    }

    clearCompleted = () => {
        this.get('tasks')
            .filter(el => el.get('checked'))
            .forEach(el => el.parentElement.remove())
        this.#updateList()
    }

	#updateList() {
        this.set('tasks', Array.from(this.querySelectorAll('input-checkbox')))
    }

}
TodoList.define('todo-list')