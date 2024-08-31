import { expect, fn, userEvent, within } from '@storybook/test'

import ShowAppreciation from './show-appreciation.html'

export default {
	title: 'atoms/show-appreciation',
	render: ShowAppreciation,
	argTypes: {
		label: {
			defaultValue: { summary: 'Appreciation' },
		},
		emoji: {
			defaultValue: { summary: '💐' },
		},
		count: {
			defaultValue: { summary: '0' },
		},
	},
	args: {
		label: 'Appreciation',
		emoji: '💐',
		count: 0,
		onClick: fn()
	},
}

export const ZeroValue = {
	args: {},
	play: async ({ args, canvasElement, step }) => {
		const canvas = within(canvasElement)
		const el = canvas.getByLabelText(args.label)
		const button = canvas.getByRole('button')

		await step('Initial state', async () => {
			await expect(button).toHaveTextContent(`${args.emoji} ${args.count}`)
			await expect(el).toHaveAccessibleName(args.label)
			await expect(el.count, 'count property').toBe(args.count)
		});

		await step('Click on button', async () => {
			await userEvent.click(button)
			await expect(args.onClick).toHaveBeenCalled()
			await new Promise(requestAnimationFrame)
			expect(button).toHaveTextContent(`${args.emoji} ${args.count + 1}`)
			await expect(el.count, 'count property').toBe(args.count + 1)
		})
	},
}

export const PresetValue = {
	args: {
		count: 5,
	},
	play: async ({ args, canvasElement, step }) => {
		const canvas = within(canvasElement)
		const el = canvas.getByLabelText(args.label)
		const button = canvas.getByRole('button')

		await step('Initial state with preset value', async () => {
			await expect(button).toHaveTextContent(`${args.emoji} ${args.count}`)
			await expect(el).toHaveAccessibleName(args.label)
			await expect(el.count, 'count property').toBe(args.count)
		})
	},
}