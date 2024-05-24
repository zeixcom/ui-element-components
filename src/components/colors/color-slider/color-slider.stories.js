import ColorSlider from './color-slider.html';

export default {
  title: 'colors/color-slider',
  render: (args) => ColorSlider(args),
  argTypes: {
    color: {
      control: 'color',
      defaultValue: { summary: '#143dda' },
    },
    axis: {
      control: { type:'select' },
      options: ['lightness', 'chroma', 'hue'],
      defaultValue: { summary: 'hue' },
    },
  },
  args: {
    color: '#143dda',
    axis: 'hue',
  },
};

export const Hue = {
  args: {
    axis: 'hue',
  },
};
