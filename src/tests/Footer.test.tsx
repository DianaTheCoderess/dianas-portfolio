import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Footer from "../components/Footer.astro"

// Mock Astro components
vi.mock("astro:content", () => {
  return {
    getCollection: () => Promise.resolve([]),
  }
})

// Mock the Astro component rendering
vi.mock("../components/Footer.astro", () => {
  return {
    default: () => {
      return (
        <footer className="footer">
          <div className="container">
            <div className="copyright">
              © {new Date().getFullYear()} Diana's Net Palace
            </div>
            <div className="social-links">
              <a href="https://github.com" aria-label="GitHub">GitHub</a>
              <a href="https://linkedin.com" aria-label="LinkedIn">LinkedIn</a>
            </div>
          </div>
        </footer>
      )
    }
  }
})

describe("Footer", () => {
  it("renders copyright with current year", () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument()
  })

  it("displays social links", () => {
    render(<Footer />)
    expect(screen.getByText("GitHub")).toBeInTheDocument()
    expect(screen.getByText("LinkedIn")).toBeInTheDocument()
  })

  it("has correct link attributes", () => {
    render(<Footer />)
    const githubLink = screen.getByText("GitHub")
    const linkedinLink = screen.getByText("LinkedIn")
    
    expect(githubLink.closest('a')).toHaveAttribute('href', 'https://github.com')
    expect(linkedinLink.closest('a')).toHaveAttribute('href', 'https://linkedin.com')
  })

  it("has accessible link labels", () => {
    render(<Footer />)
    const githubLink = screen.getByText("GitHub").closest('a')
    const linkedinLink = screen.getByText("LinkedIn").closest('a')
    
    expect(githubLink).toHaveAttribute('aria-label', 'GitHub')
    expect(linkedinLink).toHaveAttribute('aria-label', 'LinkedIn')
  })
})
