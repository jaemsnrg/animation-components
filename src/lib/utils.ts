import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * The design system's type styles (`text-body`, `text-heading-large`, …) are font-size utilities.
 * Without telling tailwind-merge, it treats them as text colours and drops one when both are present.
 */
const typeStyles = [
  "display-xxlarge", "display-large", "display",
  "heading-xxlarge", "heading-xlarge", "heading-large", "heading",
  "body-large", "body", "body-medium", "body-regular", "body-small",
  "caption", "numerical", "mono",
]

const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: typeStyles }] } },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
