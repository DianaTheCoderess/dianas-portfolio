export interface AvailableCommands {
  readonly [K in CommandType]: string
}
