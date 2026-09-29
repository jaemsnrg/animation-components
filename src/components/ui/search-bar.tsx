import * as React from "react"
import { ScanIcon, SearchIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./input-group"

/**
 * Header search: optional scope chip (or search icon) leading, visual-search action trailing.
 * `variant="simple"` is a flat pill (no border, no shadow, no focus lift) with just the icon and input.
 */
function SearchBar({ scope, placeholder = "Search…", variant = "default", className, ...props }: Omit<React.ComponentProps<"input">, "size"> & { scope?: React.ReactNode; variant?: "default" | "simple" }) {
  return (
    <InputGroup variant={variant} className={cn("max-w-114", className)}>
      <InputGroupAddon>{scope ?? <SearchIcon />}</InputGroupAddon>
      <InputGroupInput type="search" aria-label="Search" placeholder={placeholder} {...props} />
      {variant === "default" && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Search by image">
            <ScanIcon />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}

export { SearchBar }
