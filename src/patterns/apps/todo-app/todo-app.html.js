import { html } from 'lit'

import TodoForm from '../../forms/todo-form/todo-form.html'
import TodoList from '../../blocks/todo-list/todo-list.html'
import InputRadiogroup from '../../../components/inputs/input-radiogroup/input-radiogroup.html'
import InputButton from '../../../components/inputs/input-button/input-button.html'

import './todo-app.css'
import './todo-app.js'

export default ({}) => html`
<todo-app>
	${TodoForm({})}
	${TodoList({})}
	<footer>
        <todo-count>
			<p class="all-done">Well done, all done!</p>
			<p class="remaining">
				<span class="count"></span>
				<span class="singular">task</span>
				<span class="plural">tasks</span>
				left
			</p>
		</todo-count>
		${InputRadiogroup({
			legend: 'Filter',
			legendHidden: true,
            className: 'split-button',
            name: 'filter',
            options: [
                { value: 'all', label: 'All' },
                { value: 'active', label: 'Active' },
                { value: 'completed', label: 'Completed' },
            ],
            selected: 'all',
		})}
		${InputButton({
			type: 'button',
            label: 'Clear completed',
            className: 'clear-completed',
            disabled: true,
		})}
	</footer>
</todo-app>`