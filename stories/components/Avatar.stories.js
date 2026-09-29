import preview from '../../components/Avatar/preview.html?raw';
import readme from '../../components/Avatar/README.md?raw';
import { fromPreview } from '../lib.js';

export default {
  title: 'Components/Avatar',
  parameters: { docs: { description: { component: readme } } },
};

/** Every variant and state, as shown in the component's preview card. */
export const Overview = { render: () => fromPreview(preview) };
