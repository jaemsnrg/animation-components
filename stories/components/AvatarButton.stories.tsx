import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronDownIcon } from 'lucide-react'
import { AvatarButton } from '@/components/ui/avatar-button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Components/AvatarButton',
  component: AvatarButton,
  parameters: { docs: { description: { component: 'Avatar as a button, used as the account menu trigger. A 2px ring is transparent by default, `border-hover` on hover and `border-active` when expanded or pressed.' } } },
} satisfies Meta<typeof AvatarButton>
export default meta
type Story = StoryObj<typeof meta>

const Me = () => <Avatar><AvatarFallback className="bg-linear-to-br from-[#8ea2f0] to-[#a9c4f5]" /></Avatar>

export const Overview: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AvatarButton aria-label="Account"><Me /></AvatarButton>
      <AvatarButton aria-label="Account" aria-expanded><Me /></AvatarButton>
      <Button variant="filled" size="icon" aria-label="Open account menu" aria-expanded><ChevronDownIcon className="transition-transform duration-fast group-aria-expanded/button:rotate-180" /></Button>
    </div>
  ),
}
