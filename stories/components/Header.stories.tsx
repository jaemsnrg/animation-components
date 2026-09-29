import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronDownIcon, CircleDashedIcon, SearchIcon } from 'lucide-react'
import readme from '../../components/Header/README.md?raw'
import { Header } from '@/components/ui/header'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: { layout: 'fullscreen', docs: { description: { component: readme } } },
} satisfies Meta<typeof Header>
export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  args: {
    start: (
      <>
        <CircleDashedIcon className="size-6" aria-label="Your logo" />
        <button className="inline-flex h-layout-header-height cursor-pointer items-center gap-1.5 text-body-medium">Menu <ChevronDownIcon className="size-4" /></button>
      </>
    ),
    center: (
      <InputGroup className="max-w-90">
        <InputGroupAddon><SearchIcon /></InputGroupAddon>
        <InputGroupInput placeholder="Search…" aria-label="Search" />
      </InputGroup>
    ),
    end: (
      <>
        <Button variant="ghost">Log in</Button>
        <Button>Sign up</Button>
      </>
    ),
  },
}
