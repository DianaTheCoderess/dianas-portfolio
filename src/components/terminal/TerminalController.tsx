import { ColorMode, Terminal } from "@/components/terminal/Terminal"
import type React from "react"
import { useState, useEffect } from "react"
import { commandRegistry } from "@/lib/terminal/CommandRegistry"
import { registerBuiltInCommands } from "@/lib/terminal/BuiltInCommands"
import { TerminalOutput } from "@/components/terminal/TerminalOutput"
import { TerminalInput } from "@/components/terminal/TerminalInput.tsx"
import "@/styles/global.css"

const TerminalController = () => {
  const [colorMode, setColorMode] = useState(ColorMode.Dark)
  const [lineData, setLineData] = useState<React.ReactNode[]>([])

  useEffect(() => {
    registerBuiltInCommands()

    commandRegistry.register({
      name: "theme",
      description: "Toggle light/dark mode",
      execute: () => {
        const newMode =
          colorMode === ColorMode.Dark ? ColorMode.Light : ColorMode.Dark
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
          <TerminalOutput key={`init-${index}`}>{message}</TerminalOutput>,
        ])
      }, timeout)
    })
  }, [colorMode])

  function onInput(input: string) {
    const trimmedInput = input.trim()
    if (!trimmedInput) return

    let ld = [...lineData]
    ld.push(<TerminalInput key={`input-${Date.now()}`}>{input}</TerminalInput>)

    const args = trimmedInput.split(" ")
    const commandName = args[0].toLowerCase()
    const commandArgs = args.slice(1)

    if (commandRegistry.hasCommand(commandName)) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const command = commandRegistry.getCommand(commandName)!
      const result = command.execute(commandArgs)

      if (result.externalAction) {
        result.externalAction()
      }

      if (result.shouldClear) {
        ld = []
      } else if (result.output) {
        ld.push(
          <TerminalOutput key={`output-${commandName}-${Date.now()}`}>
            {result.output}
          </TerminalOutput>,
        )
      }
    } else {
      ld.push(
        <TerminalOutput key={`output-error-${Date.now()}`}>
          <span style={{ color: "#ff3864" }}>
            Command not recognized: {input}
          </span>
          <br />
          Type 'help' to see available commands.
        </TerminalOutput>,
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

export { TerminalController }
