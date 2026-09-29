import preview from '../../components/Input/preview.html?raw';
import readme from '../../components/Input/README.md?raw';
import { fromPreview } from '../lib.js';

export default {
  title: 'Components/Input',
  parameters: { docs: { description: { component: readme } } },
};

/** Every variant and state, as shown in the component's preview card. */
export const Overview = { render: () => fromPreview(preview) };
