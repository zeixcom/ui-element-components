import { fn } from '@storybook/test';
import InputField from './input-field.html';

export default {
  title: 'forms/input-field',
  render: (args) => InputField(args),
  argTypes: {
    type: {
      control: { type:'select' },
      options: ['text', 'number', 'password'],
      defaultValue: { summary: 'text' },
    },
    length: {
      control: { type: 'select' },
      options: ['short', 'auto'],
      defaultValue: { summary: 'auto' },
    },
    id: {
      defaultValue: { summary: 'id' },
    },
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
  },
  args: {
    label: 'Label',
    type: 'text',
    length: 'auto',
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
  args: {
    label: 'Text',
    id: 'empty',
  },
};

export const Prefilled = {
  args: {
    value: 'Value',
    id: 'prefilled',
  },
};

export const WithSpinbutton = {
  args: {
    label: 'Integer',
    type: 'number',
    length: 'short',
    id:  'spinbutton',
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
    type: 'number',
    length: 'short',
    id: 'prefix',
    value: '0',
    min: '0',
    step: '0.05',
    prefix: 'USD',
  },
};

export const WithSuffix = {
  args: {
    label: 'Width',
    type: 'number',
    length: 'short',
    id: 'suffix',
    value: '16',
    min: '0',
    step: '1',
    suffix: 'px',
    integer: true,
  },
};

export const Password = {
  args: {
    label: 'Password',
    type: 'password',
    id: 'password',
  },
};

export const WithDescription = {
  args: {
    description: 'Description',
    id: 'description',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    id: 'disabled',
  },
};

export const Readonly = {
  args: {
    readonly: true,
    id: 'readonly',
  },
};

export const Required = {
  args: {
    required: true,
    id: 'required',
  },
};
