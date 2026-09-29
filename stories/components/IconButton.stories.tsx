import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronDownIcon, PlusIcon, ScanIcon, ShareIcon, EllipsisIcon, ZapIcon } from 'lucide-react'
import readme from '../../components/IconButton/README.md?raw'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Components/IconButton',
  component: Button,
  parameters: { docs: { description: { component: readme } } },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

/** Icon buttons are `Button` with an icon size: 44 / 40 / 34px. */
export const Overview: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="icon" aria-label="Share"><ShareIcon /></Button>
      <Button variant="outline" size="icon-sm" aria-label="More"><EllipsisIcon /></Button>
      <Button size="icon" aria-label="Add"><PlusIcon /></Button>
      <Button variant="outline" size="icon" aria-label="Actions"><ZapIcon /></Button>
      <Button variant="plain" size="icon-xs" aria-label="Visual search"><ScanIcon /></Button>
      <Button variant="filled" size="icon" aria-label="Open menu" aria-expanded><ChevronDownIcon className="transition-transform group-aria-expanded/button:rotate-180" /></Button>
      <Button variant="outline" size="icon" aria-label="Share" disabled><ShareIcon /></Button>
    </div>
  ),
}
