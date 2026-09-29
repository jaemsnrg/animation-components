import preview from '../../components/Header/preview.html?raw';
import readme from '../../components/Header/README.md?raw';
import { fromPreview } from '../lib.js';

export default {
  title: 'Components/Header',
  parameters: { docs: { description: { component: readme } } },
};

/** Every variant and state, as shown in the component's preview card. */
export const Overview = { render: () => fromPreview(preview) };
