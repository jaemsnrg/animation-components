import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContrastIcon, MoonIcon, SunIcon } from 'lucide-react'
import { SegmentedControl, SegmentedControlItem } from '@/components/ui/segmented-control'

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: { docs: { description: { component: 'Compact single-choice control for settings such as Theme and Grid size. A `bg-muted` pill; one inverted indicator measures and slides/resizes to the selected item. Built on Radix `ToggleGroup`, but the active item cannot be deselected.' } } },
} satisfies Meta<typeof SegmentedControl>
export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <SegmentedControl defaultValue="light" aria-label="Theme">
        <SegmentedControlItem value="light" aria-label="Light"><SunIcon /></SegmentedControlItem>
        <SegmentedControlItem value="dark" aria-label="Dark"><MoonIcon /></SegmentedControlItem>
        <SegmentedControlItem value="system" aria-label="System"><ContrastIcon /></SegmentedControlItem>
      </SegmentedControl>
      <SegmentedControl defaultValue="II" aria-label="Grid size">
        {['I', 'II', 'III'].map((v) => <SegmentedControlItem key={v} value={v}>{v}</SegmentedControlItem>)}
      </SegmentedControl>
    </div>
  ),
}
