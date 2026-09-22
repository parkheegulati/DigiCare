import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-[#37352f] text-white hover:bg-[#23211d] dark:bg-[#e3e3e3] dark:text-[#191919] dark:hover:bg-white shadow-none",
    destructive: "bg-[#eb5757] text-white hover:bg-[#d44040] shadow-none",
    outline: "border border-[#e9e9e7] bg-white text-[#37352f] hover:bg-[#f7f6f3] dark:border-[#2f2f2f] dark:bg-[#191919] dark:hover:bg-[#252525] dark:text-[#e3e3e3]",
    secondary: "bg-[#f7f6f3] text-[#37352f] hover:bg-[#efefed] dark:bg-[#252525] dark:text-[#e3e3e3] dark:hover:bg-[#2c2c2c] border border-[#e9e9e7] dark:border-[#2f2f2f]",
    ghost: "hover:bg-[#f7f6f3] text-[#37352f] dark:hover:bg-[#252525] dark:hover:text-[#e3e3e3]",
    link: "text-[#2383e2] underline-offset-4 hover:underline dark:text-[#388bfd]",
  }
  const sizes = {
    default: "h-9 px-3.5 py-1.5",
    sm: "h-8 rounded-md px-2.5 text-xs",
    lg: "h-10 rounded-md px-6 text-base",
    icon: "h-9 w-9",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#37352f] disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-[#e3e3e3]",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
