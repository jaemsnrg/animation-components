import * as React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

/** Square tile (radius-3xl, shadow-medium) with title and meta beneath. Media zooms 5% on hover. */
function CollectionCard({ title, meta, children, className, ...props }: Omit<React.ComponentProps<"a">, "title"> & { title: React.ReactNode; meta?: React.ReactNode }) {
  return (
    <a data-slot="collection-card" className={cn("group/card flex w-full cursor-pointer flex-col gap-4 text-inherit no-underline", className)} {...props}>
      <Card className="relative aspect-square">
        <div className="absolute inset-0 transition-transform duration-slow ease-out group-hover/card:scale-105">{children}</div>
      </Card>
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="truncate text-body font-medium!">{title}</p>
        {meta && <p className="flex items-center gap-1 text-caption text-muted-foreground">{meta}</p>}
      </div>
    </a>
  )
}

/** 2×2 mosaic filling a CollectionCard when no cover image is set. */
function Mosaic({ children }: { children: React.ReactNode }) {
  return <div className="grid size-full grid-cols-2 grid-rows-2 gap-0.5">{children}</div>
}

/** Element tile: `radius-2xl`, no shadow, caption beneath. Height comes from the media. */
function ElementCard({ meta, children, className, ...props }: Omit<React.ComponentProps<"a">, "title"> & { meta?: React.ReactNode }) {
  return (
    <a data-slot="element-card" className={cn("group/card flex cursor-pointer flex-col gap-2 text-inherit no-underline", className)} {...props}>
      <Card className="rounded-2xl shadow-none">
        <div className="transition-transform duration-slow ease-out group-hover/card:scale-105">{children}</div>
      </Card>
      {meta && <p className="text-caption text-muted-foreground">{meta}</p>}
    </a>
  )
}

export { CollectionCard, ElementCard, Mosaic }
