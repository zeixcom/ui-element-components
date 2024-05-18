import ColorDetails from './color-details.html';

export default {
  title: 'colors/color-details',
  render: (args) => ColorDetails(args),
  argTypes: {
    color: {
      control: 'color',
      defaultValue: { summary: '#143dda' },
    },
  },
  args: {
    color: '#143dda',
    name: 'Blue',
  },
};

export const Default = {
  args: {},
};
