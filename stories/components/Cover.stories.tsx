import type { Meta, StoryObj } from '@storybook/react-vite'
import preview from '../../components/Cover/preview.html?raw'

const doc = new DOMParser().parseFromString(preview, 'text/html')
const html = [...doc.head.querySelectorAll('style')].map((s) => s.outerHTML).join('') + doc.body.innerHTML

const meta = { title: 'Components/Cover', parameters: { layout: 'fullscreen' } } satisfies Meta
export default meta

/** The system's cover artwork, built only from tokens. */
export const Overview: StoryObj = { render: () => <div className="cx" dangerouslySetInnerHTML={{ __html: html }} /> }
