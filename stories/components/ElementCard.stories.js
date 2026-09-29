import preview from '../../components/ElementCard/preview.html?raw';
import readme from '../../components/ElementCard/README.md?raw';
import { fromPreview } from '../lib.js';

export default {
  title: 'Components/ElementCard',
  parameters: { docs: { description: { component: readme } } },
};

/** Every variant and state, as shown in the component's preview card. */
export const Overview = { render: () => fromPreview(preview) };
