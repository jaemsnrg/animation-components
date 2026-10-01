import type { Meta, StoryObj } from '@storybook/react-vite'
import readme from '../../components/CountBadge/README.md?raw'
import { Badge } from '@/components/ui/badge'

const meta = {
  title: 'Components/CountBadge',
  component: Badge,
  parameters: { docs: { description: { component: readme } } },
  args: { children: '26' },
  argTypes: { variant: { control: 'inline-radio', options: ['default', 'notification', 'dot', 'outline'] } },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Overview: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge>26</Badge><Badge>4.6K</Badge><Badge>1</Badge>
      <Badge variant="notification">3</Badge>
      <Badge variant="dot" aria-label="Unread" />
    </div>
  ),
}
