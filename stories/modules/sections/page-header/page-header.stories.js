import { fn } from '@storybook/test';
import PageHeader from './page-header.html';

export default {
  title: 'sections/page-header',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/web-components/vue/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args) => PageHeader(args),
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
};
export const LoggedIn = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut = {};
