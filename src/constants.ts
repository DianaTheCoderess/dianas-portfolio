import type { AvailableCommands } from "@/types/terminalTypes"

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

// Animation Timings
export const ANIMATION_TIMINGS = {
  LINE_DELAY: 300,
  TEXT_UPDATE: 750,
  COMPLETION_DELAY: 400,
  LOADING_DURATION: 2000,
  FRAME_RATE: 16,
} as const

// Terminal Constants
export const TERMINAL = {
  HEIGHT: 500,
  GRID_CELLS: 64,
  GRID_COLS: 8,
  GRID_ROWS: 8,
} as const

// Tech Stack Constants
export const TECH_STACK = {
  UPDATE_INTERVAL: 4000,
}
