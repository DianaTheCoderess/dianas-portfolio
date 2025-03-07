import type React from "react"
import { useState } from "react"

interface CommandLineProps {
  onCommand: (input: string) => void
  commandHistory: string[]
  historyIndex: number
  onHistoryChange: (index: number) => void
}

export const CommandLine: React.FC<CommandLineProps> = ({
  onCommand,
  commandHistory,
  historyIndex,
  onHistoryChange,
}) => {
  const [input, setInput] = useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onCommand(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      const newIndex = Math.max(historyIndex - 1, 0)
      onHistoryChange(newIndex)
      setInput(commandHistory[newIndex] || "")
    } else if (e.key === "ArrowDown") {
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
      onHistoryChange(newIndex)
      setInput(commandHistory[newIndex] || "")
    }
  }

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      className="w-full bg-transparent outline-hidden"
    />
  )
}
