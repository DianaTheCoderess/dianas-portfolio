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

// Colors
export const COLORS = {
  WARM_PURPLE: "#2a1b3d",
  NEON_PINK: "#ff6b97",
  SOFT_PURPLE: "#9d4edd",
  CYBER_BLUE: "#00f5ff",
  WARM_GOLD: "#ffd700",
  CREAM: "#fff5e4",
  DEEP_PURPLE: "#1a1025",
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

// Loading Screen Constants
export const LOADING_SCREEN = {
  MAX_WIDTH_SM: "90vw",
  MAX_WIDTH_MD: "lg",
  MAX_WIDTH_LG: "xl",
} as const

// Animation Durations
export const ANIMATION_DURATIONS = {
  DEFAULT: 300,
  MEDIUM: 500,
  SLOW: 750,
} as const
