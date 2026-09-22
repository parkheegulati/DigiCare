import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-[#e9e9e7] bg-white px-3 py-1.5 text-sm text-[#37352f] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#787774] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#37352f] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2f2f2f] dark:bg-[#202020] dark:text-[#e3e3e3] dark:placeholder:text-[#9b9b9b] dark:focus-visible:ring-[#e3e3e3]",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
