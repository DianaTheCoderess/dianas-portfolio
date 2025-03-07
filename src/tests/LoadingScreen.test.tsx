import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LoadingScreen from '../components/LoadingScreen'

describe('LoadingScreen', () => {
  it('renders initially', () => {
    render(<LoadingScreen />)
    expect(screen.getByLabelText('Loading screen')).toBeInTheDocument()
  })

  it('shows progress bar', () => {
    render(<LoadingScreen />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('displays loading messages', () => {
    render(<LoadingScreen />)
    expect(screen.getByText(/initiating_portfolio.sh/)).toBeInTheDocument()
  })

  it('transitions out when complete', async () => {
    const { container } = render(<LoadingScreen />)
    // Wait for loading to complete
    await new Promise(r => setTimeout(r, 2500))
    expect(container.firstChild).toBeNull()
  })
})
