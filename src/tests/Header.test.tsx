import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Header from '../components/Header.astro'

describe('Header', () => {
  it('renders navigation links', () => {
    render(Header)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })

  it('toggles mobile menu', () => {
    render(Header)
    const menuButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(menuButton)
    expect(screen.getByRole('navigation')).toHaveClass('visible')
  })

  it('handles logo click', () => {
    render(Header)
    const logo = screen.getByText("Diana's NetPalace")
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })
})
