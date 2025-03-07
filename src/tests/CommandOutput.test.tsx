import { CommandOutput } from "@/components/CommandOutput"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

describe("CommandOutput", () => {
  it("renders text output correctly", () => {
    render(<CommandOutput output="Test command output" />)
    expect(screen.getByText("Test command output")).toBeInTheDocument()
  })

  it("renders error output with error styling", () => {
    render(<CommandOutput output="Error message" isError={true} />)
    const output = screen.getByText("Error message")
    expect(output).toBeInTheDocument()
    expect(output).toHaveClass("text-red-500")
  })

  it("renders complex output objects", () => {
    const complexOutput = {
      type: "list",
      items: ["item1", "item2", "item3"]
    }
    
    render(<CommandOutput output={complexOutput} />)
    // This test assumes the component can handle object output
    // and converts it to a string representation
    expect(screen.getByText(/item1/)).toBeInTheDocument()
    expect(screen.getByText(/item2/)).toBeInTheDocument()
    expect(screen.getByText(/item3/)).toBeInTheDocument()
  })
})
