import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "../../lib/utils"

type SegmentedControlProps = Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive.Root>,
  "type" | "value" | "defaultValue" | "onValueChange"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

/**
 * Single-choice pill for short settings (Theme, Grid size). A single inverted indicator
 * slides and resizes to the selected item (measured layout, animated with transform + width),
 * so items of different widths animate correctly. Exactly one item is always selected.
 * Icon-only items need an aria-label.
 */
function SegmentedControl({ className, children, value, defaultValue, onValueChange, ...props }: SegmentedControlProps) {
  const [inner, setInner] = React.useState(defaultValue ?? "")
  const current = value ?? inner
  const rootRef = React.useRef<HTMLDivElement>(null)
  const indicatorRef = React.useRef<HTMLSpanElement>(null)
  const measured = React.useRef(false)

  const place = React.useCallback(() => {
    const root = rootRef.current
    const indicator = indicatorRef.current
    const active = root?.querySelector<HTMLElement>('[data-slot="segmented-control-item"][data-state="on"]')
    if (!root || !indicator || !active) {
      if (indicator) indicator.style.opacity = "0"
      return
    }
    indicator.style.width = `${active.offsetWidth}px`
    indicator.style.height = `${active.offsetHeight}px`
    indicator.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`
    indicator.style.opacity = "1"
    if (!measured.current) {
      // Commit the first position without animating, then enable transitions.
      indicator.getBoundingClientRect()
      indicator.dataset.ready = "true"
      measured.current = true
    }
  }, [])

  React.useLayoutEffect(place, [place, current, children])

  React.useEffect(() => {
    const root = rootRef.current
    if (!root || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver(place)
    ro.observe(root)
    root.querySelectorAll("[data-slot=segmented-control-item]").forEach((el) => ro.observe(el))
    return () => ro.disconnect()
  }, [place, children])

  return (
    <ToggleGroupPrimitive.Root
      ref={rootRef}
      type="single"
      data-slot="segmented-control"
      value={current}
      onValueChange={(next) => {
        if (!next) return // ignore deselecting the active item
        if (value === undefined) setInner(next)
        onValueChange?.(next)
      }}
      className={cn("relative inline-flex w-fit items-center gap-1 rounded-full bg-muted p-1", className)}
      {...props}
    >
      <span
        ref={indicatorRef}
        aria-hidden
        data-slot="segmented-control-indicator"
        className="pointer-events-none absolute top-0 left-0 rounded-full bg-bg-inverted opacity-0 data-[ready=true]:transition-[transform,width,height] data-[ready=true]:duration-slow data-[ready=true]:ease-out motion-reduce:transition-none"
      />
      {children}
    </ToggleGroupPrimitive.Root>
  )
}

function SegmentedControlItem({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="segmented-control-item"
      className={cn(
        "relative z-10 inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-body-regular font-medium! leading-none text-muted-foreground transition-colors duration-fast outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-text-inverted data-[state=on]:hover:text-text-inverted [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5",
        className
      )}
      {...props}
    />
  )
}

export { SegmentedControl, SegmentedControlItem }
