import { expect, fireEvent, userEvent, within } from '@storybook/test';
import InputField from './input-field.html';

export default {
  title: 'inputs/input-field',
  tags: ['!autodocs'],
  render: (args) => InputField(args),
  argTypes: {
    type: {
      type: { name: 'string', required: true },
      table: { category: 'input' },
      control: { type: 'select' },
      options: ['text', 'number', 'password', 'search', 'email', 'url', 'tel'],
      defaultValue: { summary: 'text' },
      description: 'Type of input field',
    },
    integer: {
      table: { category: 'input' },
      control: 'boolean',
      defaultValue: { summary: false },
      if: { arg: 'type', eq: 'number' },
      description: 'Whether the input field should only accept integer values',
    },
    id: {
      type: { name: 'string', required: true },
      table: { category: 'input' },
      defaultValue: { summary: 'id' },
      description: 'ID attribute of the input field',
    },
    name: {
      type: { name: 'string', required: true },
      table: { category: 'input' },
      description: 'Name attribute of the input field; will fall back to ID if not provided',
    },
    value: {
      table: { category: 'input' },
      defaultValue: { summary: '' },
      description: 'Value of the input field',
    },
    disabled: {
      table: { category: 'input' },
      control: 'boolean',
      defaultValue: { summary: false },
      description: 'Whether the input field is disabled',
    },
    readonly: {
      table: { category: 'input' },
      control: 'boolean',
      defaultValue: { summary: false },
      description: 'Whether the input field is readonly',
    },
    placeholder: {
      table: { category: 'input' },
      description: 'Placeholder text for the input field',
    },
    autocomplete: {
      table: { category: 'input' },
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
      description: 'The value of the autocomplete attribute',
    },
    required: {
      table: { category: 'validation' },
      control: 'boolean',
      defaultValue: { summary: false },
      if: { arg:'readonly', eq: false },
      description: 'Indicates that the input field is required',
    },
    minlength: {
      table: { category: 'validation' },
      control: { type: 'number' },
      defaultValue: { summary: 0 },
      description: 'The minimum number of characters allowed',
    },
    maxlength: {
      table: { category: 'validation' },
      control: { type: 'number' },
      description: 'The maximum number of characters allowed',
    },
    min: {
      table: { category: 'validation' },
      control: { type: 'number' },
      defaultValue: { summary: 0 },
      if: { arg: 'type', eq: 'number' },
      description: 'The minimum allowed value',
    },
    max: {
      table: { category: 'validation' },
      control: { type: 'number' },
      if: { arg: 'type', eq: 'number' },
      description: 'The maximum allowed value',
    },
    step: {
      table: { category: 'validation' },
      control: { type: 'number' },
      defaultValue: { summary: 1 },
      if: { arg: 'type', eq: 'number' },
      description: 'The granularity that the value must adhere to',
    },
    pattern: {
      table: { category: 'validation' },
      description: 'A regular expression that the input value must match',
    },
    validate: {
      table: { category: 'validation' },
      control: { type: 'text' },
      description: 'URL to server-side validation endpoint; GET request with the input field name and value as a query parameter; empty response is considered valid, otherwise it will setCustomValidity() to the response body',
    },
    label: {
      type: { name: 'string', required: true },
      table: { category: 'field' },
      control: { type: 'text' },
      description: 'The accessible name of the form field',
    },
    prefix: {
      table: { category: 'field' },
      description: 'Prefix to the input, e.g. a currency symbol',
    },
    suffix: {
      table: { category: 'field' },
      description: 'Suffix to the input, e.g. a unit of measurement',
    },
    error: {
      table: { category: 'field' },
      description: 'Error message for the form field linked to the input field with an aria-errormessage attribute',
    },
    description: {
      table: { category: 'field' },
      description: 'Helper text for the form field linked to the input field with an aria-describedby attribute',
    },
    remainingCount: {
      table: { category: 'field' },
      control: { type: 'text' },
      defaultValue: { summary: '${x} characters remaining' },
      if: { arg: 'maxlength' },
      description: 'Live-updating helper text indidating the number of remaining characters allowed',
    },
    className: {
      table: { category: 'field' },
      description: 'Class attribute on the custom element',
    },
    width: {
      table: { category: 'field' },
      control: { type: 'select' },
      options: ['short', 'auto'],
      defaultValue: { summary: 'auto' },
      description: 'Set the width of the input field, short (about 6 characters) or auto (available width)',
    },
    clearButton: {
      table: { category: 'field' },
      control: 'boolean',
      defaultValue: { summary: false },
      description: 'Add a clear button to the input field (if not empty)',
    },
    clearLabel: {
      table: { category: 'field' },
      control: { type: 'text' },
      defaultValue: { summary: 'Clear' },
      if: { arg: 'clearButton', eq: true },
      description: 'The accessible name of the clear button',
    },
    spinButton: {
      table: { category: 'field' },
      control: 'boolean',
      defaultValue: { summary: false },
      if: { arg: 'type', eq: 'number' },
      description: 'Add a spin button to the number input field to increment / decrement the value',
    },
    decrementLabel: {
      table: { category: 'field' },
      control: { type: 'text' },
      defaultValue: { summary: 'Decrement' },
      if: { arg: 'spinButton', eq: true },
      description: 'The accessible name of the decrement button',
    },
    incrementLabel: {
      table: { category: 'field' },
      control: { type: 'text' },
      defaultValue: { summary: 'Increment' },
      if: { arg: 'spinButton', eq: true },
      description: 'The accessible name of the increment button',
    },
  },
  args: {
    label: 'Label',
    type: 'text',
    width: 'auto',
    id: 'id',
    name: 'name',
    value: '',
    placeholder: '',
    disabled: false,
    readonly: false,
    required: false,
    minlength: '',
    maxlength: '',
    pattern: '',
    validate: '',
    clearButton: false,
    clearLabel: 'Clear',
    spinButton: false,
    decrementLabel: 'Decrement',
    incrementLabel: 'Increment',
    autocomplete: 'off',
    prefix: '',
    suffix: '',
    error: '',
    description: '',
    remainingCount: '${x} characters remaining',
    className: '',
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

export const WithClearButton = {
  args: {
    label: 'Text',
    id: 'clearbutton',
    value: '',
    clearButton: true,
    clearLabel: 'Clear',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await step('Initial state', async () => {
      await expect(input).toHaveValue(args.value);
    });

    await step('Change value', async () => {
      await userEvent.type(input, 'Some text');
      await expect(input).toHaveValue('Some text');
      await expect(canvas.getByRole('button', { name: args.clearLabel })).toBeVisible();
    });

    await step('Clear value', async () => {
      await userEvent.click(canvas.getByRole('button', { name: args.clearLabel }));
      await expect(input).toHaveValue('');
    });
  }
};

export const WithSpinButton = {
  args: {
    label: 'Integer',
    type: 'number',
    width: 'short',
    id:  'spinbutton',
    value: 42,
    integer: true,
    min: 0,
    max: 100,
    step: 1,
    spinButton: true,
    decrementLabel: 'Decrement',
    incrementLabel: 'Increment',
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
    width: 'short',
    id: 'prefix',
    value: '0',
    min: '0',
    step: '0.05',
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
    width: 'short',
    id: 'suffix',
    value: '16',
    min: '0',
    step: '1',
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

export const NewPassword = {
  args: {
    label: 'New password',
    type: 'password',
    id: 'new-password',
    value: '',
    autocomplete: 'new-password',
    minlength: 6,
    description: 'Minimum 6 characters',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByText('', { selector: 'input-field' });
    // input type='password' has no role, see: https://github.com/w3c/aria/issues/935
    const input = canvas.getByText('', { selector: 'input' });
    const description = canvas.getByText(args.description);

    await step('Initial state', async () => {
      await expect(input).toHaveAttribute('autocomplete', `${args.autocomplete}`);
      await expect(input).toHaveAttribute('minlength', `${args.minlength}`);
      await expect(description).toBeVisible();
      await expect(input).toHaveAccessibleDescription(args.description);
    });

    /**
     * The following tests cannot performed programmatically, because checkValidity() only returns false after a user input.
     * See: https://stackoverflow.com/questions/66896018/html-input-checkvalidity-always-returns-true-even-with-minlength-violations
     *
    await step('Too short password', async () => {
      await userEvent.type(input, 'pass');
      await userEvent.tab();
      await new Promise(requestAnimationFrame);
      await expect(input).toBeInvalid();
      await expect(input).toHaveAccessibleErrorMessage(input.validationMessage);
    });

    await step('Valid password', async () => {
      await userEvent.clear(input);
      await userEvent.type(input, 'password');
      await userEvent.tab();
      await new Promise(requestAnimationFrame);
      await expect(input).toBeValid();
    }); */

    await step('Changed description from outside', async () => {
      field.set('description', 'Changed description');
      await new Promise(requestAnimationFrame);
      await expect(description).toHaveTextContent('Changed description');
    });
  }
};

export const RemainingCharacters = {
  args: {
    label: 'Pseudonym',
    type: 'text',
    id:'remaining-characters',
    value: '',
    maxlength: 20,
    description: 'Maximum 20 characters',
    remainingCount: '${x} characters remaining',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByText('', { selector: 'input-field' });
    const input = canvas.getByText('', { selector: 'input' });
    const description = canvas.getByText(args.description);

    await step('Initial state', async () => {
      await expect(input).toHaveAttribute('maxlength', `${args.maxlength}`);
      await expect(description).toBeVisible();
      await expect(input).toHaveAccessibleDescription(args.description);
    });

    await step('Changed description from inside', async () => {
      await userEvent.type(input, 'avatar2024');
      await new Promise(requestAnimationFrame);
      await expect(input).toHaveAccessibleDescription(args.remainingCount.replace(/\${x}/, args.maxlength - 10));
    });
  },
}

export const Disabled = {
  args: {
    disabled: true,
    id: 'disabled',
    value: 'Disabled value',
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
    value: 'Read-only value',
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

export const ServerValidation = {
  args: {
    label: 'Username',
    id: 'server-validation',
    validate: '/input-field/validate.html',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await step('Initial state', async () => {
      await expect(input).toBeValid();
    });

    await step('Trigger server-side validation', async () => {
      await userEvent.type(input, 'avatar2024');
      await userEvent.tab();
      await new Promise(requestAnimationFrame);
      await expect(input).toHaveValue('avatar2024');
      await expect(input).toBeInvalid();
      await expect(input).toHaveAccessibleErrorMessage('Error from server-side validation: Username already taken');
    });
  }
}