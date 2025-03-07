import { Button, type ButtonProps } from "@/components/ui/Button"
import type React from "react"

export interface LinkProps extends ButtonProps {
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

export { Link }
