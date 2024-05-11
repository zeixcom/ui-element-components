import { fn } from '@storybook/test';
import InputPassword from './input-password.html';

export default {
  title: 'forms/input-password',
  tags: ['autodocs'],
  render: (args) => InputPassword(args),
  argTypes: {},
  args: {
    label: 'Password',
    id: 'id',
    name: 'name',
    className: '',
    onInput: fn(),
    onChange: fn(),
  },
};

export const Empty = {
  args: {},
};
