import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const DropdownMenu = (props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) => (
  <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
)
const DropdownMenuPortal = (props: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) => (
  <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
)
const DropdownMenuTrigger = (props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) => (
  <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
)
const DropdownMenuGroup = (props: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) => (
  <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
)
const DropdownMenuRadioGroup = (props: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) => (
  <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
)
const DropdownMenuSub = (props: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) => (
  <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
)

const panel =
  "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-64 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-3xl border-[0.5px] border-border bg-popover p-2 text-popover-foreground shadow-large data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"

/** Floating panel: `radius-3xl`, `bg-floating`, hairline border, `shadow-large`. */
function DropdownMenuContent({ className, sideOffset = 8, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content data-slot="dropdown-menu-content" sideOffset={sideOffset} className={cn(panel, className)} {...props} />
    </DropdownMenuPrimitive.Portal>
  )
}

/**
 * `default` is a single-line action (label left, trailing icon / badge / avatar right).
 * `rich` is a destination row: 48px media, title over supporting line, optional trailing control.
 */
const itemVariants = cva(
  "relative flex w-full cursor-pointer items-center gap-4 rounded-2xl text-body font-medium! outline-none select-none transition-colors duration-fast focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "min-h-14 px-4 py-2",
        rich: "min-h-18 p-2",
        destructive: "min-h-14 px-4 py-2 text-text-critical focus:text-text-critical",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function DropdownMenuItem({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & VariantProps<typeof itemVariants>) {
  return (
    <DropdownMenuPrimitive.Item data-slot="dropdown-menu-item" data-variant={variant} className={cn(itemVariants({ variant }), className)} {...props} />
  )
}

/** Left slot of a default item; takes an optional count badge alongside the text. */
function DropdownMenuItemLabel({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="dropdown-menu-item-label" className={cn("flex min-w-0 flex-1 items-center gap-2", className)} {...props} />
}

/** Right slot of a default item. */
function DropdownMenuItemTrail({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="dropdown-menu-item-trail" className={cn("inline-flex shrink-0 items-center text-foreground", className)} {...props} />
}

/** Title + supporting line for `rich` items. */
function DropdownMenuItemBody({ title, description, className, ...props }: Omit<React.ComponentProps<"span">, "title"> & { title: React.ReactNode; description?: React.ReactNode }) {
  return (
    <span data-slot="dropdown-menu-item-body" className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)} {...props}>
      <span className="text-body font-medium! text-foreground">{title}</span>
      {description && <span className="text-body-small font-normal! text-muted-foreground">{description}</span>}
    </span>
  )
}

/** 48px square media slot (e.g. the collection mosaic). */
function DropdownMenuItemTile({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="dropdown-menu-item-tile" className={cn("inline-flex size-12 shrink-0 overflow-hidden rounded-xl bg-gray-300 text-popover", className)} {...props} />
}

/** Non-interactive settings row: label left, control (usually a ToggleGroup) right. */
function DropdownMenuRow({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dropdown-menu-row" className={cn("flex min-h-14 items-center justify-between gap-4 px-4 py-1 text-body font-medium!", className)} {...props} />
}

function DropdownMenuCheckboxItem({ className, children, checked, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      checked={checked}
      className={cn(itemVariants(), "min-h-12 py-2 pr-4 pl-10", className)}
      {...props}
    >
      <span className="pointer-events-none absolute left-4 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem data-slot="dropdown-menu-radio-item" className={cn(itemVariants(), "min-h-12 py-2 pr-4 pl-10", className)} {...props}>
      <span className="pointer-events-none absolute left-4 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return <DropdownMenuPrimitive.Label data-slot="dropdown-menu-label" className={cn("px-4 py-2 text-caption text-muted-foreground", className)} {...props} />
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return <DropdownMenuPrimitive.Separator data-slot="dropdown-menu-separator" className={cn("mx-4 my-2 h-[0.5px] bg-border", className)} {...props} />
}

function DropdownMenuSubTrigger({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>) {
  return (
    <DropdownMenuPrimitive.SubTrigger data-slot="dropdown-menu-sub-trigger" className={cn(itemVariants(), "min-h-14 px-4 py-2 data-[state=open]:bg-accent", className)} {...props}>
      {children}
      <ChevronRightIcon className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return <DropdownMenuPrimitive.SubContent data-slot="dropdown-menu-sub-content" className={cn(panel, className)} {...props} />
}

export {
  DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuItemLabel, DropdownMenuItemTrail, DropdownMenuItemBody, DropdownMenuItemTile, DropdownMenuRow,
  DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
}
