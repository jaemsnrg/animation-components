import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "../../lib/utils"

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props} />
}

/**
 * Pill-shaped track with a hairline. A single `bg-muted` indicator measures and slides/resizes to the
 * active tab (transform + width), so tabs of different widths animate correctly.
 */
function TabsList({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const indicatorRef = React.useRef<HTMLSpanElement>(null)
  const ready = React.useRef(false)

  const place = React.useCallback(() => {
    const indicator = indicatorRef.current
    const active = listRef.current?.querySelector<HTMLElement>('[data-slot="tabs-trigger"][data-state="active"]')
    if (!indicator) return
    if (!active) {
      indicator.style.opacity = "0"
      return
    }
    indicator.style.width = `${active.offsetWidth}px`
    indicator.style.height = `${active.offsetHeight}px`
    indicator.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`
    indicator.style.opacity = "1"
    if (!ready.current) {
      // Commit the first position without animating, then enable transitions.
      indicator.getBoundingClientRect()
      indicator.dataset.ready = "true"
      ready.current = true
    }
  }, [])

  React.useLayoutEffect(place, [place, children])

  React.useEffect(() => {
    const list = listRef.current
    if (!list) return
    const mo = new MutationObserver(place)
    mo.observe(list, { attributes: true, attributeFilter: ["data-state"], subtree: true })
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(place)
    ro?.observe(list)
    list.querySelectorAll("[data-slot=tabs-trigger]").forEach((el) => ro?.observe(el))
    return () => {
      mo.disconnect()
      ro?.disconnect()
    }
  }, [place, children])

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn("relative inline-flex h-12 w-fit items-center rounded-full border-[0.5px] border-border p-[3.5px]", className)}
      {...props}
    >
      <span
        ref={indicatorRef}
        aria-hidden
        data-slot="tabs-indicator"
        className="pointer-events-none absolute top-0 left-0 rounded-full bg-muted opacity-0 data-[ready=true]:transition-[transform,width,height] data-[ready=true]:duration-slow data-[ready=true]:ease-out-quint motion-reduce:transition-none"
      />
      {children}
    </TabsPrimitive.List>
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
        "group/tab relative z-10 inline-flex h-full items-center justify-center gap-1 rounded-full border-0 py-2 text-body-regular font-medium! leading-[14px] whitespace-nowrap text-muted-foreground transition-colors duration-fast outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
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
