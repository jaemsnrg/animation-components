import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "../../lib/utils"

/**
 * Pill trigger for a menu (e.g. the destination picker). 56px, `heading` label, trailing chevron
 * that flips when the trigger is expanded. Use as `<DropdownMenuTrigger asChild><PillTrigger/></DropdownMenuTrigger>`.
 */
function PillTrigger({ className, children, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="pill-trigger"
      type="button"
      className={cn(
        "group/pill inline-flex h-14 w-full cursor-pointer items-center gap-3 rounded-full border-[0.5px] border-border bg-background pr-4 pl-3 text-left text-heading text-foreground transition-colors duration-fast outline-none hover:border-border-hover hover:bg-hover-tertiary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:border-transparent disabled:bg-muted disabled:text-muted-foreground",
        className
      )}
      {...props}
    >
      <span className="flex min-w-0 flex-1 items-center gap-3 truncate">{children}</span>
      <ChevronDownIcon className="size-5 shrink-0 transition-transform duration-fast ease-out-quint group-aria-expanded/pill:rotate-180" />
    </button>
  )
}

export { PillTrigger }
