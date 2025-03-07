import LoadingScreen from "@/components/LoadingScreen"
import { act, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

// Mock the loading messages
vi.mock("@/data/loading_messages.txt", () => "initiating_portfolio.sh\nloading dependencies\nconfiguring environment");

describe("LoadingScreen", () => {
  it("renders initially", () => {
    render(<LoadingScreen />)
    expect(screen.getByLabelText("Loading screen")).toBeInTheDocument()
  })

  it("shows progress bar", () => {
    render(<LoadingScreen />)
    expect(screen.getByTestId("loading-progress")).toBeInTheDocument()
  })

  it("displays loading messages", () => {
    render(<LoadingScreen />)
    expect(screen.getByText(/initiating_portfolio.sh/)).toBeInTheDocument()
  })

  it("transitions out when complete", async () => {
    // Setup fake timers
    vi.useFakeTimers()

    const { container } = render(<LoadingScreen />)

    // Initial check - loading screen should be present
    expect(container.firstChild).not.toBeNull()

    // Fast-forward through all timers
    await act(async () => {
      vi.runAllTimers()
    })

    // Check that loading screen is removed
    expect(container.firstChild).toBeNull()
  })
})
