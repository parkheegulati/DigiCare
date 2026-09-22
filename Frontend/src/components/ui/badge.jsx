import * as React from "react"
import { cn } from "../../lib/utils"

function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "border-transparent bg-[#f1f1ef] text-[#37352f] dark:bg-[#2c2c2c] dark:text-[#e3e3e3]",
    secondary: "border-transparent bg-[#e8f3ff] text-[#2383e2] dark:bg-[#1e2d3d] dark:text-[#388bfd]",
    destructive: "border-transparent bg-[#fdebec] text-[#c43838] dark:bg-[#361e1f] dark:text-[#f87171]",
    outline: "border-[#e9e9e7] bg-white text-[#37352f] dark:border-[#2f2f2f] dark:bg-[#191919] dark:text-[#e3e3e3]",
    success: "border-transparent bg-[#edf3ec] text-[#448361] dark:bg-[#1c2c21] dark:text-[#4ade80]",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium border transition-colors focus:outline-none focus:ring-1 focus:ring-[#37352f] dark:focus:ring-[#e3e3e3]",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
