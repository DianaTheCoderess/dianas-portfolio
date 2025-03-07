import type React from "react"

export type CommandType =
  | "help"
  | "welcome"
  | "about"
  | "skills"
  | "contact"
  | "clear"
  | "projects"
  | "whoami"
  | "theme"
  | "github"
  | "linkedin"
  | "neo"

export interface CommandOutput {
  type?: OutputType
  message?: string
  help?: string
  content?: string
}

export interface Command {
  input: string
  output: CommandOutput | string | React.ReactNode
  isError?: boolean
  externalAction?: () => void
  shouldClear?: boolean
}

export interface AvailableCommands {
  readonly [K in CommandType]: string
}
