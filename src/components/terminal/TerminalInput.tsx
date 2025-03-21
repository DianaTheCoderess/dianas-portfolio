import React, { type PropsWithChildren } from "react"

type TerminalInputProps = PropsWithChildren<{
  prompt?: string
}>

const TerminalInput = ({ children, prompt }: TerminalInputProps) => {
  return (
    <div
      className="react-terminal-line react-terminal-input"
      data-terminal-prompt={prompt || "$"}
    >
      {children}
    </div>
  )
}

export type { TerminalInputProps }
export { TerminalInput }
