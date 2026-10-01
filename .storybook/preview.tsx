import type { Preview } from '@storybook/react-vite';
// Storybook previews one design system at a time: the two imports below pick which. (Stories for other
// systems are discovered automatically; point these at that system to preview it.)
import '../design-systems/minimal/dist/tokens.css';
import '../design-systems/minimal/src/styles/globals.css';

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
