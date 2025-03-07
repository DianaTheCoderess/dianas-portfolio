import type { Command } from "@/types/terminalTypes"
import React from "react"

export interface TerminalCommand {
  name: string
  description: string
  execute: (args: string[]) => {
    output: React.ReactNode
    shouldClear?: boolean
    externalAction?: () => void
  }
}

class CommandRegistry {
  private commands: Map<string, TerminalCommand> = new Map()

  register(command: TerminalCommand): void {
    this.commands.set(command.name.toLowerCase(), command)
  }

  getCommand(name: string): TerminalCommand | undefined {
    return this.commands.get(name.toLowerCase())
  }

  getAllCommands(): TerminalCommand[] {
    return Array.from(this.commands.values())
  }

  hasCommand(name: string): boolean {
    return this.commands.has(name.toLowerCase())
  }
}

// Create a singleton instance
const commandRegistry = new CommandRegistry()

export default commandRegistry
