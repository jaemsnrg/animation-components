import preview from '../../components/SearchBar/preview.html?raw';
import readme from '../../components/SearchBar/README.md?raw';
import { fromPreview } from '../lib.js';

export default {
  title: 'Components/SearchBar',
  parameters: { docs: { description: { component: readme } } },
};

/** Every variant and state, as shown in the component's preview card. */
export const Overview = { render: () => fromPreview(preview) };
