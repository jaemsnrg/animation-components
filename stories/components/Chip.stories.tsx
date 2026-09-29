import type { Meta, StoryObj } from '@storybook/react-vite'
import readme from '../../components/Chip/README.md?raw'
import { Chip, ChipLabel, ChipRemove } from '@/components/ui/chip'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: { docs: { description: { component: readme } } },
} satisfies Meta<typeof Chip>
export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip asChild><span><Avatar size="xs"><AvatarFallback>LW</AvatarFallback></Avatar><ChipLabel>lucasworcel</ChipLabel></span></Chip>
      <Chip><ChipLabel className="pl-1">Architecture</ChipLabel><ChipRemove /></Chip>
      <Chip selected><ChipLabel className="pl-1">Typography</ChipLabel></Chip>
    </div>
  ),
}
