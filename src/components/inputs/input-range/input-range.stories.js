import { fn } from '@storybook/test';
import InputRange from './input-range.html';

export default {
  title: 'inputs/input-range',
  render: (args) => InputRange(args),
  argTypes: {
    id: {
      defaultValue: { summary: 'id' },
    },
    value: {
      defaultValue: { summary: '' },
    },
  },
  args: {
    label: 'Range',
    id: 'id',
    name: 'name',
    value: '',
    step: '',
    min: '',
    max: '',
    className: '',
    onChange: fn()
  },
};

export const Base = {
  args: {
    id: 'default',
  },
};
