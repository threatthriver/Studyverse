import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-t-md border-b bg-muted px-3 py-2 text-base md:text-sm", // Base: Rounded top, bottom border, muted background
          "border-foreground/30", // Default bottom border color
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground", // File input styles
          "placeholder:text-muted-foreground", // Placeholder styles
          "focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-primary", // Focus: Thicker, primary color bottom border
          "disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50", // Disabled: Lighter muted background and opacity
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
