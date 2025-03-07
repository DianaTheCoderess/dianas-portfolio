import type { AvailableCommands } from "./types/terminalTypes"

export const AVAILABLE_COMMANDS: AvailableCommands = {
  help: "List all available commands",
  welcome: "Display a welcome message",
  about: "Display information about me",
  skills: "List my technical skills",
  contact: "Show contact information",
  clear: "Clear the terminal",
  projects: "List my projects",
  whoami: "Display current user",
} as const
