import { expect, fireEvent, fn, userEvent, within } from '@storybook/test';
import InputField from './input-field.html';

export default {
  title: 'inputs/input-field',
  tags: ['!autodocs'],
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
      if: { arg: 'type', eq: 'number' }
    },
    min: {
      control: { type: 'number' },
      defaultValue: { summary: 0 },
      if: { arg: 'type', eq: 'number' }
    },
    max: {
      control: { type: 'number' },
      if: { arg: 'type', eq: 'number' }
    },
    step: {
      control: { type: 'number' },
      defaultValue: { summary: 1 },
      if: { arg: 'type', eq: 'number' }
    },
    autocomplete: {
      control: { type: 'select' },
      options: [
        'on', 'off',
        'name', 'honorific-prefix', 'given-name', 'additional-name', 'family-name', 'honorific-suffix', 'nickname',
        'username', 'new-password', 'current-password', 'one-time-code',
        'organization-title', 'organization',
        'street-address', 'address-line1', 'address-line2', 'address-line3', 'address-level4', 'address-level3', 'address-level2', 'address-level1',
        'country', 'country-name', 'postal-code',
        'cc-name', 'cc-given-name', 'cc-additional-name', 'cc-family-name', 'cc-number', 'cc-exp', 'cc-exp-month', 'cc-exp-year', 'cc-csc', 'cc-type',
        'transaction-currency', 'transaction-amount',
        'language',
        'bday', 'bday-day', 'bday-month', 'bday-year',
        'sex',
        'url',
        'photo',
        'tel', 'tel-country-code', 'tel-national', 'tel-area-code', 'tel-local', 'tel-local-prefix', 'tel-local-suffix', 'tel-extension',
        'email',
        'impp',
        'webauthn'
      ],
      defaultValue: { summary: 'off' },
    },
    decrementLabel: {
      control: { type: 'text' },
      defaultValue: { summary: 'decrement' },
      if: { arg: 'type', eq: 'number' }
    },
    incrementLabel: {
      control: { type: 'text' },
      defaultValue: { summary: 'increment' },
      if: { arg: 'type', eq: 'number' }
    },
  },
  args: {
    label: 'Label',
    type: 'text',
    length: 'auto',
    id: 'id',
    name: 'name',
    value: '',
    autocomplete: 'off',
    form: '',
    pattern: '',
    prefix: '',
    suffix: '',
    error: '',
    description: '',
    disabled: false,
    readonly: false,
    required: false,
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
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await step('Initial state', async () => {
      await expect(input).toHaveValue(args.value);
      await expect(input).toHaveAccessibleName(args.label);
    });

    await step('Change value', async () => {
      await userEvent.type(input, 'New value');
      await expect(input).toHaveValue('New value');
    });

    await step('Clear value', async () => {
      await userEvent.clear(input);
      await expect(input).toHaveValue('');
    });
  }
};

export const Prefilled = {
  args: {
    id: 'prefilled',
    value: 'Value',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await step('Initial state', async () => {
      await expect(input).toHaveValue(args.value);
    });

    await step('Change value', async () => {
      await userEvent.type(input, ' user appended');
      await expect(input).toHaveValue(`${args.value} user appended`);
    });
  }
};

