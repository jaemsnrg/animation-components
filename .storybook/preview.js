import '../dist/tokens.css';
import '../components/bundle.css';
import './tailwind.css';

/** @type {import('@storybook/html-vite').Preview} */
export default {
  parameters: {
    layout: 'fullscreen',
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
    (story, context) => {
      const wrap = document.createElement('div');
      wrap.dataset.theme = context.globals.theme;
      wrap.className = 'cx';
      wrap.style.cssText = `background:var(--bg-primary);color:var(--text-primary);${context.viewMode === 'story' ? 'min-height:100vh;' : ''}`;
      const out = story();
      if (typeof out === 'string') wrap.innerHTML = out;
      else wrap.append(out);
      return wrap;
    },
  ],
  tags: ['autodocs'],
};
