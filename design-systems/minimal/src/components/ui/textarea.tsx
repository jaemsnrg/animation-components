import * as React from "react"

import { cn } from "../../lib/utils"
import { field } from "./input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(field, "min-h-24 resize-y rounded-2xl px-4.5 py-3 text-body-medium font-normal!", className)}
      {...props}
    />
  )
}

export { Textarea }
