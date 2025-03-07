import { CommandLine } from "@/components/CommandLine"
import { CommandOutput } from "@/components/CommandOutput"
import { useCommandHandler } from "@/hooks/useCommandHandler"
import type { Command } from "@/types/terminalTypes"
import type React from "react"
import { useCallback, useRef, useState } from "react"

export const Terminal: React.FC = () => {
  const [commands, setCommands] = useState<Command[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)

  const handleCommand = useCommandHandler({
    onNewCommand: useCallback(
      (newCommand: Command) => {
        setCommands((prev) => [...prev, newCommand])
        setCommandHistory((prev) => [...prev, newCommand.input])
        setHistoryIndex(commandHistory.length)

        setTimeout(() => {
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
          }
        }, 0)
      },
      [commandHistory.length],
    ),
    onClear: useCallback(() => {
      setCommands([])
    }, []),
  })

  return (
    <div className="cyber-window rounded-lg sm:rounded-xl relative overflow-hidden h-[500px] cursor-text group">
      {/* Grid Background */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-4 p-4 opacity-20 pointer-events-none">
        {Array.from({ length: 64 }).map((_, i) => (
          <div key={i} className="bg-cyber-blue/30 rounded-full w-2 h-2" />
        ))}
      </div>

      {/* Glow Effects */}
      <div className="absolute inset-0 bg-linear-to-b from-neon-pink/5 to-cyber-blue/5 pointer-events-none" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-r from-neon-pink/10 via-transparent to-cyber-blue/10" />
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="h-full font-mono text-sm overflow-y-auto space-y-4 terminal-scrollbar p-4"
      >
        {commands.map((cmd, index) => (
          <CommandOutput key={`${cmd.input}-${index}`} command={cmd} />
        ))}
        <CommandLine
          onCommand={handleCommand}
          commandHistory={commandHistory}
          historyIndex={historyIndex}
          onHistoryChange={setHistoryIndex}
        />
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-deep-purple/90 to-transparent pointer-events-none" />
    </div>
  )
}
