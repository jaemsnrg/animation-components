import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "../../lib/utils"

/** Circular profile image with a 0.5px outline so pale photos keep an edge. Sizes: xs 24, sm 32, default 40, lg 80. */
function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & { size?: "xs" | "sm" | "default" | "lg" }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-10 shrink-0 overflow-hidden rounded-full bg-muted outline-[0.5px] outline-border select-none data-[size=lg]:size-20 data-[size=sm]:size-8 data-[size=xs]:size-6",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image data-slot="avatar-image" className={cn("aspect-square size-full object-cover", className)} {...props} />
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-body-regular font-medium! leading-none text-text-secondary group-data-[size=lg]/avatar:text-heading-large group-data-[size=xs]/avatar:text-[10px]",
        className
      )}
      {...props}
    />
  )
}

/** Overlapping stack with a 2px page-coloured separation ring. */
function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="avatar-group" className={cn("flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background", className)} {...props} />
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
