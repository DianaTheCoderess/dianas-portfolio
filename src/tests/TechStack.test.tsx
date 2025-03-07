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
    // Setup fake timers
    vi.useFakeTimers()
    
    const { rerender } = render(<TechStack technologies={mockTechnologies} />)
    const initialTechs = screen.getAllByTestId("tech-stack").map((el) => el.textContent)

    // Advance timers instead of using real setTimeout
    await act(async () => {
      vi.advanceTimersByTime(TECH_STACK.UPDATE_INTERVAL + 100)
    })
    rerender(<TechStack technologies={mockTechnologies} />)

    const updatedTechs = screen.getAllByTestId("tech-stack").map((el) => el.textContent)

    expect(updatedTechs).not.toEqual(initialTechs)
    
    // Clean up timers
    vi.useRealTimers()
  })
})
