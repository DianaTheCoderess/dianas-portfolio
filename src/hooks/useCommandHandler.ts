import type { Command } from "@/types/terminalTypes"
import { useCallback } from "react"

interface UseCommandHandlerProps {
  onNewCommand: (newCommand: Command) => void
  onClear: () => void
}

export const useCommandHandler = ({
  onNewCommand,
  onClear,
}: UseCommandHandlerProps) => {
  return useCallback(
    (input: string) => {
      if (input.trim() === "clear") {
        onClear()
      } else {
        const newCommand: Command = { input, output: `Executed: ${input}` }
        onNewCommand(newCommand)
      }
    },
    [onNewCommand, onClear],
  )
}
