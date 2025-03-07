import Terminal, {
  ColorMode,
  TerminalInput,
  TerminalOutput,
} from "@/components/Terminal"
import React, { useState } from "react"

import "@/components/terminal.css"

const TerminalController = () => {
  const [colorMode, setColorMode] = useState(ColorMode.Dark)
  const [lineData, setLineData] = useState([
    <TerminalOutput>
      Welcome to the React Terminal UI Demo!&#128075;
    </TerminalOutput>,
    <TerminalOutput></TerminalOutput>,
    <TerminalOutput>
      The following example commands are provided:
    </TerminalOutput>,
    <TerminalOutput>
      'view-source' will navigate to the React Terminal UI github source.
    </TerminalOutput>,
    <TerminalOutput>
      'view-react-docs' will navigate to the react docs.
    </TerminalOutput>,
    <TerminalOutput>'clear' will clear the terminal.</TerminalOutput>,
  ])

  function onInput(input: string) {
    let ld = [...lineData]
    ld.push(<TerminalInput>{input}</TerminalInput>)
    if (input.toLocaleLowerCase().trim() === "view-source") {
      window.open("https://github.com/jonmbake/react-terminal-ui", "_blank")
    } else if (input.toLocaleLowerCase().trim() === "view-react-docs") {
      window.open("https://reactjs.org/docs/getting-started.html", "_blank")
    } else if (input.toLocaleLowerCase().trim() === "clear") {
      ld = []
    } else if (input) {
      ld.push(<TerminalOutput>Unrecognized command</TerminalOutput>)
    }
    setLineData(ld)
  }

  return (
    <div className="container">
      <Terminal
        name="React Terminal UI"
        colorMode={colorMode}
        onInput={onInput}
      >
        {lineData}
      </Terminal>
    </div>
  )
}

export default TerminalController
