/** @type { import('@storybook/web-components').Preview } */

import '/src/assets/css/global.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs']
};

export default preview;
