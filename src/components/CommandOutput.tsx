import type { Command } from "@/types/terminalTypes"
import type React from "react"

interface CommandOutputProps {
  command: Command
}

export const CommandOutput: React.FC<CommandOutputProps> = ({ command }) => {
  return (
    <div>
      <div>{command.input}</div>
      <div>{command.output}</div>
    </div>
  )
}
