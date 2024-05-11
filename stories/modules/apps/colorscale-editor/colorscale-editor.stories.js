import { fn } from '@storybook/test';
import ColorscaleEditor from './colorscale-editor.html';

export default {
  title: 'apps/colorscale-editor',
  tags: ['autodocs'],
  render: (args) => ColorscaleEditor(args),
  argTypes: {
    color: {
      control: 'color',
      defaultValue: { summary: '#143dda' },
    },
    size: {
      control: { type: 'select' },
      options: ['tiny', 'small', 'medium', 'large'],
      defaultValue: { summary: 'medium' },
    },
  },
  args: {
    color: '#143dda',
    name: 'Blue',
    size: 'medium',
    onClick: fn(),
  },
};

export const Tiny = {
  args: {
    size:'tiny',
  },
};

export const Small = {
  args: {
    size:'small',
  },
};

export const Medium = {
  args: {},
};

export const Large = {
  args: {
    size: 'large',
  },
};
