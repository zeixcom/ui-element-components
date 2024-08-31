import { fn, expect, within, userEvent } from '@storybook/test'

import InputButton from './input-button.html'

export default {
	title: 'inputs/input-button',
	render: InputButton,
	argTypes: {
		disabled: {
			control: 'boolean',
			defaultValue: { summary: false },
		},
		type: {
			control: { type: 'select' },
			options: ['button', 'submit', 'reset'],
			defaultValue: { summary: 'button' },
		},
		variant: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'destructive', 'constructive'],
			defaultValue: { summary: 'secondary' },
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			defaultValue: { summary: 'medium' },
		},
	},
	args: {
		label: 'Button',
		type: 'button',
		variant: 'secondary',
		size: 'medium',
		disabled: false,
		className: '',
		onClick: fn()
	},
}

export const Primary = {
	args: {
		variant: 'primary',
	},
	play: async ({ args, canvasElement, step }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button')
		const inputButton = canvas.getByText('', { selector: 'input-button' })

		await step('Initial state', async () => {
			await expect(button).toHaveClass(args.variant)
			await expect(button).toHaveClass(args.size)
			await expect(button).not.toBeDisabled()
			await expect(button).toHaveAccessibleName(args.label)
		})

		await step('Click on button', async () => {
			await userEvent.click(button)
			await expect(args.onClick).toHaveBeenCalled()
		})

		await step('Change disabled state', async () => {
			inputButton.setAttribute('disabled', true)
			await new Promise(requestAnimationFrame)
			await expect(button).toBeDisabled()
			inputButton.removeAttribute('disabled')
			await new Promise(requestAnimationFrame)
			await expect(button).not.toBeDisabled()
			inputButton.set('disabled', true)
			await new Promise(requestAnimationFrame)
			await expect(button).toBeDisabled()
			inputButton.set('disabled', false)
			await new Promise(requestAnimationFrame)
			await expect(button).not.toBeDisabled()
		})

		await step('Change label', async () => {
			inputButton.set('label', 'New Label')
			await new Promise(requestAnimationFrame)
			await expect(button).toHaveAccessibleName('New Label')
			inputButton.set('label', undefined)
			await new Promise(requestAnimationFrame)
			await expect(button).toHaveAccessibleName(args.label)
		})
	}
}

export const Secondary = {
	args: {},
}

export const Destructive = {
	args: {
		variant: 'destructive',
	},
}

export const Constructive = {
	args: {
		variant:'constructive',
	},
}

export const Disabled = {
	args: {
		disabled: true,
	},
}

export const Small = {
	args: {
		size: 'small',
	},
}

export const Large = {
	args: {
		size: 'large',
	},
}
