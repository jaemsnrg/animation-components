import type { Meta, StoryObj } from '@storybook/react-vite'
import readme from '../../components/Tabs/README.md?raw'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { docs: { description: { component: readme } } },
} satisfies Meta<typeof Tabs>
export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Tabs defaultValue="collections">
        <TabsList>
          <TabsTrigger value="profile">Profile <Badge>4.6K</Badge></TabsTrigger>
          <TabsTrigger value="collections">Collections <Badge>26</Badge></TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="elements">
        <TabsList>
          <TabsTrigger plain value="elements">Elements</TabsTrigger>
          <TabsTrigger plain value="collections">Collections</TabsTrigger>
          <TabsTrigger plain value="people">People</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  ),
}
