import { Button, type ButtonProps } from "@/components/ui"
import type React from "react"

interface LinkProps extends ButtonProps {
  href: string
  children: React.ReactNode
}

const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
  return (
    <Button {...props} asChild>
      <a href={href} data-umami-event={props.id}>
        {children}
      </a>
    </Button>
  )
}
Link.displayName = "Link"

export type { LinkProps }
export { Link }
