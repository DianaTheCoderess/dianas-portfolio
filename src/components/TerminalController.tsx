import Terminal, {
  ColorMode,
  TerminalInput,
  TerminalOutput,
} from "@/components/Terminal"
import React, { useState, useEffect } from "react"

import "@/components/terminal.css"

const TerminalController = () => {
  const [colorMode, setColorMode] = useState(ColorMode.Dark)
  const [lineData, setLineData] = useState<React.ReactNode[]>([])

  useEffect(() => {
    // Initialize with a typing effect
    const initialMessages = [
      "Initializing cybernetic interface...",
      "Establishing neural connection...",
      "Welcome to Diana's NetPalace Terminal",
      "",
      "Type 'help' to see available commands.",
    ]
    
    let timeout = 0
    initialMessages.forEach((message, index) => {
      timeout += (index === 0 ? 0 : 500)
      setTimeout(() => {
        setLineData(prev => [
          ...prev,
          <TerminalOutput key={`init-${index}`}>{message}</TerminalOutput>
        ])
      }, timeout)
    })
  }, [])

  function onInput(input: string) {
    const trimmedInput = input.trim().toLowerCase()
    let ld = [...lineData]
    ld.push(<TerminalInput key={`input-${Date.now()}`}>{input}</TerminalInput>)
    
    if (trimmedInput === "") {
      // Do nothing for empty input
    } else if (trimmedInput === "help") {
      ld.push(
        <TerminalOutput key={`output-help-${Date.now()}`}>
          <span style={{ color: "#ff3864" }}>AVAILABLE COMMANDS:</span>
        </TerminalOutput>
      )
      ld.push(<TerminalOutput key={`output-help-1`}>about - Learn about Diana</TerminalOutput>)
      ld.push(<TerminalOutput key={`output-help-2`}>skills - View technical skills</TerminalOutput>)
      ld.push(<TerminalOutput key={`output-help-3`}>projects - Browse portfolio projects</TerminalOutput>)
      ld.push(<TerminalOutput key={`output-help-4`}>contact - Get contact information</TerminalOutput>)
      ld.push(<TerminalOutput key={`output-help-5`}>github - Visit GitHub profile</TerminalOutput>)
      ld.push(<TerminalOutput key={`output-help-6`}>linkedin - Visit LinkedIn profile</TerminalOutput>)
      ld.push(<TerminalOutput key={`output-help-7`}>theme - Toggle light/dark mode</TerminalOutput>)
      ld.push(<TerminalOutput key={`output-help-8`}>clear - Clear terminal</TerminalOutput>)
    } else if (trimmedInput === "about") {
      ld.push(
        <TerminalOutput key={`output-about-${Date.now()}`}>
          <span style={{ color: "#ff3864" }}>ABOUT DIANA:</span>
          <br />
          Full-stack developer specializing in modern web technologies.
          <br />
          Passionate about creating elegant, efficient, and user-friendly applications.
          <br />
          Based in Berlin, Germany.
        </TerminalOutput>
      )
    } else if (trimmedInput === "skills") {
      ld.push(
        <TerminalOutput key={`output-skills-${Date.now()}`}>
          <span style={{ color: "#ff3864" }}>TECHNICAL SKILLS:</span>
          <br />
          Frontend: React, TypeScript, Next.js, Astro
          <br />
          Backend: Node.js, Express, Python, Django
          <br />
          Database: PostgreSQL, MongoDB, Redis
          <br />
          DevOps: Docker, AWS, CI/CD, Git
        </TerminalOutput>
      )
    } else if (trimmedInput === "projects") {
      ld.push(
        <TerminalOutput key={`output-projects-${Date.now()}`}>
          <span style={{ color: "#ff3864" }}>FEATURED PROJECTS:</span>
          <br />
          Use 'projects open [number]' to view details
          <br />
          1. CyberCommerce - E-commerce platform
          <br />
          2. NeuralNotes - AI-powered note-taking app
          <br />
          3. QuantumDash - Analytics dashboard
        </TerminalOutput>
      )
    } else if (trimmedInput.startsWith("projects open")) {
      const projectNum = trimmedInput.split(" ")[2]
      if (projectNum === "1") {
        window.open("/projects#cybercommerce", "_blank")
      } else if (projectNum === "2") {
        window.open("/projects#neuralnotes", "_blank")
      } else if (projectNum === "3") {
        window.open("/projects#quantumdash", "_blank")
      } else {
        ld.push(<TerminalOutput key={`output-error-${Date.now()}`}>Invalid project number</TerminalOutput>)
      }
    } else if (trimmedInput === "contact") {
      ld.push(
        <TerminalOutput key={`output-contact-${Date.now()}`}>
          <span style={{ color: "#ff3864" }}>CONTACT INFO:</span>
          <br />
          Email: diana@example.com
          <br />
          LinkedIn: linkedin.com/in/diana-example
          <br />
          GitHub: github.com/diana-example
        </TerminalOutput>
      )
    } else if (trimmedInput === "github") {
      window.open("https://github.com", "_blank")
      ld.push(<TerminalOutput key={`output-github-${Date.now()}`}>Opening GitHub profile...</TerminalOutput>)
    } else if (trimmedInput === "linkedin") {
      window.open("https://linkedin.com", "_blank")
      ld.push(<TerminalOutput key={`output-linkedin-${Date.now()}`}>Opening LinkedIn profile...</TerminalOutput>)
    } else if (trimmedInput === "theme") {
      setColorMode(colorMode === ColorMode.Dark ? ColorMode.Light : ColorMode.Dark)
      ld.push(
        <TerminalOutput key={`output-theme-${Date.now()}`}>
          Switched to {colorMode === ColorMode.Dark ? "light" : "dark"} mode
        </TerminalOutput>
      )
    } else if (trimmedInput === "clear") {
      ld = []
    } else {
      ld.push(
        <TerminalOutput key={`output-error-${Date.now()}`}>
          <span style={{ color: "#ff3864" }}>Command not recognized: {input}</span>
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
      <style jsx>{`
        .terminal-container {
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        .terminal-container::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #ff3864, #00f6ff);
          z-index: -1;
          border-radius: 10px;
          opacity: 0.7;
          animation: borderGlow 4s infinite alternate;
        }
        
        @keyframes borderGlow {
          0% {
            opacity: 0.5;
            filter: blur(3px);
          }
          100% {
            opacity: 0.8;
            filter: blur(1px);
          }
        }
      `}</style>
    </div>
  )
}

export default TerminalController
