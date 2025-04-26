import { html } from 'lit'

import InputRadiogroup from '../../../components/inputs/input-radiogroup/input-radiogroup.html'
import InputButton from '../../../components/inputs/input-button/input-button.html'

import './todo-app.css'
import './todo-app.ts'

export default ({}) => html`
<todo-app>
	<form action="#">
		<input-field>
			<label for="add-todo">What needs to be done?</label>
			<div class="row">
				<div class="group auto">
					<input id="add-todo" type="text" value="" required>
				</div>
			</div>
		</input-field>
		<input-button class="submit">
			<button type="submit" class="constructive" disabled>Add Todo</button>
		</input-button>
	</form>
	<ol filter="all"></ol>
	<template>
		<li>
			<input-checkbox class="todo">
				<label>
					<input type="checkbox" class="visually-hidden" />
					<span class="label"><slot></slot></span>
				</label>
			</input-checkbox>
			<input-button class="delete">
				<button type="button" class="destructive small">Delete</button>
			</input-button>
		</li>
	</template>
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