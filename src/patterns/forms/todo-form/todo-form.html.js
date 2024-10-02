import { html } from 'lit'

import InputField from '../../../components/inputs/input-field/input-field.html.js'
import InputButton from '../../../components/inputs/input-button/input-button.html.js'

import './todo-form.css'
import './todo-form.js'

export default ({ onSubmit }) => html`
<todo-form>
	<form @sumbit=${onSubmit}>
	    ${InputField({
			type: 'text',
			id: 'new-todo',
			name: 'new-todo',
			label: 'What needs to be done?',
			required: true,
		})}
		${InputButton({
			type: 'submit',
			label: 'Add task',
			variant: 'primary',
			disabled: true,
		})}
	</form>
</todo-form>`