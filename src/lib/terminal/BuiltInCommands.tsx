import type React from "react"
import commandRegistry, { type TerminalCommand } from "./CommandRegistry"

// Helper function to create styled output
const createStyledOutput = (
  title: string,
  content: React.ReactNode,
): React.ReactNode => (
  <>
    <span style={{ color: "#ff3864" }}>{title}</span>
    {content}
  </>
)

// Register the help command
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

// Register the about command
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

// Register the skills command
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

// Register the projects command
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

// Register the contact command
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

// Register the github command
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

// Register the linkedin command
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

// Register the clear command
const clearCommand: TerminalCommand = {
  name: "clear",
  description: "Clear terminal",
  execute: () => {
    return {
      output: "",
      shouldClear: true,
    }
  },
}

// Matrix Neo command - simulates the famous scene from the movie with typewriter effect
const neoCommand: TerminalCommand = {
  name: "neo",
  description: "Wake up, Neo...",
  execute: () => {
    // We'll use setTimeout in the externalAction to create the typewriter effect
    return {
      output: "",
      shouldClear: true,
      externalAction: () => {
        const messages = [
          { text: "Wake up, Neo...", color: "#00f5ff", delay: 1000 },
          { text: "The Matrix has you...", color: "#00f5ff", delay: 3000 },
          { text: "Follow the white rabbit.", color: "#00f5ff", delay: 3000 },
          { text: "Knock, knock, Neo.", color: "#ff3864", delay: 3000 }
        ];
        
        // Get the terminal element to add messages to
        const terminalElement = document.querySelector(".react-terminal");
        if (!terminalElement) return;
        
        // Function to create and append a message with typewriter effect
        const typeMessage = (message: { text: string, color: string }, index: number) => {
          // Create a new line element
          const lineElement = document.createElement("div");
          lineElement.className = "react-terminal-line matrix-line";
          terminalElement.appendChild(lineElement);
          
          // Add the prompt character
          const promptSpan = document.createElement("span");
          promptSpan.style.color = message.color;
          promptSpan.textContent = "> ";
          lineElement.appendChild(promptSpan);
          
          // Type the message character by character
          let charIndex = 0;
          const typeChar = () => {
            if (charIndex < message.text.length) {
              lineElement.appendChild(document.createTextNode(message.text.charAt(charIndex)));
              charIndex++;
              setTimeout(typeChar, 100); // Adjust typing speed here
            } else if (index < messages.length - 1) {
              // Schedule the next message
              setTimeout(() => typeMessage(messages[index + 1], index + 1), message.delay);
            }
          };
          
          // Start typing
          typeChar();
        };
        
        // Start with the first message
        setTimeout(() => typeMessage(messages[0], 0), 500);
      }
    };
  },
}

// Register all built-in commands
export function registerBuiltInCommands(): void {
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
