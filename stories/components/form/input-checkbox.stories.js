import { fn } from '@storybook/test';
import { InputCheckbox } from './input-checkbox';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'form/input-checkbox',
  tags: ['autodocs'],
  render: (args) => InputCheckbox(args),
  argTypes: {
    checked: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
  },
  args: {
    label: 'Checkbox',
    checked: false,
    onChange: fn()
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Unchecked = {
  args: {},
};

export const Checked = {
  args: {
    checked: true,
  },
};