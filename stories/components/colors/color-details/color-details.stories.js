// import { fn } from '@storybook/test';
import ColorDetails from './color-details.html';

export default {
  title: 'colors/color-details',
  tags: ['autodocs'],
  render: (args) => ColorDetails(args),
  argTypes: {
    color: {
      control: 'color',
      defaultValue: { summary: '#325df1' },
    },
  },
  args: {
    color: '#325df1',
    name: 'Blue',
  },
};

export const Default = {
  args: {},
};
