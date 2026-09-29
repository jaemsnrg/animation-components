import preview from '../../components/Tabs/preview.html?raw';
import readme from '../../components/Tabs/README.md?raw';
import { fromPreview } from '../lib.js';

export default {
  title: 'Components/Tabs',
  parameters: { docs: { description: { component: readme } } },
};

/** Every variant and state, as shown in the component's preview card. */
export const Overview = { render: () => fromPreview(preview) };
