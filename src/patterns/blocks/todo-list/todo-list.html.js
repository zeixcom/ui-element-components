import { html } from 'lit'

// we need to import the required modules manually
import './../../../components/inputs/input-checkbox/input-checkbox.css'
import './../../../components/inputs/input-checkbox/input-checkbox.js'
import './../../../components/inputs/input-button/input-button.css'

import './todo-list.css'
import './todo-list.js'

export default ({}) => html`
<todo-list>
    <ol></ol>
	<template>
		<li>
		    <input-checkbox class="todo">
				<label>
					<input type="checkbox" class="visually-hidden" />
					<span></span>
				</label>
			</input-checkbox>
			<input-button>
				<button type="button">Delete</button>
			</input-button>
		</li>
	</template>
</todo-list>`