import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from '@/components/ui/separator'

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: { docs: { description: { component: 'A 0.5px hairline in `border-primary`, horizontal or vertical. Decorative by default; pass `decorative={false}` to expose it to assistive tech.' } } },
} satisfies Meta<typeof Separator>
export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      <div>
        <div className="text-body font-medium">Collections</div>
        <div className="text-caption text-muted-foreground">Everything you have saved</div>
      </div>
      <Separator />
      <div className="flex h-6 items-center gap-4 text-body-regular">
        <span>Followers</span>
        <Separator orientation="vertical" />
        <span>Following</span>
        <Separator orientation="vertical" />
        <span>Elements</span>
      </div>
    </div>
  ),
}
