import preview from '../../components/CollectionCard/preview.html?raw';
import readme from '../../components/CollectionCard/README.md?raw';
import { fromPreview } from '../lib.js';

export default {
  title: 'Components/CollectionCard',
  parameters: { docs: { description: { component: readme } } },
};

/** Every variant and state, as shown in the component's preview card. */
export const Overview = { render: () => fromPreview(preview) };
