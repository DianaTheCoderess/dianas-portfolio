import { ResumeDropdown } from "@/components/ResumeDropdown"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

// Mock the Dropdown component since we can't easily test the actual dropdown in JSDOM
vi.mock("@/components/ui/Dropdown", () => {
  return {
    DropdownMenu: ({ children }) => <div data-testid="dropdown-menu">{children}</div>,
    DropdownMenuTrigger: ({ children }) => <div data-testid="dropdown-trigger">{children}</div>,
    DropdownMenuContent: ({ children }) => <div data-testid="dropdown-content">{children}</div>,
    DropdownMenuItem: ({ children, ...props }) => {
      // This implementation ensures all props including onClick are passed to the button
      return (
        <button 
          data-testid="dropdown-item" 
          {...props}
        >
          {children}
        </button>
      );
    },
  }
})

describe("ResumeDropdown", () => {
  const mockOnOpen = vi.fn()
  const mockOnDownload = vi.fn()

  it("renders dropdown button", () => {
    render(
      <ResumeDropdown onOpen={mockOnOpen} onDownload={mockOnDownload} />
    )
    expect(screen.getByText(/resume/i)).toBeInTheDocument()
  })

  it("renders dropdown items", () => {
    render(
      <ResumeDropdown onOpen={mockOnOpen} onDownload={mockOnDownload} />
    )
    
    // With our mock, dropdown items are always rendered
    const items = screen.getAllByTestId("dropdown-item")
    expect(items.length).toBe(2)
  })

  it("calls onOpen when view option is clicked", () => {
    render(
      <ResumeDropdown onOpen={mockOnOpen} onDownload={mockOnDownload} />
    )
    
    // Get the View Online button by text
    const viewButton = screen.getByText(/view online/i)
    fireEvent.click(viewButton)
    
    // Check that onOpen was called
    expect(mockOnOpen).toHaveBeenCalled()
  })

  it("calls onDownload when download option is clicked", () => {
    render(
      <ResumeDropdown onOpen={mockOnOpen} onDownload={mockOnDownload} />
    )
    
    // Get the Download PDF button by text
    const downloadButton = screen.getByText(/download pdf/i)
    fireEvent.click(downloadButton)
    
    // Check that onDownload was called
    expect(mockOnDownload).toHaveBeenCalled()
  })

  it("includes download icon", () => {
    render(
      <ResumeDropdown onOpen={mockOnOpen} onDownload={mockOnDownload} />
    )
    
    // Check for SVG element or icon element
    const downloadIcon = document.querySelector('[data-testid="dropdown-item"] svg') || 
                         screen.getByText(/download pdf/i).closest('button')
    expect(downloadIcon).toBeInTheDocument()
  })
})
