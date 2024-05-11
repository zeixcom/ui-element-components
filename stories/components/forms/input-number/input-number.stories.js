import { fn } from '@storybook/test';
import InputNumber from './input-number.html';

export default {
  title: 'forms/input-number',
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
    integer: {
      control: 'boolean',
      defaultValue: { summary: false },
    },
    length: {
      control: { type: 'select' },
      options: ['short', 'auto'],
      defaultValue: { summary: 'short' },
    },
  },
  args: {
    label: 'Number',
    length: 'short',
    id: 'id',
    name: 'name',
    value: '',
    step: '',
    min: '',
    max: '',
    form: '',
    pattern: '',
    prefix: '',
    suffix: '',
    error: '',
    description: '',
    disabled: false,
    readonly: false,
    required: false,
    integer: false,
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
    value: '42',
  },
};

export const WithSpinbutton = {
  args: {
    value: '42',
    min: '0',
    max: '100',
    step: '1',
    integer: true,
  },
};

export const WithPrefix = {
  args: {
    label: 'Price',
    value: '0',
    min: '0',
    step: '0.05',
    prefix: 'USD',
  },
};

export const WithSuffix = {
  args: {
    label: 'Width',
    value: '16',
    min: '0',
    step: '1',
    suffix: 'px',
    integer: true,
  },
};

export const WithDescription = {
  args: {
    description: 'Description',
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