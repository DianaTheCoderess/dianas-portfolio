import { Link } from "@/components/ui/Link"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

describe("Link", () => {
  it("renders with default variant and size", () => {
    render(<Link href="/test">Click me</Link>)
    const link = screen.getByRole("link", { name: /click me/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/test")
  })

  it("renders with different variants", () => {
    render(
      <>
        <Link href="/test1" variant="default">
          Default
        </Link>
        <Link href="/test3" variant="outline">
          Outline
        </Link>
        <Link href="/test5" variant="ghost">
          Ghost
        </Link>
        <Link href="/test6" variant="link">
          Link
        </Link>
      </>,
    )

    // Verify all links render with correct hrefs
    expect(screen.getByRole("link", { name: "Default" })).toHaveAttribute("href", "/test1")
    expect(screen.getByRole("link", { name: "Outline" })).toHaveAttribute("href", "/test3")
    expect(screen.getByRole("link", { name: "Ghost" })).toHaveAttribute("href", "/test5")
    expect(screen.getByRole("link", { name: "Link" })).toHaveAttribute("href", "/test6")
  })

  it("renders with different sizes", () => {
    render(
      <>
        <Link href="/size1" size="default">
          Default
        </Link>
        <Link href="/size2" size="sm">
          Small
        </Link>
        <Link href="/size3" size="lg">
          Large
        </Link>
        <Link href="/size4" size="icon">
          Icon
        </Link>
      </>,
    )

    // Verify all links render with correct hrefs
    expect(screen.getByRole("link", { name: "Default" })).toHaveAttribute("href", "/size1")
    expect(screen.getByRole("link", { name: "Small" })).toHaveAttribute("href", "/size2")
    expect(screen.getByRole("link", { name: "Large" })).toHaveAttribute("href", "/size3")
    expect(screen.getByRole("link", { name: "Icon" })).toHaveAttribute("href", "/size4")
  })

  it("applies additional className", () => {
    render(
      <Link href="/test" className="custom-class">
        Custom
      </Link>,
    )
    const link = screen.getByRole("link", { name: "Custom" })
    expect(link).toHaveClass("custom-class")
  })

  it("forwards additional props", () => {
    render(
      <Link href="/test" target="_blank" rel="noopener noreferrer">
        External
      </Link>,
    )
    const link = screen.getByRole("link", { name: "External" })
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })
})
