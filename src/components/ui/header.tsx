import * as React from "react"

import { cn } from "@/lib/utils"

/** Sticky top bar: logo + menu (start), search (centre), account actions (end). 92px tall, on the page ground. */
function Header({ start, center, end, className, ...props }: Omit<React.ComponentProps<"header">, "children"> & { start?: React.ReactNode; center?: React.ReactNode; end?: React.ReactNode }) {
  return (
    <header data-slot="header" className={cn("flex h-layout-header-outer-height items-center justify-between gap-6 bg-background px-8 py-6", className)} {...props}>
      <div className="flex items-center gap-5">{start}</div>
      <div className="flex min-w-0 flex-1 justify-center">{center}</div>
      <div className="flex items-center gap-1 p-1">{end}</div>
    </header>
  )
}

export { Header }
