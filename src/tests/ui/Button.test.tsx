import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Button } from "@/components/ui/Button"

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("bg-neon-pink")
  })

  it("renders with different variants", () => {
    render(
      <>
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </>
    )
    
    expect(screen.getByText("Default")).toHaveClass("bg-neon-pink")
    expect(screen.getByText("Destructive")).toHaveClass("bg-neon-pink")
    expect(screen.getByText("Outline")).toHaveClass("bg-neon-pink")
    expect(screen.getByText("Secondary")).toHaveClass("bg-neon-pink")
    expect(screen.getByText("Ghost")).toHaveClass("bg-neon-pink")
    expect(screen.getByText("Link")).toHaveClass("bg-neon-pink")
  })

  it("renders with different sizes", () => {
    render(
      <>
        <Button size="default">Default</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">Icon</Button>
      </>
    )
    
    expect(screen.getByText("Default")).toHaveClass("h-11")
    expect(screen.getByText("Small")).toHaveClass("h-11")
    expect(screen.getByText("Large")).toHaveClass("h-11")
    expect(screen.getByText("Icon")).toHaveClass("h-11")
  })

  it("applies additional className", () => {
    render(<Button className="custom-class">Custom</Button>)
    expect(screen.getByText("Custom")).toHaveClass("custom-class")
  })

  it("forwards additional props", () => {
    render(<Button disabled aria-label="Test button">Disabled</Button>)
    const button = screen.getByText("Disabled")
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-label", "Test button")
  })
})
