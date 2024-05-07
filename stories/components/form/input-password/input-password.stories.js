import { fn } from '@storybook/test';
import InputPassword from './input-password.html';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'form/input-password',
  tags: ['autodocs'],
  render: (args) => InputPassword(args),
  argTypes: {},
  args: {
    label: 'Password',
    id: 'id',
    name: 'name',
    onInput: fn(),
    onChange: fn(),
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Empty = {
  args: {},
};
