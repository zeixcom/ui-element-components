// import { fn } from '@storybook/test';
import ColorScale from './color-scale.html';

export default {
  title: 'colors/color-scale',
  tags: ['autodocs'],
  render: (args) => ColorScale(args),
  argTypes: {
    color: {
      control: 'color',
      defaultValue: { summary: '#325df1' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      defaultValue: { summary: 'medium' },
    },
  },
  args: {
    color: '#325df1',
    size: 'medium',
  },
};

export const Medium = {
  args: {},
};

export const Small = {
  args: {
    size:'small',
  },
};

export const Large = {
  args: {
    size: 'large',
  },
};
