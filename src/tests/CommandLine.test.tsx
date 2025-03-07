import { CommandLine } from "@/components/CommandLine"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

describe("CommandLine", () => {
  const mockOnCommand = vi.fn()
  const mockOnHistoryChange = vi.fn()
  const mockCommandHistory = ["ls", "cd /home", "echo hello"]
  
  it("renders input field", () => {
    render(
      <CommandLine
        onCommand={mockOnCommand}
        commandHistory={mockCommandHistory}
        historyIndex={-1}
        onHistoryChange={mockOnHistoryChange}
      />
    )
    
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
  
  it("calls onCommand when Enter is pressed", () => {
    render(
      <CommandLine
        onCommand={mockOnCommand}
        commandHistory={mockCommandHistory}
        historyIndex={-1}
        onHistoryChange={mockOnHistoryChange}
      />
    )
    
    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "test command" } })
    fireEvent.keyDown(input, { key: "Enter" })
    
    expect(mockOnCommand).toHaveBeenCalledWith("test command")
  })
  
  it("navigates command history with arrow keys", () => {
    render(
      <CommandLine
        onCommand={mockOnCommand}
        commandHistory={mockCommandHistory}
        historyIndex={-1}
        onHistoryChange={mockOnHistoryChange}
      />
    )
    
    const input = screen.getByRole("textbox")
    
    // Press up arrow to go to last command
    fireEvent.keyDown(input, { key: "ArrowUp" })
    expect(mockOnHistoryChange).toHaveBeenCalledWith(2)
    
    // Reset mock to test down arrow
    mockOnHistoryChange.mockReset()
    
    // Press down arrow to go forward in history
    fireEvent.keyDown(input, { key: "ArrowDown" })
    expect(mockOnHistoryChange).toHaveBeenCalled()
  })
})
