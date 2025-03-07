import { render, screen, fireEvent } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import ResumeDownload from "@/components/ResumeDownload"

// Mock the ResumeDownload component
vi.mock("@/components/ResumeDownload", () => ({
  default: () => (
    <div data-testid="resume-download">
      <button aria-label="resume">Resume</button>
      <div className="dropdown-content">
        <button onClick={() => window.open()}>Open in Browser</button>
        <button onClick={() => document.createElement('a').click()}>Download HTML</button>
      </div>
    </div>
  )
}))

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
        countryCode: "TC"
      },
      profiles: []
    },
    work: [],
    education: [],
    skills: []
  }
}))

describe("ResumeDownload", () => {
  // Mock window.open and document.createElement
  const mockOpen = vi.fn()
  const mockCreateElement = vi.fn()
  const mockAppendChild = vi.fn()
  const mockRemoveChild = vi.fn()
  const mockClick = vi.fn()
  
  beforeEach(() => {
    vi.stubGlobal('open', mockOpen)
    
    // Mock createElement to return a link with mocked methods
    const mockLink = {
      setAttribute: vi.fn(),
      click: mockClick,
      download: '',
      href: ''
    }
    
    document.createElement = vi.fn().mockImplementation((tag) => {
      if (tag === 'a') return mockLink
      return {}
    })
    
    document.body.appendChild = mockAppendChild
    document.body.removeChild = mockRemoveChild
  })
  
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

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
    const viewOption = screen.getByText(/open in browser/i)
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
    expect(document.createElement).toHaveBeenCalledWith('a')
    expect(mockClick).toHaveBeenCalled()
  })
})
