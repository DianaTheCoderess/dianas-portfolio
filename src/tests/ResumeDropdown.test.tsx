import { ResumeDropdown } from "@/components/ResumeDropdown"
import { fireEvent, render, screen } from "@testing-library/react"
import type React from "react"
import { describe, expect, it, vi } from "vitest"

// Mock the Dropdown component since we can't easily test the actual dropdown in JSDOM
vi.mock("@/components/ui/Dropdown", () => {
  return {
    DropdownMenu: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="dropdown-menu">{children}</div>
    ),
    DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="dropdown-trigger">{children}</div>
    ),
    DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="dropdown-content">{children}</div>
    ),
    DropdownMenuItem: ({
      children,
      onClick,
      ...props
    }: {
      children: React.ReactNode
      onClick?: () => void
    }) => {
      // This implementation ensures onClick is properly handled
      return (
        <button data-testid="dropdown-item" onClick={onClick} {...props}>
          {children}
        </button>
      )
    },
  }
})

describe("ResumeDropdown", () => {
  const mockOnOpen = vi.fn()
  const mockOnDownload = vi.fn()

  it("renders dropdown button", () => {
    render(<ResumeDropdown onOpen={mockOnOpen} onDownload={mockOnDownload} />)
    expect(screen.getByTestId("dropdown-trigger")).toBeInTheDocument()
  })

  it("renders dropdown items", () => {
    render(<ResumeDropdown onOpen={mockOnOpen} onDownload={mockOnDownload} />)

    // With our mock, dropdown items are always rendered
    const items = screen.getAllByTestId("dropdown-item")
    expect(items.length).toBe(2)
  })

  it("calls onOpen when view option is clicked", () => {
    render(<ResumeDropdown onOpen={mockOnOpen} onDownload={mockOnDownload} />)

    // Get the Open in Browser button by text
    const viewButton = screen.getByText(/open in browser/i)
    fireEvent.click(viewButton)

    // Check that onOpen was called
    expect(mockOnOpen).toHaveBeenCalled()
  })

  it("calls onDownload when download option is clicked", () => {
    render(<ResumeDropdown onOpen={mockOnOpen} onDownload={mockOnDownload} />)

    // Get the Download HTML button by text
    const downloadButton = screen.getByText(/download html/i)
    fireEvent.click(downloadButton)

    // Check that onDownload was called
    expect(mockOnDownload).toHaveBeenCalled()
  })

  it("includes download icon", () => {
    render(<ResumeDropdown onOpen={mockOnOpen} onDownload={mockOnDownload} />)

    // Check for SVG element or icon element
    const downloadIcon = document.querySelector(
      '[data-testid="dropdown-item"] svg',
    )
    expect(downloadIcon).toBeInTheDocument()
  })
})
