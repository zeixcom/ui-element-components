import { fn, expect, within, userEvent } from '@storybook/test'
import { type Component } from '@zeix/ui-element';

import InputCheckbox from './input-checkbox.html'
import { InputCheckboxProps } from './input-checkbox';

export default {
	title: 'inputs/input-checkbox',
	render: InputCheckbox,
	argTypes: {
		checked: {
			control: 'boolean',
			defaultValue: { summary: false },
		},
	},
	args: {
		label: 'Checkbox',
		checked: false,
		className: '',
		onChange: fn()
	},
}

export const Unchecked = {
	args: {},
	play: async ({ args, canvasElement, step }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole('checkbox')
		const inputCheckbox = canvas.getByText<Component<InputCheckboxProps>>('', { selector: 'input-checkbox' })

		await step('Initial state', async () => {
			await expect(checkbox).not.toBeChecked()
			await expect(checkbox).toHaveAccessibleName(args.label)
		})

		await step('Click on checkbox', async () => {
			await userEvent.click(checkbox)
			await expect(args.onChange).toHaveBeenCalled()
			await userEvent.click(checkbox)
			await expect(args.onChange).toHaveBeenCalledTimes(2)
		})

		await step('Change checked state', async () => {
			inputCheckbox.toggleAttribute('checked', true)
			await new Promise(requestAnimationFrame)
			await expect(checkbox).toBeChecked()
			inputCheckbox.toggleAttribute('checked', false)
			await new Promise(requestAnimationFrame)
			await expect(checkbox).not.toBeChecked()
			inputCheckbox.checked = true
			await new Promise(requestAnimationFrame)
			await expect(checkbox).toBeChecked()
			inputCheckbox.checked = false
			await new Promise(requestAnimationFrame)
			await expect(checkbox).not.toBeChecked()
		})
	}
}

export const Checked = {
	args: {
		checked: true,
	},
}

export const Todo = {
	args: {
        className: 'todo',
    },
}

export const Done = {
	args: {
        checked: true,
        className: 'todo',
    },
}