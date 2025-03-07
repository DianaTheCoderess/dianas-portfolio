import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Button } from "@/components/ui/Button"

describe("Button", () => {
  it("renders with default variant and size", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("bg-primary")
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
    
    expect(screen.getByText("Default")).toHaveClass("bg-primary")
    expect(screen.getByText("Destructive")).toHaveClass("bg-destructive")
    expect(screen.getByText("Outline")).toHaveClass("border")
    expect(screen.getByText("Secondary")).toHaveClass("bg-secondary")
    expect(screen.getByText("Ghost")).toHaveClass("hover:bg-accent")
    expect(screen.getByText("Link")).toHaveClass("text-primary")
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
    
    expect(screen.getByText("Default")).toHaveClass("h-9 px-4 py-2")
    expect(screen.getByText("Small")).toHaveClass("h-8 px-3")
    expect(screen.getByText("Large")).toHaveClass("h-10 px-8")
    expect(screen.getByText("Icon")).toHaveClass("h-9 w-9")
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
