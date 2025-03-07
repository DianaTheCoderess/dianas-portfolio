import AnimatedBackground from "@/components/AnimatedBackground"
import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

describe("AnimatedBackground", () => {
  it("renders canvas element", () => {
    const { container } = render(<AnimatedBackground />)
    expect(container.querySelector("canvas")).toBeInTheDocument()
  })

  it("handles window resize", () => {
    const { container } = render(<AnimatedBackground />)
    window.dispatchEvent(new Event("resize"))
    const canvas = container.querySelector("canvas")
    expect(canvas).toHaveAttribute("width")
    expect(canvas).toHaveAttribute("height")
  })

  it("handles mouse movement", () => {
    // Mock requestAnimationFrame before rendering
    const animationFrame = vi.spyOn(window, "requestAnimationFrame")

    // Render the component
    render(<AnimatedBackground />)

    // Trigger mouse movement
    window.dispatchEvent(
      new MouseEvent("mousemove", {
        clientX: 100,
        clientY: 100,
      }),
    )

    // Verify animation frame was requested
    expect(animationFrame).toHaveBeenCalled()
  })
})
