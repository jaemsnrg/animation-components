import type { Meta, StoryObj } from '@storybook/react-vite'
import readme from '../../components/Input/README.md?raw'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldHint, Label } from '@/components/ui/label'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: { docs: { description: { component: readme } } },
} satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Field><Label htmlFor="n">Collection name</Label><Input id="n" placeholder="e.g. Mœbles" /><FieldHint>Visible on your profile.</FieldHint></Field>
      <Field><Label htmlFor="e">Email</Label><Input id="e" defaultValue="hello@studio" aria-invalid /><FieldHint error>Enter a full email address.</FieldHint></Field>
      <Field><Label htmlFor="u">Username</Label><Input id="u" defaultValue="lucasworcel" disabled /></Field>
      <Field><Label htmlFor="b">Bio</Label><Textarea id="b" placeholder="Tell people what you collect…" /></Field>
    </div>
  ),
}
