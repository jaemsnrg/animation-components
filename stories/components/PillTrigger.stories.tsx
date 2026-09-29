import type { Meta, StoryObj } from '@storybook/react-vite'
import { PillTrigger } from '@/components/ui/pill-trigger'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Components/PillTrigger',
  component: PillTrigger,
  parameters: { docs: { description: { component: 'Pill trigger for a menu (see Components/Menu). 56px, `heading` label, trailing chevron that flips when `aria-expanded`.' } } },
} satisfies Meta<typeof PillTrigger>
export default meta
type Story = StoryObj<typeof meta>

const Me = () => <Avatar size="xs" className="size-7"><AvatarFallback className="bg-linear-to-br from-[#8ea2f0] to-[#a9c4f5]" /></Avatar>

export const Overview: Story = {
  render: () => (
    <div className="flex max-w-90 flex-col gap-4">
      <div className="flex items-center gap-2"><PillTrigger><Me />Profile</PillTrigger><Button>Save</Button></div>
      <PillTrigger aria-expanded><Me />Profile</PillTrigger>
      <PillTrigger disabled>Choose a destination</PillTrigger>
    </div>
  ),
}
