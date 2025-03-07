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
    
    // Mock the shuffle function to return a predictable result
    const originalShuffle = Array.prototype.sort;
    const mockShuffle = vi.fn(() => {
      // Return a reversed array to ensure it's different
      return mockTechnologies.slice().reverse();
    });
    
    // Apply the mock
    Array.prototype.sort = mockShuffle;
    
    const { rerender } = render(<TechStack technologies={mockTechnologies} />)
    const initialTechs = screen.getAllByTestId("tech-stack").map((el) => el.textContent)

    // Advance timers instead of using real setTimeout
    await act(async () => {
      vi.advanceTimersByTime(TECH_STACK.UPDATE_INTERVAL + 100)
    })
    rerender(<TechStack technologies={mockTechnologies} />)

    const updatedTechs = screen.getAllByTestId("tech-stack").map((el) => el.textContent)

    // Restore the original shuffle function
    Array.prototype.sort = originalShuffle;
    
    // Verify the technologies have been reordered
    expect(updatedTechs).not.toEqual(initialTechs)
    expect(updatedTechs[0]).not.toEqual(initialTechs[0])
    
    // Clean up timers
    vi.useRealTimers()
  })
})
