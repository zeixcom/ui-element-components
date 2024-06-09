import DynamicBackground from './dynamic-background.html';

export default {
  title: 'atoms/dynamic-background',
  render: (args) => DynamicBackground(args),
  argTypes: {
    content: {
      control: { type: 'text' },
      defaultValue: { summary: 'Lorem ipsum' },
    }
  },
  args: {
    color: '#143dda',
    content: 'Lorem ipsum',
  },
};

export const Base = {
};