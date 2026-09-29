import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { docs: { description: { component: 'Surface with a 0.5px hairline and `shadow-medium`. Defaults to `radius-3xl` for collection-style cards; element tiles pass `rounded-2xl shadow-none`. Compose with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` and `CardFooter`.' } } },
} satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Mœbles</CardTitle>
        <CardDescription>99 elements</CardDescription>
      </CardHeader>
      <CardContent>A collection of furniture references saved over the past year.</CardContent>
      <CardFooter>
        <Button>Follow</Button>
      </CardFooter>
    </Card>
  ),
}

export const ElementTile: Story = {
  render: () => (
    <Card className="max-w-48 rounded-2xl shadow-none">
      <CardContent className="p-4">
        <div className="aspect-square rounded-xl bg-gray-200" />
      </CardContent>
    </Card>
  ),
}
