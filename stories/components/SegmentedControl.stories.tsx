import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContrastIcon, MoonIcon, SunIcon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const meta = {
  title: 'Components/SegmentedControl',
  component: ToggleGroup,
  parameters: { docs: { description: { component: 'Compact single-choice control for settings such as Theme and Grid size (shadcn `ToggleGroup`). A `bg-elevation` pill; the selected item inverts.' } } },
} satisfies Meta<typeof ToggleGroup>
export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup type="single" defaultValue="light" aria-label="Theme">
        <ToggleGroupItem value="light" aria-label="Light"><SunIcon /></ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Dark"><MoonIcon /></ToggleGroupItem>
        <ToggleGroupItem value="system" aria-label="System"><ContrastIcon /></ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" defaultValue="II" aria-label="Grid size">
        {['I', 'II', 'III'].map((v) => <ToggleGroupItem key={v} value={v}>{v}</ToggleGroupItem>)}
      </ToggleGroup>
    </div>
  ),
}
