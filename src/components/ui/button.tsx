import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/*
 * Cosmos Study button. Always a pill; label in `body-medium`. Emphasis comes from inversion, not hue.
 * Icon sizes follow the original IconButton: 44 / 40 / 34px.
 */
const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-1 rounded-full border-[0.5px] border-transparent text-body-medium whitespace-nowrap transition-colors duration-fast outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-hover-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-hover-secondary",
        outline:
          "border-border text-foreground hover:border-border-hover hover:bg-hover-tertiary disabled:border-transparent",
        ghost: "text-text-secondary hover:text-foreground disabled:bg-transparent",
        /** Icon buttons: quiet fill, and borderless. */
        filled: "bg-muted text-muted-foreground hover:bg-hover-secondary hover:text-foreground aria-expanded:text-foreground",
        plain: "text-muted-foreground hover:bg-hover-secondary hover:text-foreground disabled:bg-transparent",
        destructive: "bg-bg-critical text-text-inverted hover:opacity-90",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-11 px-6 text-body-medium",
        icon: "size-11 p-0",
        "icon-sm": "size-10 p-0",
        "icon-xs": "size-[34px] p-0",
      },
      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "default", size: "default", block: false },
  }
)

function Button({
  className,
  variant,
  size,
  block,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, block }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
