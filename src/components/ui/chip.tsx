import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "../../lib/utils"

/** Context pill: 40px, hairline border. Selected inverts. Label truncates at 12 characters.
 * `glass`: frosted background (translucent, blurred backdrop) in place of the inverted black fill. */
const chipVariants = cva(
  "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border-[0.5px] py-2 pr-3 pl-2 text-body-small transition-colors duration-fast outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  {
    variants: {
      selected: {
        false: "border-border bg-background text-foreground hover:bg-hover-tertiary",
        true: "border-transparent bg-bg-inverted text-text-inverted hover:bg-hover-primary",
      },
      glass: {
        false: "",
        true: "border-transparent bg-neutral-400/30 text-foreground backdrop-blur-xl hover:bg-neutral-400/40",
      },
    },
    defaultVariants: { selected: false, glass: false },
  }
)

function Chip({ className, selected, glass, asChild = false, ...props }: React.ComponentProps<"button"> & VariantProps<typeof chipVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  return <Comp data-slot="chip" data-selected={selected ? "" : undefined} className={cn(chipVariants({ selected, glass }), "cursor-pointer", className)} {...props} />
}

function ChipLabel({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="chip-label" className={cn("max-w-[12ch] truncate", className)} {...props} />
}

function ChipRemove({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span data-slot="chip-remove" aria-hidden className={cn("inline-flex text-muted-foreground", className)} {...props}>
      <XIcon className="size-4" />
    </span>
  )
}

export { Chip, ChipLabel, ChipRemove, chipVariants }
