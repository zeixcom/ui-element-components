import { fn } from '@storybook/test';
import InputText from './input-text.html';

export default {
  title: 'forms/input-text',
  tags: ['autodocs'],
  render: (args) => InputText(args),
  argTypes: {
    value: {
      defaultValue: { summary: '' },
    }
  },
  args: {
    label: 'Text',
    id: 'id',
    name: 'name',
    value: '',
    className: '',
    onInput: fn(),
    onChange: fn(),
  },
};

export const Empty = {
  args: {},
};

export const Prefilled = {
  args: {
    value: 'Value',
  },
};
