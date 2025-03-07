import type React from "react"
import {
  commandRegistry,
  type TerminalCommand,
} from "@/lib/terminal/CommandRegistry"

const createStyledOutput = (
  title: string,
  content: React.ReactNode,
): React.ReactNode => (
  <>
    <span style={{ color: "#ff3864" }}>{title}</span>
    {content}
  </>
)

const helpCommand: TerminalCommand = {
  name: "help",
  description: "Display available commands",
  execute: () => {
    const commands = commandRegistry.getAllCommands()
    const commandList = commands.map((cmd) => (
      <div key={cmd.name}>
        {cmd.name} - {cmd.description}
      </div>
    ))

    return {
      output: createStyledOutput("AVAILABLE COMMANDS:\n", commandList),
    }
  },
}

const aboutCommand: TerminalCommand = {
  name: "about",
  description: "Learn about Diana",
  execute: () => {
    return {
      output: createStyledOutput(
        "ABOUT DIANA:\n",
        <>
          <br />
          Full-stack developer specializing in modern web technologies.
          <br />
          Passionate about creating elegant, efficient, and user-friendly
          applications.
          <br />
          Based in Berlin, Germany.
        </>,
      ),
    }
  },
}

const skillsCommand: TerminalCommand = {
  name: "skills",
  description: "View technical skills",
  execute: () => {
    return {
      output: createStyledOutput(
        "TECHNICAL SKILLS:\n",
        <>
          <br />
          Frontend: React, TypeScript, Next.js, Astro
          <br />
          Backend: Node.js, Express, Python, Django
          <br />
          Database: PostgreSQL, MongoDB, Redis
          <br />
          DevOps: Docker, AWS, CI/CD, Git
        </>,
      ),
    }
  },
}

const projectsCommand: TerminalCommand = {
  name: "projects",
  description: "Browse portfolio projects",
  execute: (args) => {
    if (args.length > 0 && args[0] === "open") {
      const projectNum = args[1]
      if (projectNum === "1") {
        return {
          output: "Opening CyberCommerce project...",
          externalAction: () =>
            window.open("/projects#cybercommerce", "_blank"),
        }
      }
      if (projectNum === "2") {
        return {
          output: "Opening NeuralNotes project...",
          externalAction: () => window.open("/projects#neuralnotes", "_blank"),
        }
      }
      if (projectNum === "3") {
        return {
          output: "Opening QuantumDash project...",
          externalAction: () => window.open("/projects#quantumdash", "_blank"),
        }
      }
      return {
        output: "Invalid project number",
      }
    }

    return {
      output: createStyledOutput(
        "FEATURED PROJECTS:\n",
        <>
          <br />
          Use 'projects open [number]' to view details
          <br />
          1. CyberCommerce - E-commerce platform
          <br />
          2. NeuralNotes - AI-powered note-taking app
          <br />
          3. QuantumDash - Analytics dashboard
        </>,
      ),
    }
  },
}

const contactCommand: TerminalCommand = {
  name: "contact",
  description: "Get contact information",
  execute: () => {
    return {
      output: createStyledOutput(
        "CONTACT INFO:\n",
        <>
          <br />
          Email: diana@example.com
          <br />
          LinkedIn: linkedin.com/in/diana-example
          <br />
          GitHub: github.com/diana-example
        </>,
      ),
    }
  },
}

const githubCommand: TerminalCommand = {
  name: "github",
  description: "Visit GitHub profile",
  execute: () => {
    return {
      output: "Opening GitHub profile...",
      externalAction: () => window.open("https://github.com", "_blank"),
    }
  },
}

const linkedinCommand: TerminalCommand = {
  name: "linkedin",
  description: "Visit LinkedIn profile",
  execute: () => {
    return {
      output: "Opening LinkedIn profile...",
      externalAction: () => window.open("https://linkedin.com", "_blank"),
    }
  },
}

const clearCommand: TerminalCommand = {
  name: "clear",
  description: "Clear terminal",
  execute: () => {
    const matrixElements = document.querySelectorAll("[data-matrix-element]")
    for (const el of matrixElements) {
      el.remove()
    }

    const inputLine = document.querySelector(".react-terminal-active-input")
    if (inputLine) {
      inputLine.classList.remove("matrix-hidden")
    }

    const hiddenInput = document.querySelector(
      ".terminal-hidden-input",
    ) as HTMLElement
    if (hiddenInput) {
      hiddenInput.style.display = ""
    }

    return {
      output: "",
      shouldClear: true,
    }
  },
}

const neoCommand: TerminalCommand = {
  name: "neo",
  description: "Wake up, Neo...",
  execute: () => {
    return {
      output: "",
      shouldClear: true,
      externalAction: () => {
        const messages = [
          { text: "Wake up, Neo...", delay: 3000 },
          { text: "The Matrix has you...", delay: 3000 },
          { text: "Follow the white rabbit.", delay: 3000 },
          { text: "Knock, knock, Neo.", delay: 3000 },
        ]

        const matrixAttr = "data-matrix-element"

        const terminalElement = document.querySelector(".react-terminal")
        if (!terminalElement) return

        const inputLine = document.querySelector(".react-terminal-active-input")
        if (!inputLine) return

        inputLine.classList.add("matrix-hidden")

        const hiddenInput = document.querySelector(
          ".terminal-hidden-input",
        ) as HTMLElement
        if (hiddenInput) {
          hiddenInput.style.display = "none"
        }

        const typeMessage = (
          message: { text: string; delay: number },
          index: number,
        ) => {
          const lineElement = document.createElement("div")
          lineElement.className =
            "react-terminal-input react-terminal-line matrix-line"
          lineElement.setAttribute(matrixAttr, "true")
          terminalElement.appendChild(lineElement)

          let charIndex = 0
          const typeChar = () => {
            if (charIndex < message.text.length) {
              lineElement.appendChild(
                document.createTextNode(message.text.charAt(charIndex)),
              )
              charIndex++
              setTimeout(typeChar, 100) // Adjust typing speed here
            } else if (index < messages.length - 1) {
              setTimeout(() => {
                lineElement.classList.add("matrix-fade-out")

                setTimeout(() => {
                  lineElement.remove()
                  typeMessage(messages[index + 1], index + 1)
                }, 1000)
              }, message.delay)
            } else {
              setTimeout(() => {
                lineElement.remove()
                inputLine.classList.remove("matrix-hidden")

                const hiddenInput = document.querySelector(
                  ".terminal-hidden-input",
                ) as HTMLElement
                if (hiddenInput) {
                  hiddenInput.style.display = ""
                }
              }, message.delay)
            }
          }

          typeChar()
        }

        setTimeout(() => typeMessage(messages[0], 0), 500)
      },
    }
  },
}

const registerBuiltInCommands = (): void => {
  commandRegistry.register(helpCommand)
  commandRegistry.register(aboutCommand)
  commandRegistry.register(skillsCommand)
  commandRegistry.register(projectsCommand)
  commandRegistry.register(contactCommand)
  commandRegistry.register(githubCommand)
  commandRegistry.register(linkedinCommand)
  commandRegistry.register(clearCommand)
  commandRegistry.register(neoCommand)
}

export { registerBuiltInCommands }
