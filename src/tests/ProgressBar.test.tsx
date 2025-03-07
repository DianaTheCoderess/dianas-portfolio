import { ProgressBar } from "@/components/ProgressBar"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

describe("ProgressBar", () => {
  it("renders with correct width", () => {
    render(<ProgressBar progress={50} />)
    const progressBar = screen.getByTestId("loading-progress")
    expect(progressBar).toBeInTheDocument()
    
    // Find the inner progress elements with transform style
    const innerBars = progressBar.querySelectorAll("div[style*='transform: scaleX(0.5)']")
    expect(innerBars.length).toBeGreaterThan(0)
  })

  it("shows correct aria attributes", () => {
    render(<ProgressBar progress={75} />)
    const progressBar = screen.getByTestId("loading-progress")
    expect(progressBar).toHaveAttribute("aria-valuenow", "75")
    expect(progressBar).toHaveAttribute("aria-valuemin", "0")
    expect(progressBar).toHaveAttribute("aria-valuemax", "100")
  })

  it("handles 0% progress", () => {
    render(<ProgressBar progress={0} />)
    const progressBar = screen.getByTestId("loading-progress")
    const innerBars = progressBar.querySelectorAll("div[style*='transform: scaleX(0)']")
    expect(innerBars.length).toBeGreaterThan(0)
  })

  it("handles 100% progress", () => {
    render(<ProgressBar progress={100} />)
    const progressBar = screen.getByTestId("loading-progress")
    const innerBars = progressBar.querySelectorAll("div[style*='transform: scaleX(1)']")
    expect(innerBars.length).toBeGreaterThan(0)
  })

  it("applies correct styling", () => {
    render(<ProgressBar progress={50} />)
    const progressBar = screen.getByTestId("loading-progress")
    expect(progressBar).toHaveClass("relative h-1.5 sm:h-2")
  })
})
