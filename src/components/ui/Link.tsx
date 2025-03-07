import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

const linkVariants = cva(
  "transition-colors duration-300", 
  {
    variants: {
      variant: {
        default: "text-cyber-blue hover:text-neon-pink underline-offset-4 hover:underline",
        subtle: "text-cream/80 hover:text-cyber-blue",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  external?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, external, ...props }, ref) => {
    const externalProps = external ? {
      target: "_blank",
      rel: "noopener noreferrer"
    } : {}

    return (
      <a
        className={cn(linkVariants({ variant, className }))}
        ref={ref}
        {...externalProps}
        {...props}
      />
    )
  }
)
Link.displayName = "Link"

export { Link, linkVariants }
