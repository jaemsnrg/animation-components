import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "../../lib/utils"

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn("text-body-regular font-medium! text-foreground select-none peer-disabled:opacity-50", className)}
      {...props}
    />
  )
}

/** Stacked label / control / hint, as used in forms. */
function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field" className={cn("flex w-full max-w-90 flex-col gap-1.5", className)} {...props} />
}

function FieldHint({ className, error, ...props }: React.ComponentProps<"p"> & { error?: boolean }) {
  return (
    <p
      data-slot="field-hint"
      className={cn("text-caption", error ? "text-text-critical" : "text-text-secondary", className)}
      {...props}
    />
  )
}

export { Label, Field, FieldHint }
