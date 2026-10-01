import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlusIcon } from 'lucide-react'
import readme from '../../components/Button/README.md?raw'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: { docs: { description: { component: readme } } },
  args: { children: 'Sign up' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'secondary', 'outline', 'ghost', 'destructive'] },
    size: { control: 'inline-radio', options: ['default', 'sm'] },
  },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Every variant and state. */
export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button>Sign up</Button>
        <Button variant="secondary">Save to collection</Button>
        <Button variant="outline"><PlusIcon className="size-4" />New collection</Button>
        <Button variant="ghost">Log in</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Follow</Button>
        <Button size="sm" variant="secondary">Following</Button>
        <Button disabled>Follow</Button>
      </div>
    </div>
  ),
}
