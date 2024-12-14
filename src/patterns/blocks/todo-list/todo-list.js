import { Capsula, setAttribute } from '@efflore/capsula'

class TodoList extends Capsula {
	static states = {
		filter: 'all',
	}

    connectedCallback() {

		// Set computed states
		this.set('tasks', () => Array.from(this.querySelectorAll('input-checkbox')))
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

		// Event listener and attribute on own element
        this.self
            .on('click', e => {
                if (e.target.localName === 'button') this.removeItem(e.target)
            })
            .sync(setAttribute('filter'))
    }

    addItem = task => {
        const template = this.querySelector('template').content.cloneNode(true)
        template.querySelector('span').textContent = task
        this.querySelector('ol').appendChild(template)
    }

    removeItem = element => {
        element.closest('li').remove()
    }

    clearCompleted = () => {
        this.get('tasks')
            .filter(el => el.get('checked'))
            .forEach(el => el.parentElement.remove())
    }
}
TodoList.define('todo-list')