import { fn } from '@storybook/test';
import { InputText } from './input-text.html';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'form/input-text',
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
    onInput: fn(),
    onChange: fn(),
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Empty = {
  args: {},
};

export const Prefilled = {
  args: {
    value: 'Value',
  },
};
