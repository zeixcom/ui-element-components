import { DocsPage } from './docs-page.html';
import * as PageHeaderStories from '../../modules/sections/page-header/page-header.stories';

export default {
  title: 'docs/docs-page',
  render: (args) => DocsPage(args),
};

export const LoggedIn = {
  args: {
    // More on composing args: https://storybook.js.org/docs/writing-stories/args#args-composition
    ...PageHeaderStories.LoggedIn.args,
  },
};

export const LoggedOut = {
  args: {
    ...PageHeaderStories.LoggedOut.args,
  },
};
