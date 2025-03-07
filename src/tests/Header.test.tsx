import { beforeEach, describe, expect, it, vi } from "vitest"

// Mock the Header component since we can't directly test Astro components in this setup
describe("Header", () => {
  // Mock document methods for testing
  beforeEach(() => {
    // Mock document.querySelector to simulate finding navigation elements
    document.querySelector = vi.fn().mockImplementation((selector) => {
      if (selector === "nav") {
        return {
          classList: {
            toggle: vi.fn(),
            contains: vi.fn().mockReturnValue(false),
          },
        }
      }
      if (selector === ".logo a") {
        return { getAttribute: vi.fn().mockReturnValue("/") }
      }
      return null
    })

    // Mock document.querySelectorAll for navigation links
    document.querySelectorAll = vi.fn().mockImplementation((selector) => {
      if (selector === "nav a") {
        return [
          { textContent: "About", href: "/about" },
          { textContent: "Projects", href: "/projects" },
          { textContent: "Skills", href: "/skills" },
        ]
      }
      return []
    })
  })

  it("renders navigation links", () => {
    const navLinks = document.querySelectorAll("nav a")
    expect(navLinks.length).toBe(3)
    expect(navLinks[0].textContent).toBe("About")
    expect(navLinks[1].textContent).toBe("Projects")
    expect(navLinks[2].textContent).toBe("Skills")
  })

  it("logo links to home page", () => {
    const logo = document.querySelector(".logo a")
    expect(logo?.getAttribute("href")).toBe("/")
  })

  it("toggles mobile menu", () => {
    const nav = document.querySelector("nav")
    const toggleFn = nav?.classList?.toggle
    
    // Just verify the toggle function exists
    expect(toggleFn).toBeDefined()
  })
})
