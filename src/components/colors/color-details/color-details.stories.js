import { expect, fn, userEvent, within } from '@storybook/test'

import ColorDetails from './color-details.html'

export default {
	title: 'colors/color-details',
	render: ColorDetails,
	argTypes: {
		color: {
			control: 'color',
			defaultValue: { summary: '#143dda' },
		},
		open: {
			control: { type: 'boolean' },
			defaultValue: { summary: false },
		}
	},
	args: {
		color: '#143dda',
		name: 'Blue',
		open: false,
		onClick: fn()
	},
}

export const Closed = {
	args: {},
	play: async ({ args, canvasElement, step }) => {
		const canvas = within(canvasElement);
		const details = canvas.getByRole('group');
		const summary = canvas.getByText('', { selector: 'summary' });

		await step('Initial state', async () => {
			await expect(summary).toHaveTextContent(`${args.name} ${args.color}`);
			expect(details).not.toHaveAttribute('open', '');
		});

		await step('Click on summary', async () => {
			await userEvent.click(summary);
			await expect(args.onClick).toHaveBeenCalled();
			expect(details).toHaveAttribute('open', '');
		});

		await step('Click on summary again', async () => {
			await userEvent.click(summary);
			await expect(args.onClick).toHaveBeenCalled();
			expect(details).not.toHaveAttribute('open', '');
		});
	},
}

export const Open = {
	args: { open: true },
	play: async ({ args, canvasElement, step }) => {
		const canvas = within(canvasElement);
		const details = canvas.getByRole('group');
		const summary = canvas.getByText('', { selector: 'summary' });

		await step('Initial state', async () => {
			await expect(summary).toHaveTextContent(`${args.name} ${args.color}`);
			expect(details).toHaveAttribute('open', '');
		});

		await step('Click on summary', async () => {
			await userEvent.click(summary);
			await expect(args.onClick).toHaveBeenCalled();
			expect(details).not.toHaveAttribute('open', '');
		});

		await step('Click on summary again', async () => {
			await userEvent.click(summary);
			await expect(args.onClick).toHaveBeenCalled();
			expect(details).toHaveAttribute('open', '');
		});
	},
}
