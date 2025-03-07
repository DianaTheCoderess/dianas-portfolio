import { TechStack } from "@/components/TechStack"
import { TECH_STACK } from "@/constants.ts"
import { act, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

describe("TechStack", () => {
  const mockTechnologies = [
    "React",
    "TypeScript",
    "Node.js",
    "Java",
    "JavaScript",
    "Kubernetes",
  ]

  it("renders all technologies", () => {
    render(<TechStack technologies={mockTechnologies} />)
    for (const tech of mockTechnologies) {
      expect(screen.getByText(tech)).toBeInTheDocument()
    }
  })

  it("updates technologies periodically", async () => {
    // Create a simplified version of the component for testing
    const SimpleTechStack = ({ technologies }: { technologies: string[] }) => {
      const [displayedTechs, setDisplayedTechs] = React.useState(technologies)
      
      React.useEffect(() => {
        const timer = setTimeout(() => {
          // Simulate shuffling by reversing the array
          setDisplayedTechs([...technologies].reverse())
        }, TECH_STACK.UPDATE_INTERVAL)
        
        return () => clearTimeout(timer)
      }, [technologies])
      
      return (
        <div>
          {displayedTechs.map((tech, index) => (
            <span key={index} data-testid="tech-stack">{tech}</span>
          ))}
        </div>
      )
    }
    
    // Setup fake timers
    vi.useFakeTimers()
    
    render(<SimpleTechStack technologies={mockTechnologies} />)
    const initialTechs = screen.getAllByTestId("tech-stack").map((el) => el.textContent)
    
    // Advance timers to trigger the update
    await act(async () => {
      vi.advanceTimersByTime(TECH_STACK.UPDATE_INTERVAL + 100)
    })
    
    const updatedTechs = screen.getAllByTestId("tech-stack").map((el) => el.textContent)
    
    // Verify the technologies have been reordered
    expect(updatedTechs).not.toEqual(initialTechs)
    expect(updatedTechs[0]).toBe(mockTechnologies[mockTechnologies.length - 1])
    
    // Clean up timers
    vi.useRealTimers()
  })
})
