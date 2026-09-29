import * as React from "react"
import { ScanIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"

/** Header search: optional scope chip (or search icon) leading, visual-search action trailing. */
function SearchBar({ scope, placeholder = "Search…", className, ...props }: React.ComponentProps<"input"> & { scope?: React.ReactNode }) {
  return (
    <InputGroup className={cn("max-w-114", className)}>
      <InputGroupAddon>{scope ?? <SearchIcon />}</InputGroupAddon>
      <InputGroupInput type="search" aria-label="Search" placeholder={placeholder} {...props} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton aria-label="Search by image">
          <ScanIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { SearchBar }
