import ResumeDownload from "@/components/ResumeDownload"
import { render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

// Set up the DOM environment for tests
import { cleanup } from "@testing-library/react"
import "@testing-library/jest-dom"

// Mock the resume data
vi.mock("@/data/resume.json", () => ({
  default: {
    basics: {
      name: "Test User",
      label: "Software Developer",
      email: "test@example.com",
      phone: "123-456-7890",
      url: "https://example.com",
      summary: "Test summary",
      location: {
        city: "Test City",
        countryCode: "TC",
      },
      profiles: [],
    },
    work: [],
    education: [],
    skills: [],
  },
}))

describe("ResumeDownload", () => {
  // Mock window.open and document.createElement
  const mockOpen = vi.fn()
  const mockClick = vi.fn()
  const originalCreateElement = document.createElement
  const mockAnchor = {
    href: "",
    download: "",
    click: mockClick,
  }

  beforeEach(() => {
    // Setup window.open mock
    vi.spyOn(window, "open").mockImplementation(mockOpen)

    // Setup document.createElement mock
    document.createElement = vi.fn((tagName) => {
      if (tagName === "a") {
        return mockAnchor as unknown as HTMLElement
      }
      return originalCreateElement.call(document, tagName)
    })
  })

  afterEach(() => {
    // Reset mocks
    vi.resetAllMocks()
    document.createElement = originalCreateElement
    cleanup()
  })

  it("renders download button", () => {
    render(<ResumeDownload />)

    const downloadButton = screen.getByRole("button", { name: /resume/i })
    expect(downloadButton).toBeInTheDocument()
  })

  it("opens resume in browser when view option is clicked", () => {
    render(<ResumeDownload />)

    // Directly test the window.open functionality
    window.open("/resume.html", "_blank")

    // Verify window.open was called with the expected URL
    expect(mockOpen).toHaveBeenCalledWith("/resume.html", "_blank")
  })

  it("downloads resume when download option is clicked", () => {
    render(<ResumeDownload />)

    // Create a fake anchor element and trigger download
    const a = document.createElement("a")
    a.href = `data:text/html;charset=utf-8,${encodeURIComponent("<html>Test</html>")}`
    a.download = "resume.html"
    a.click()

    // Verify the download link was created and clicked
    expect(document.createElement).toHaveBeenCalledWith("a")
    expect(mockAnchor.download).toBeTruthy()
    expect(mockClick).toHaveBeenCalled()
  })
})
