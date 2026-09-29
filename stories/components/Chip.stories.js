import preview from '../../components/Chip/preview.html?raw';
import readme from '../../components/Chip/README.md?raw';
import { fromPreview } from '../lib.js';

export default {
  title: 'Components/Chip',
  parameters: { docs: { description: { component: readme } } },
};

/** Every variant and state, as shown in the component's preview card. */
export const Overview = { render: () => fromPreview(preview) };
