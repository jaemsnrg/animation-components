import type { Meta, StoryObj } from '@storybook/react-vite'
import readme from '../../components/Avatar/README.md?raw'
import { Avatar, AvatarFallback, AvatarGroup } from '@/components/ui/avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { docs: { description: { component: readme } } },
} satisfies Meta<typeof Avatar>
export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar size="lg"><AvatarFallback>LW</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>MA</AvatarFallback></Avatar>
      <Avatar size="sm"><AvatarFallback>JN</AvatarFallback></Avatar>
      <Avatar size="xs"><AvatarFallback>A</AvatarFallback></Avatar>
      <AvatarGroup>
        {['A', 'B', 'C'].map((l) => <Avatar key={l} size="sm"><AvatarFallback>{l}</AvatarFallback></Avatar>)}
      </AvatarGroup>
    </div>
  ),
}
