import { fn } from '@storybook/test';
import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'form/input-button',
  tags: ['autodocs'],
  render: (args) => Button(args),
  argTypes: {
    /* backgroundColor: { control: 'color' }, */
    disabled: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'success'],
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
    variant: 'secondary',
    size: 'medium',
    disabled: false,
    onClick: fn()
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    variant: 'primary',
  },
};

export const Secondary = {
  args: {},
};

export const Disabled = {
  args: {
    disabled: true,
  },
};

export const Large = {
  args: {
    size: 'large',
  },
};

export const Small = {
  args: {
    size: 'small',
  },
};
