import * as React from "react"

import { cn } from "../../lib/utils"
import { Card } from "./card"

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

/**
 * Element tile: `radius-2xl`, no shadow. Media variant: height comes from the media, caption (`meta`) beneath.
 * Text variant (pass `title`): number pill, title and description inside the frame. Renders a `div` unless `href` is set.
 */
function ElementCard({
  meta,
  index,
  title,
  description,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"a">, "title"> & {
  meta?: React.ReactNode
  index?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
}) {
  const Comp = props.href ? "a" : "div"
  if (title) {
    return (
      <Comp
        data-slot="element-card"
        data-variant="text"
        className={cn("group/card flex flex-col text-inherit no-underline", props.href && "cursor-pointer", className)}
        {...(props as object)}
      >
        <Card className="h-full gap-3 rounded-2xl p-6 shadow-none">
          {index != null && (
            <span
              aria-hidden
              className="flex size-8 items-center justify-center rounded-xl border-[0.5px] border-border text-numerical font-medium text-muted-foreground"
            >
              {index}
            </span>
          )}
          <p className="text-body font-medium!">{title}</p>
          {description && <p className="text-caption text-muted-foreground">{description}</p>}
        </Card>
      </Comp>
    )
  }
  return (
    <Comp data-slot="element-card" className={cn("group/card flex cursor-pointer flex-col gap-2 text-inherit no-underline", className)} {...(props as object)}>
      <Card className="rounded-2xl shadow-none">
        <div className="transition-transform duration-slow ease-out group-hover/card:scale-105">{children}</div>
      </Card>
      {meta && <p className="text-caption text-muted-foreground">{meta}</p>}
    </Comp>
  )
}

export { CollectionCard, ElementCard, Mosaic }
