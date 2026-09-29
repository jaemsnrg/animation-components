import type { Preview } from '@storybook/react-vite';
import '../dist/tokens.css';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    options: { storySort: { order: ['Introduction', 'Foundations', 'Components'] } },
    backgrounds: { disabled: true },
  },
  globalTypes: {
    theme: {
      description: 'Colour theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      // Set on <html> so portalled content (menus, popovers) inherits the theme too.
      document.documentElement.dataset.theme = context.globals.theme;
      return <Story />;
    },
  ],
  tags: ['autodocs'],
};

export default preview;
