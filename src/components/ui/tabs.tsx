import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "../../lib/utils"

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props} />
}

/** Pill-shaped track with a hairline; the active tab takes the `bg-elevation` fill. */
function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("inline-flex h-12 w-fit items-center rounded-full border-[0.5px] border-border p-[3.5px]", className)}
      {...props}
    />
  )
}

/**
 * Default is asymmetric (18px / 12px) to balance a trailing count badge;
 * pass `plain` for symmetric padding on tabs without one. Count badges inside go white when active.
 */
function TabsTrigger({ className, plain, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger> & { plain?: boolean }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "group/tab inline-flex h-full items-center justify-center gap-1 rounded-full border-0 py-2 text-body-regular font-medium! leading-[14px] whitespace-nowrap text-muted-foreground transition-colors duration-fast outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-muted data-[state=active]:text-foreground",
        plain ? "px-4.5" : "pr-3 pl-4.5",
        "[&_[data-slot=badge]]:group-data-[state=active]/tab:bg-gray-0 [&_[data-slot=badge]]:group-data-[state=active]/tab:text-gray-1000",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
