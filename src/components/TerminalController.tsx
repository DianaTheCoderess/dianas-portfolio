import Terminal, {
  ColorMode,
  TerminalInput,
  TerminalOutput,
} from "@/components/Terminal"
import type React from "react"
import { useState, useEffect } from "react"
import commandRegistry from "@/lib/terminal/CommandRegistry"
import { registerBuiltInCommands } from "@/lib/terminal/BuiltInCommands"

import "@/styles/global.css"

// Register the theme command directly in this component since it needs access to state
const TerminalController = () => {
  const [colorMode, setColorMode] = useState(ColorMode.Dark)
  const [lineData, setLineData] = useState<React.ReactNode[]>([])

  // Register commands and initialize terminal
  useEffect(() => {
    // Register all built-in commands
    registerBuiltInCommands()

    // Register the theme command (needs access to component state)
    commandRegistry.register({
      name: "theme",
      description: "Toggle light/dark mode",
      execute: () => {
        const newMode = colorMode === ColorMode.Dark ? ColorMode.Light : ColorMode.Dark
        setColorMode(newMode)
        return {
          output: `Switched to ${colorMode === ColorMode.Dark ? "light" : "dark"} mode`,
        }
      },
    })

    // Initialize with a typing effect
    const initialMessages = [
      "Welcome to Diana's NetPalace Terminal",
      "",
      "Type 'help' to see available commands.",
    ]

    let timeout = 0
    initialMessages.forEach((message, index) => {
      timeout += index === 0 ? 0 : 500
      setTimeout(() => {
        setLineData((prev) => [
          ...prev,
          <TerminalOutput
            key={`init-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
          >
            {message}
          </TerminalOutput>,
        ])
      }, timeout)
    })
  }, [colorMode])

  function onInput(input: string) {
    const trimmedInput = input.trim()
    if (!trimmedInput) return // Do nothing for empty input

    // Add the input to the terminal
    let ld = [...lineData]
    ld.push(<TerminalInput key={`input-${Date.now()}`}>{input}</TerminalInput>)

    // Parse the command and arguments
    const args = trimmedInput.split(" ")
    const commandName = args[0].toLowerCase()
    const commandArgs = args.slice(1)

    // Check if the command exists in the registry
    if (commandRegistry.hasCommand(commandName)) {
      const command = commandRegistry.getCommand(commandName)!
      const result = command.execute(commandArgs)

      // Handle external actions (like opening URLs)
      if (result.externalAction) {
        result.externalAction()
      }

      // Handle clearing the terminal
      if (result.shouldClear) {
        ld = []
      } else if (result.output) {
        // Add the output to the terminal
        ld.push(
          <TerminalOutput key={`output-${commandName}-${Date.now()}`}>
            {result.output}
          </TerminalOutput>
        )
      }
    } else {
      // Command not found
      ld.push(
        <TerminalOutput key={`output-error-${Date.now()}`}>
          <span style={{ color: "#ff3864" }}>
            Command not recognized: {input}
          </span>
          <br />
          Type 'help' to see available commands.
        </TerminalOutput>
      )
    }

    setLineData(ld)
  }

  return (
    <div className="terminal-container">
      <Terminal
        name="NETPALACE-OS v2.0"
        colorMode={colorMode}
        onInput={onInput}
        className="cyber-terminal"
      >
        {lineData}
      </Terminal>
    </div>
  )
}

export default TerminalController
