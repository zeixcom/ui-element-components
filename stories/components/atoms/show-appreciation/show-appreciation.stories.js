import { fn } from '@storybook/test';
import ShowAppreciation from './show-appreciation.html';

export default {
  title: 'atoms/show-appreciation',
  render: (args) => ShowAppreciation(args),
  argTypes: {
    emoji: {
      defaultValue: { summary: '💐' },
    },
    count: {
      defaultValue: { summary: '0' },
    },
  },
  args: {
    emoji: '💐',
    count: 0,
    onClick: fn()
  },
};

export const Default = {
  args: {},
};
