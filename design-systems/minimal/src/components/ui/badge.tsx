import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "../../lib/utils"

/** Count badge: 20px pill, `numerical` type with tabular figures. `dot` is the unread marker. */
const badgeVariants = cva(
  "inline-flex h-5 min-w-5 shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full px-1.5 text-numerical whitespace-nowrap tabular-nums",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        notification: "bg-bg-badge text-text-onmedia",
        dot: "size-2 h-2 min-w-2 p-0 bg-bg-badge",
        outline: "border-[0.5px] border-border text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"
  return <Comp data-slot="badge" data-variant={variant} className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
