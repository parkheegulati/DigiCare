import * as React from "react"
import { cn } from "../../lib/utils"

function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border-transparent bg-cyan-500 text-white hover:bg-cyan-600",
    destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
    outline: "text-slate-950 dark:text-slate-50",
    success: "border-transparent bg-teal-500 text-white hover:bg-teal-600",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
