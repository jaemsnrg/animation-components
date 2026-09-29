import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * Search-field shell: 56px pill, hairline, soft inset bevel, `shadow-small` that lifts to
 * `shadow-large` when the control inside is focused.
 */
function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group flex h-14 w-full min-w-0 items-center gap-2 rounded-full border-[0.5px] border-input bg-bg-light-elevation p-2 transition-shadow duration-slow ease-out-quint [box-shadow:var(--shadow-small),var(--shadow-field-inset)] has-[[data-slot=input-group-control]:focus-visible]:[box-shadow:var(--shadow-large),var(--shadow-field-inset)]",
        className
      )}
      {...props}
    />
  )
}

/** `inline-start` sits before the control, `inline-end` after it. */
function InputGroupAddon({ className, align = "inline-start", ...props }: React.ComponentProps<"div"> & { align?: "inline-start" | "inline-end" }) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn("flex shrink-0 items-center gap-0.5 text-muted-foreground data-[align=inline-end]:order-last data-[align=inline-start]:order-first data-[align=inline-start]:ml-2 [&_svg:not([class*='size-'])]:size-5", className)}
      {...props}
    />
  )
}

function InputGroupInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input-group-control"
      className={cn("h-full min-w-0 flex-1 bg-transparent px-1 text-body-regular font-normal! text-foreground outline-none placeholder:text-muted-foreground", className)}
      {...props}
    />
  )
}

function InputGroupButton({ variant = "plain", size = "icon-xs", type = "button", ...props }: React.ComponentProps<typeof Button>) {
  return <Button type={type} variant={variant} size={size} {...props} />
}

export { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton }
