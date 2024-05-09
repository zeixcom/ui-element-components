import { fn } from '@storybook/test';
import InputButton from './input-button.html';

export default {
  title: 'forms/input-button',
  tags: ['autodocs'],
  render: (args) => InputButton(args),
  argTypes: {
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
    className: '',
    disabled: false,
    onClick: fn()
  },
};

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

export const Small = {
  args: {
    size: 'small',
  },
};

export const Large = {
  args: {
    size: 'large',
  },
};
