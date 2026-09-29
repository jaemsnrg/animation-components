import preview from '../../components/IconButton/preview.html?raw';
import readme from '../../components/IconButton/README.md?raw';
import { fromPreview } from '../lib.js';

export default {
  title: 'Components/IconButton',
  parameters: { docs: { description: { component: readme } } },
};

/** Every variant and state, as shown in the component's preview card. */
export const Overview = { render: () => fromPreview(preview) };

/** Interactive: pick a variant and state. */
export const Playground = {
  args: { variant: 'default', disabled: false },
  argTypes: { variant: { control: 'inline-radio', options: ['default', 'sm', 'primary', 'plain'] } },
  render: ({ variant, disabled }) =>
    `<div class="cx" style="padding:24px"><button class="cx-icon-btn${variant === 'default' ? '' : ` cx-icon-btn--${variant}`}" aria-label="Add"${disabled ? ' disabled' : ''}><svg class="cx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button></div>`,
};
