import * as React from "react"

import { cn } from "../../lib/utils"

/** Avatar as a button (account menu trigger). 2px ring: transparent, `border-hover` on hover, `border-active` when open or pressed. */
function AvatarButton({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="avatar-button"
      type="button"
      className={cn(
        "inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent p-[3px] transition-colors duration-fast outline-none hover:border-border-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-expanded:border-ring aria-pressed:border-ring",
        className
      )}
      {...props}
    />
  )
}

export { AvatarButton }
