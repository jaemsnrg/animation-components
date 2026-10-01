import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  BookmarkIcon, ChevronDownIcon, ContrastIcon, LogOutIcon, MessageSquareMoreIcon, MoonIcon, PlusIcon,
  RepeatIcon, SettingsIcon, SunIcon, UsersIcon, ZapIcon,
} from 'lucide-react'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemBody, DropdownMenuItemLabel,
  DropdownMenuItemTile, DropdownMenuItemTrail, DropdownMenuRow, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AvatarButton } from '@/components/ui/avatar-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PillTrigger } from '@/components/ui/pill-trigger'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const meta = {
  title: 'Components/Menu',
  component: DropdownMenu,
  parameters: {
    docs: {
      description: {
        component:
          'Floating panel (shadcn `DropdownMenu`): `radius-3xl`, `bg-floating`, hairline border, `shadow-large`. Items are `default` (label + trailing icon/badge/avatar) or `rich` (48px media, title over supporting line, optional trailing control). `DropdownMenuRow` holds settings with a `SegmentedControl`. Stories are open by default; click the triggers to toggle.',
      },
    },
  },
} satisfies Meta<typeof DropdownMenu>
export default meta
type Story = StoryObj<typeof meta>

const grad = 'bg-linear-to-br from-[#8ea2f0] to-[#a9c4f5]'

const Mosaic = () => (
  <svg viewBox="0 0 48 48" aria-hidden className="size-full">
    <path d="M0 24h48M22 0v48" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
)

/** Destination picker: pill trigger + rich items. */
export const Destination: Story = {
  render: () => (
    <div className="h-80 w-96">
      <DropdownMenu defaultOpen modal={false}>
        <div className="flex items-center gap-2">
          <DropdownMenuTrigger asChild>
            <PillTrigger><Avatar className="size-7"><AvatarFallback className={grad} /></Avatar>Profile</PillTrigger>
          </DropdownMenuTrigger>
          <Button>Save</Button>
        </div>
        <DropdownMenuContent align="start" className="w-(--radix-dropdown-menu-trigger-width) min-w-96">
          <DropdownMenuItem variant="rich">
            <Avatar className="size-12"><AvatarFallback className={grad} /></Avatar>
            <DropdownMenuItemBody title="Profile" description="Display on profile" />
            <Button asChild variant="filled" size="icon" className="transition-colors duration-75 group-data-[highlighted]/item:bg-hover-secondary"><span><PlusIcon /></span></Button>
          </DropdownMenuItem>
          <DropdownMenuItem variant="rich">
            <DropdownMenuItemTile><Mosaic /></DropdownMenuItemTile>
            <DropdownMenuItemBody title="Create collection" description="Organize your elements" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

/** Account menu: avatar trigger, single-line items, and settings rows. */
export const Account: Story = {
  render: () => (
    <div className="h-170 w-80">
      <DropdownMenu defaultOpen modal={false}>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><PlusIcon className="size-5" />Create</Button>
          <Button variant="outline" size="icon" aria-label="Actions"><ZapIcon /></Button>
          <DropdownMenuTrigger asChild>
            <AvatarButton aria-label="Account"><Avatar><AvatarFallback className={grad} /></Avatar></AvatarButton>
          </DropdownMenuTrigger>
          <Button variant="filled" size="icon" aria-label="Account menu" aria-expanded><ChevronDownIcon className="transition-transform group-aria-expanded/button:rotate-180" /></Button>
        </div>
        <DropdownMenuContent align="start" className="w-72">
          <DropdownMenuItem><DropdownMenuItemLabel>View profile</DropdownMenuItemLabel><DropdownMenuItemTrail><Avatar size="xs"><AvatarFallback className={grad} /></Avatar></DropdownMenuItemTrail></DropdownMenuItem>
          <DropdownMenuItem><DropdownMenuItemLabel>All elements <Badge>0</Badge></DropdownMenuItemLabel><DropdownMenuItemTrail><BookmarkIcon /></DropdownMenuItemTrail></DropdownMenuItem>
          <DropdownMenuItem><DropdownMenuItemLabel>Settings</DropdownMenuItemLabel><DropdownMenuItemTrail><SettingsIcon /></DropdownMenuItemTrail></DropdownMenuItem>
          <DropdownMenuItem><DropdownMenuItemLabel>Contact us</DropdownMenuItemLabel><DropdownMenuItemTrail><MessageSquareMoreIcon /></DropdownMenuItemTrail></DropdownMenuItem>
          <DropdownMenuItem><DropdownMenuItemLabel>Community</DropdownMenuItemLabel><DropdownMenuItemTrail><UsersIcon /></DropdownMenuItemTrail></DropdownMenuItem>
          <DropdownMenuItem><DropdownMenuItemLabel>Switch account</DropdownMenuItemLabel><DropdownMenuItemTrail><RepeatIcon /></DropdownMenuItemTrail></DropdownMenuItem>
          <DropdownMenuItem><DropdownMenuItemLabel>Log out</DropdownMenuItemLabel><DropdownMenuItemTrail><LogOutIcon /></DropdownMenuItemTrail></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuRow>
            Theme
            <ToggleGroup type="single" defaultValue="light" aria-label="Theme">
              <ToggleGroupItem value="light" aria-label="Light"><SunIcon /></ToggleGroupItem>
              <ToggleGroupItem value="dark" aria-label="Dark"><MoonIcon /></ToggleGroupItem>
              <ToggleGroupItem value="system" aria-label="System"><ContrastIcon /></ToggleGroupItem>
            </ToggleGroup>
          </DropdownMenuRow>
          <DropdownMenuRow>
            Grid size
            <ToggleGroup type="single" defaultValue="II" aria-label="Grid size">
              {['I', 'II', 'III'].map((v) => <ToggleGroupItem key={v} value={v}>{v}</ToggleGroupItem>)}
            </ToggleGroup>
          </DropdownMenuRow>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}
