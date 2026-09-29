import type { Meta, StoryObj } from '@storybook/react-vite'
import { BookmarkIcon } from 'lucide-react'
import readme from '../../components/CollectionCard/README.md?raw'
import { CollectionCard, Mosaic } from '@/components/ui/collection-card'

const meta = {
  title: 'Components/CollectionCard',
  component: CollectionCard,
  parameters: { docs: { description: { component: readme } } },
} satisfies Meta<typeof CollectionCard>
export default meta
type Story = StoryObj<typeof meta>

const tones = ['bg-paper', 'bg-gray-200', 'bg-gray-100', 'bg-gray-300']
const rot = (n: number) => [...tones.slice(n), ...tones.slice(0, n)]
const Cover = ({ n }: { n: number }) => <Mosaic>{rot(n).map((t) => <span key={t} className={t} />)}</Mosaic>

/** Hover a card: the media zooms 5%. */
export const Overview: Story = {
  render: () => (
    <div className="grid max-w-160 grid-cols-3 gap-x-6 gap-y-8">
      <CollectionCard href="#" title="Mœbles" meta="99 elements"><Cover n={0} /></CollectionCard>
      <CollectionCard href="#" title="Sevilla" meta="90 elements"><Cover n={2} /></CollectionCard>
      <CollectionCard href="#" title="Color" meta={<><BookmarkIcon className="size-4" />Saved</>}><Cover n={1} /></CollectionCard>
    </div>
  ),
}
