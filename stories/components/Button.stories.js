import preview from '../../components/Button/preview.html?raw';
import readme from '../../components/Button/README.md?raw';
import { fromPreview } from '../lib.js';

export default {
  title: 'Components/Button',
  parameters: { docs: { description: { component: readme } } },
};

/** Every variant and state, as shown in the component's preview card. */
export const Overview = { render: () => fromPreview(preview) };

/** Interactive: pick a variant, size and state. */
export const Playground = {
  args: { label: 'Sign up', variant: 'primary', size: 'default', disabled: false, block: false },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'ghost'] },
    size: { control: 'inline-radio', options: ['default', 'sm'] },
  },
  render: ({ label, variant, size, disabled, block }) =>
    `<div class="cx" style="padding:24px"><button class="cx-btn cx-btn--${variant}${size === 'sm' ? ' cx-btn--sm' : ''}${block ? ' cx-btn--block' : ''}"${disabled ? ' disabled' : ''}>${label}</button></div>`,
};
