import { fn } from '@storybook/test';
import ModalDialog from './modal-dialog.html';

export default {
  title: 'popups/modal-dialog',
  tags: ['autodocs'],
  render: (args) => ModalDialog(args),
  argTypes: {},
  args: {
    title: 'Dialog Title',
    onClick: fn(),
  },
};

export const Default = {
  args: {},
};