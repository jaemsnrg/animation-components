import type { Meta, StoryObj } from '@storybook/react-vite'
import readme from '../../components/ImageCaption/README.md?raw'
import { ImageCaption, ImageCaptionTitle, ImageCaptionCredit } from '@/components/ui/image-caption'

const meta = {
  title: 'Components/ImageCaption',
  component: ImageCaption,
  parameters: { docs: { description: { component: readme } } },
} satisfies Meta<typeof ImageCaption>
export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <figure className="m-0 flex h-64 items-end justify-center rounded-2xl bg-linear-to-br from-gray-600 via-gray-300 to-gray-700 pb-8">
      <ImageCaption>
        <ImageCaptionTitle>Photograph from Unformen der Kunst</ImageCaptionTitle>
        <ImageCaptionCredit>Karl Blossfeldt</ImageCaptionCredit>
      </ImageCaption>
    </figure>
  ),
}
