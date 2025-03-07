import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TechStack } from '../components/TechStack'

describe('TechStack', () => {
  const mockTechnologies = ['React', 'TypeScript', 'Node.js']

  it('renders all technologies', () => {
    render(<TechStack technologies={mockTechnologies} />)
    mockTechnologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument()
    })
  })

  it('updates technologies periodically', async () => {
    const { rerender } = render(<TechStack technologies={mockTechnologies} />)
    const initialTechs = screen.getAllByRole('generic').map(el => el.textContent)
    
    // Wait for update interval
    await new Promise(r => setTimeout(r, 4100))
    rerender(<TechStack technologies={mockTechnologies} />)
    
    const updatedTechs = screen.getAllByRole('generic').map(el => el.textContent)
    expect(updatedTechs).not.toEqual(initialTechs)
  })
})
