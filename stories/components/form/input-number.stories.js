import { fn } from '@storybook/test';
import { InputNumber } from './input-number.html';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'form/input-number',
  tags: ['autodocs'],
  render: (args) => InputNumber(args),
  argTypes: {
    value: {
      defaultValue: { summary: '' },
    },
    disabled: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    readonly: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    required: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
  },
  args: {
    label: 'Number',
    id: 'id',
    name: 'name',
    value: '',
    disabled: false,
    readonly: false,
    required: false,
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
    value: '42',
  },
};

export const WithSpinbutton = {
  args: {
    min: '0',
    max: '100',
    step: '1',
  },
};

export const WithPrefix = {
  args: {
    label: 'Price',
    min: '0',
    step: '0.05',
    prefix: 'USD',
  },
};

export const WithSuffix = {
  args: {
    label: 'Width',
    min: '0',
    step: '1',
    suffix: 'px',
  },
};

export const WithDescription = {
  args: {
    description: 'Description',
  },
};

export const WithError = {
  args: {
    value: '-1',
    min: '0',
    error: 'Negative numbers are not allowed',
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};

export const Readonly = {
  args: {
    readonly: true,
  },
};

export const Required = {
  args: {
    required: true,
  },
};