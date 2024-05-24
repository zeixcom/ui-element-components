import { expect, fn, userEvent, within } from '@storybook/test';
import ShowAppreciation from './show-appreciation.html';

export default {
  title: 'atoms/show-appreciation',
  render: (args) => ShowAppreciation(args),
  argTypes: {
    emoji: {
      defaultValue: { summary: '💐' },
    },
    count: {
      defaultValue: { summary: '0' },
    },
  },
  args: {
    emoji: '💐',
    count: 0,
    onClick: fn()
  },
};

export const Default = {
  args: {},
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await step('Initial state', async () => {
      await expect(button).toHaveTextContent(`${args.emoji} ${args.count}`);
    });

    await step('Click on button', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalled();
      await new Promise(requestAnimationFrame);
      expect(button).toHaveTextContent(`${args.emoji} ${args.count + 1}`);
    });
  },
};
