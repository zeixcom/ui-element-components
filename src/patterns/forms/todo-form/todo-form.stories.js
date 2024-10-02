import TodoForm from './todo-form.html'

export default {
	title: 'forms/todo-form',
    render: TodoForm,
    args: {
		onSubmit: () => console.log('Submitting new todo'),
	},
}

export const Base = {}