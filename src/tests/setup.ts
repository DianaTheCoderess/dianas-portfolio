import '@testing-library/jest-dom'
import { beforeAll, vi } from 'vitest'

// Mock window properties
beforeAll(() => {
  vi.mock('window', () => ({
    innerWidth: 1024,
    innerHeight: 768,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    requestAnimationFrame: vi.fn(),
    cancelAnimationFrame: vi.fn(),
  }))
})
