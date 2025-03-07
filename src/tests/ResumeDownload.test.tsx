import ResumeDownload from "@/components/ResumeDownload"
import { fireEvent, render, screen } from "@testing-library/react"
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

  it("renders download button", () => {
    render(<ResumeDownload />)

    const downloadButton = screen.getByRole("button", { name: /resume/i })
    expect(downloadButton).toBeInTheDocument()
  })

  it("opens resume in browser when view option is clicked", () => {
    render(<ResumeDownload />)

    // Find and click the dropdown trigger

    const dropdownTrigger = screen.getByRole("button", { name: /resume/i })
    fireEvent.click(dropdownTrigger)
    // Find and click the "Open in Browser" option

    screen.debug()
    const viewOption = screen.getByText(/Open in Browser/i)
    fireEvent.click(viewOption)

    // Verify window.open was called
    expect(mockOpen).toHaveBeenCalled()
  })

  it("downloads resume when download option is clicked", () => {
    render(<ResumeDownload />)

    // Find and click the dropdown trigger
    const dropdownTrigger = screen.getByRole("button", { name: /resume/i })
    fireEvent.click(dropdownTrigger)

    // Find and click the "Download HTML" option
    const downloadOption = screen.getByText(/download html/i)
    fireEvent.click(downloadOption)

    // Verify the download link was created and clicked
    expect(document.createElement).toHaveBeenCalledWith("a")
    expect(mockClick).toHaveBeenCalled()
  })
})
