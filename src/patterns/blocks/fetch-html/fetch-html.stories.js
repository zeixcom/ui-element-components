import FetchHtml from "./fetch-html.html";

export default {
  title: 'blocks/fetch-html',
  render: (args) => FetchHtml(args),
  argTypes: {},
  args: {
    src: '/fetch-html/snippet.html',
  },
};

export const Base = {
  args: {},
};