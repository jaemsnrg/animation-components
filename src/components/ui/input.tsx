import * as React from "react"

import { cn } from "@/lib/utils"

const field =
  "w-full min-w-0 border-[0.5px] border-input bg-bg-light-elevation text-foreground shadow-field-inset outline-none transition-colors duration-fast placeholder:text-muted-foreground hover:border-border-hover focus-visible:border-ring aria-invalid:border-border-critical disabled:bg-muted disabled:text-text-disabled disabled:hover:border-input"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(field, "h-12 rounded-full px-4.5 text-body-medium font-normal!", className)}
      {...props}
    />
  )
}

export { Input, field }
