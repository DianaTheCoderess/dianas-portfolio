import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyber-blue disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-neon-pink text-cream shadow-[0_0_10px_rgba(255,107,151,0.3)] hover:bg-neon-pink/90 hover:shadow-[0_0_15px_rgba(255,107,151,0.5)]",
        cyber: "bg-cyber-blue text-deep-purple shadow-[0_0_10px_rgba(0,245,255,0.3)] hover:bg-cyber-blue/90 hover:shadow-[0_0_15px_rgba(0,245,255,0.5)]",
        outline: "border border-neon-pink/20 bg-deep-purple/50 backdrop-blur-sm hover:border-cyber-blue/50 hover:text-cyber-blue",
        ghost: "text-cream hover:bg-deep-purple/50 hover:text-cyber-blue",
        link: "text-cyber-blue underline-offset-4 hover:text-neon-pink hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-12 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
  external?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, external, ...props }, ref) => {
    const Comp = asChild ? Slot : href ? 'a' : 'button'
    
    const linkProps = href ? {
      href,
      ...(external && {
        target: "_blank",
        rel: "noopener noreferrer"
      })
    } : {}

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...linkProps}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
