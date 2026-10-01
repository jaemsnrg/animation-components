import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Stories live with their design system: design-systems/<name>/stories.
const SYSTEM = /design-systems\/([^/]+)\//;

/** Resolves "@/x" to the src/ of the design system that the importing file belongs to. */
const perSystemAlias = () => ({
  name: 'per-system-at-alias',
  enforce: 'pre',
  async resolve(source, importer, options) {
    if (!source.startsWith('@/') || !importer) return null;
    const system = importer.replace(/\\/g, '/').match(SYSTEM)?.[1];
    if (!system) return null;
    return this.resolve(path.join(root, 'design-systems', system, 'src', source.slice(2)), importer, { ...options, skipSelf: true });
  },
});

/** @type {import('@storybook/react-vite').StorybookConfig} */
export default {
  stories: [
    '../design-systems/*/stories/**/*.mdx',
    '../design-systems/*/stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  viteFinal: (config) => {
    config.plugins = [...(config.plugins ?? []), perSystemAlias(), tailwindcss()];
    return config;
  },
};
