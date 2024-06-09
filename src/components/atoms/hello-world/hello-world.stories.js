import HelloWorld from './hello-world.html';

export default {
  title: 'atoms/hello-world',
  render: (args) => HelloWorld(args),
  argTypes: {
    greeting: {
      control: { type: 'text' },
      defaultValue: { summary: 'Hello' },
    },
    name: {
      control: { type: 'text' },
      defaultValue: { summary: 'World' },
    },
  },
  args: {
    greeting: 'Hello',
    name: 'World',
  },
}

export const Base = {
};