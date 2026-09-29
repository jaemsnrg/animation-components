import preview from '../../components/CountBadge/preview.html?raw';
import readme from '../../components/CountBadge/README.md?raw';
import { fromPreview } from '../lib.js';

export default {
  title: 'Components/CountBadge',
  parameters: { docs: { description: { component: readme } } },
};

/** Every variant and state, as shown in the component's preview card. */
export const Overview = { render: () => fromPreview(preview) };
