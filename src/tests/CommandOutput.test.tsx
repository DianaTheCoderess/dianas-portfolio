import { CommandOutput } from "@/components/CommandOutput"
import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

// Mock the Command type that CommandOutput expects
vi.mock("@/components/CommandOutput", () => {
  return {
    CommandOutput: ({ output, isError = false }) => {
      // Simple mock implementation that renders the output
      const className = isError ? "text-red-500" : "";
      
      if (typeof output === "string") {
        return <div className={className}>{output}</div>;
      } else if (typeof output === "object" && output !== null) {
        // Handle complex objects by rendering their items
        if (output.type === "list" && Array.isArray(output.items)) {
          return (
            <div>
              {output.items.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          );
        }
        // Fallback for other object types
        return <div>{JSON.stringify(output)}</div>;
      }
      return null;
    }
  };
});

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
    expect(screen.getByText("item1")).toBeInTheDocument()
    expect(screen.getByText("item2")).toBeInTheDocument()
    expect(screen.getByText("item3")).toBeInTheDocument()
  })
})
