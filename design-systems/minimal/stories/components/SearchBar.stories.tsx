import type { Meta, StoryObj } from '@storybook/react-vite'
import readme from '../../components/SearchBar/README.md?raw'
import { SearchBar } from '@/components/ui/search-bar'
import { Chip, ChipLabel } from '@/components/ui/chip'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: { docs: { description: { component: readme } } },
} satisfies Meta<typeof SearchBar>
export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SearchBar placeholder="Search profile…" scope={<Chip asChild><span><Avatar size="xs"><AvatarFallback>LW</AvatarFallback></Avatar><ChipLabel>lucasworcel</ChipLabel></span></Chip>} />
      <SearchBar placeholder="Search Cosmos…" />
      <SearchBar variant="simple" placeholder="Search" />
    </div>
  ),
}
