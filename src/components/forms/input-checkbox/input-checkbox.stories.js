import { fn } from '@storybook/test';
import InputCheckbox from './input-checkbox.html';

export default {
  title: 'forms/input-checkbox',
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
    className: '',
    onChange: fn()
  },
};

export const Unchecked = {
  args: {},
};

export const Checked = {
  args: {
    checked: true,
  },
};