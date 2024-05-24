import DocsPage from './docs-page.html';
import * as PageHeaderStories from '../../modules/sections/page-header/page-header.stories';

export default {
  title: 'pages/docs-page',
  render: (args) => DocsPage(args),
};

export const LoggedIn = {
  args: {
    ...PageHeaderStories.LoggedIn.args,
  },
};

export const LoggedOut = {
  args: {
    ...PageHeaderStories.LoggedOut.args,
  },
};
