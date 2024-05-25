import { expect, fn, userEvent, within } from '@storybook/test';
import ColorSlider from './color-slider.html';

export default {
  title: 'colors/color-slider',
  render: (args) => ColorSlider(args),
  argTypes: {
    label: {
      control: { type: 'text' },
      defaultValue: { summary: 'Hue' },
    },
    color: {
      control: 'color',
      defaultValue: { summary: '#143dda' },
    },
    axis: {
      control: { type: 'select' },
      options: ['l', 'c', 'h'],
      defaultValue: { summary: 'h' },
    },
    min: {
      control: { type: 'number' },
      defaultValue: { summary: 0 },
    },
    max: {
      control: { type: 'number' },
      defaultValue: { summary: 360 },
    },
  },
  args: {
    label: 'Hue',
    color: '#143dda',
    axis: 'h',
    min: 0,
    max: 360,
    onPointerDown: fn(),
    onKeyDown: fn(),
  },
};

export const Lightness = {
  args: {
    label: 'Lightness',
    axis: 'l',
    max: 100,
  },
};

export const Chroma = {
  args: {
    label: 'Chroma',
    axis: 'c',
    max: 0.4,
  },
};

export const Hue = {
  args: {
    label: 'Hue',
    axis: 'h',
    max: 360,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const thumb = canvas.getByRole('slider');

    await step('Initial state', async () => {
      await expect(thumb).toHaveTextContent('');
    });

    /* await step('Click on button', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalled();
      await new Promise(requestAnimationFrame);
      expect(button).toHaveTextContent(`${args.emoji} ${args.count + 1}`);
    }); */
  },
};