import preview from '../../components/Cover/preview.html?raw';
import { fromPreview } from '../lib.js';

export default {
  title: 'Components/Cover',
};

/** The system's cover artwork, built only from tokens. */
export const Overview = { render: () => fromPreview(preview) };
