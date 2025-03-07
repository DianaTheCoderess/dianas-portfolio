import { Button } from "@/components/ui/Button"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it("renders with different variants", () => {
    render(
      <>
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </>,
    )

    // Verify all buttons render with correct text
    expect(screen.getByRole("button", { name: "Default" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Outline" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Ghost" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Link" })).toBeInTheDocument()
  })

  it("renders with different sizes", () => {
    render(
      <>
        <Button size="default">Default</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">Icon</Button>
      </>,
    )

    // Verify all buttons render with correct text
    expect(screen.getByRole("button", { name: "Default" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Small" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Large" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Icon" })).toBeInTheDocument()
  })

  it("applies additional className", () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole("button", { name: "Custom" })
    expect(button).toHaveClass("custom-class")
  })

  it("forwards additional props", () => {
    render(
      <Button disabled aria-label="Test button">
        Disabled
      </Button>,
    )
    // Use getByLabelText instead of getByRole with name
    const button = screen.getByLabelText("Test button")
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-label", "Test button")
  })
})