export const WithSpinbutton = {
  args: {
    label: 'Integer',
    type: 'number',
    length: 'short',
    id:  'spinbutton',
    value: 42,
    min: 0,
    max: 100,
    step: 1,
    decrementLabel: 'decrement',
    incrementLabel: 'increment',
    integer: true,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByText('', { selector: 'input-field' });
    const input = canvas.getByRole('spinbutton');
    const decrement = canvas.getByRole('button', { name: args.decrementLabel });
    const increment = canvas.getByRole('button', { name: args.incrementLabel });

    await step('Initial state', async () => {
      await expect(input).toHaveValue(args.value);
      await expect(decrement).toBeDefined();
      await expect(increment).toBeDefined();
      await expect(input).toBeValid();
    });

    await step('Change value', async () => {
      await userEvent.type(input, '1');
      await expect(input).toHaveValue(parseFloat(`${args.value}1`, 10));
      input.blur();
      await new Promise(requestAnimationFrame);
      await expect(input).toBeInvalid();
      await expect(input).toHaveAccessibleErrorMessage(input.validationMessage);
    });

    await step('Change value from outside', async () => {
      field.set('value', String(args.value));
      await new Promise(requestAnimationFrame);
      await expect(input).toHaveValue(args.value);
    });

    await step('Decrement value', async () => {
      await userEvent.click(decrement);
      await expect(input).toHaveValue(args.value - args.step);
    });

    await step('Decrement value with shift key pressed', async () => {
      const user = userEvent.setup();
      await user.keyboard('{Shift>}');
      await user.click(decrement);
      await user.keyboard('{/Shift}');
      await expect(input).toHaveValue(args.value - 11 * args.step);
    });

    await step('Increment value', async () => {
      await userEvent.click(increment);
      await expect(input).toHaveValue(args.value - 10 * args.step);
    });

    await step('Increment value with shift key pressed', async () => {
      const user = userEvent.setup();
      await user.keyboard('{Shift>}');
      await user.click(increment);
      await user.keyboard('{/Shift}');
      await expect(input).toHaveValue(args.value);
    });

    await step('Minimum value', async () => {
      await userEvent.clear(input);
      await userEvent.type(input, String(args.min));
      input.blur();
      await new Promise(requestAnimationFrame);
      await expect(decrement).toBeDisabled();
    });

    await step('Maximum value', async () => {
      await userEvent.clear(input);
      await userEvent.type(input, String(args.max));
      input.blur();
      await new Promise(requestAnimationFrame);
      await expect(increment).toBeDisabled();
    });
  }
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
    decrementLabel: 'decrement',
    incrementLabel: 'increment',
    prefix: 'USD',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const prefix = canvas.getByText(args.prefix);

    await step('Initial state', async () => {
      await expect(prefix).toBeVisible();
    });
  }
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
    decrementLabel: 'decrement',
    incrementLabel: 'increment',
    suffix: 'px',
    integer: true,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const suffix = canvas.getByText(args.suffix);

    await step('Initial state', async () => {
      await expect(suffix).toBeVisible();
    });
  }
};

export const Password = {
  args: {
    label: 'Password',
    type: 'password',
    id: 'password',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    // input type='password' has no role, see: https://github.com/w3c/aria/issues/935
    const input = canvas.getByText('', { selector: 'input' });

    await step('Initial state', async () => {
      await expect(input).toHaveAttribute('type', args.type);
    });
  }
};

export const WithDescription = {
  args: {
    description: 'Description',
    id: 'description',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByText('', { selector: 'input-field' });
    const input = canvas.getByRole('textbox');
    const description = canvas.getByText(args.description);

    await step('Initial state', async () => {
      await expect(description).toBeVisible();
      await expect(input).toHaveAccessibleDescription(args.description);
    });

    await step('Changed description from outside', async () => {
      field.set('description', 'Changed description');
      await new Promise(requestAnimationFrame);
      await expect(description).toHaveTextContent('Changed description');
    });
  }
};

export const Disabled = {
  args: {
    disabled: true,
    id: 'disabled',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await step('Initial state', async () => {
      await expect(input).toBeDisabled();
    });
  }
};

export const Readonly = {
  args: {
    readonly: true,
    id: 'readonly',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await step('Initial state', async () => {
      await expect(input).toHaveAttribute('readonly', '');
    });
  }
};

export const Required = {
  args: {
    required: true,
    id: 'required',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await step('Initial state', async () => {
      await expect(input).toBeRequired();
    });

    await step('Change value', async () => {
      await userEvent.type(input, 'New value');
      await expect(input).toHaveValue('New value');
      await expect(input).toBeValid();
    });

    await step('Clear value', async () => {
      await userEvent.clear(input);
      fireEvent(input, new Event('change', { bubbles: true }));
      await expect(input).toHaveValue('');
      input.blur();
      await new Promise(requestAnimationFrame);
      await expect(input).toBeInvalid();
      await expect(input).toHaveAccessibleErrorMessage(input.validationMessage);
    });
  }
};
