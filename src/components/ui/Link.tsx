import { Button, type ButtonProps } from "./Button"
import type React from "react"

interface LinkProps extends ButtonProps {
  href: string
  children: React.ReactNode
}

const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
  return (
    <Button {...props} asChild>
      <a href={href}>{children}</a>
    </Button>
  )
}
Link.displayName = "Link"

export type { LinkProps }
export { Link }
