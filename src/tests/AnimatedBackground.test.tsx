import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import AnimatedBackground from '../components/AnimatedBackground'

describe('AnimatedBackground', () => {
  it('renders canvas element', () => {
    const { container } = render(<AnimatedBackground />)
    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('handles window resize', () => {
    const { container } = render(<AnimatedBackground />)
    window.dispatchEvent(new Event('resize'))
    expect(container.querySelector('canvas')).toHaveAttribute('width')
    expect(container.querySelector('canvas')).toHaveAttribute('height')
  })

  it('handles mouse movement', () => {
    render(<AnimatedBackground />)
    window.dispatchEvent(new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 100
    }))
    // Animation should continue running
    expect(window.requestAnimationFrame).toHaveBeenCalled()
  })
})
