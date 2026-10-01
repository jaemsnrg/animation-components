import type { Meta, StoryObj } from '@storybook/react-vite'
import readme from '../../components/ElementCard/README.md?raw'
import { ElementCard } from '@/components/ui/collection-card'

const meta = {
  title: 'Components/ElementCard',
  component: ElementCard,
  parameters: { docs: { description: { component: readme } } },
} satisfies Meta<typeof ElementCard>
export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <div className="max-w-130 columns-3 gap-4 [&>a]:mb-4 [&>a]:break-inside-avoid">
      <ElementCard href="#" meta="lucasworcel"><div className="h-50 bg-gray-200" /></ElementCard>
      <ElementCard href="#" meta="Sevilla"><div className="h-32 bg-paper" /></ElementCard>
      <ElementCard href="#" meta="Color"><div className="h-60 bg-gray-300" /></ElementCard>
    </div>
  ),
}

export const Text: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-3 gap-4">
      <ElementCard index="01" title="Lighthouse scores: 99+" description="The best case scores with Shopify stores is generally 65 - 85." />
      <ElementCard index="02" title="Completely custom design" description="Every screen designed from a blank canvas for this store. No theme template was used." />
      <ElementCard index="03" title="Headless storefront" description="Next.js frontend built with design tokens and Storybook." />
    </div>
  ),
}
