import ColorGraph from './color-graph.html';

export default {
  title: 'colors/color-graph',
  tags: ['autodocs'],
  render: (args) => ColorGraph(args),
  argTypes: {
    color: {
      control: 'color',
      defaultValue: { summary: '#143dda' },
    },
  },
  args: {
    color: '#143dda',
  },
};

export const Default = {
  args: {},
};
