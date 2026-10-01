import * as React from "react"

import { cn } from "../../lib/utils"

/** Caption over an image: plain title above a frosted-glass credit pill. Type is `text-onmedia`, not themed. */
function ImageCaption({ className, ...props }: React.ComponentProps<"figcaption">) {
  return (
    <figcaption
      data-slot="image-caption"
      className={cn("flex flex-col items-center gap-3 text-center text-base text-text-onmedia [text-shadow:0_1px_12px_rgb(0_0_0/0.25)]", className)}
      {...props}
    />
  )
}

function ImageCaptionTitle({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="image-caption-title" className={cn("block", className)} {...props} />
}

/** Frosted-glass pill: 25% `text-onmedia` fill over a blurred, saturated backdrop. Not interactive. */
function ImageCaptionCredit({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="image-caption-credit"
      className={cn("inline-flex items-center rounded-2xl bg-text-onmedia/25 px-5 py-3 backdrop-blur-md backdrop-saturate-150", className)}
      {...props}
    />
  )
}

export { ImageCaption, ImageCaptionTitle, ImageCaptionCredit }
