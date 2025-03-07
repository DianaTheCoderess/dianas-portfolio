export type CommandType =
  | "help"
  | "welcome"
  | "about"
  | "skills"
  | "contact"
  | "clear"
  | "projects"
  | "whoami"

export interface CommandOutput {
  type?: OutputType
  message?: string
  help?: string
  content?: string
}

export interface Command {
  input: string
  output: CommandOutput | string
  isError?: boolean
}

export interface AvailableCommands {
  readonly [K in CommandType]: string
}
