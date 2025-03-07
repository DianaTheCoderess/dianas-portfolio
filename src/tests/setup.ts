import { cleanup } from "@testing-library/react";
import { beforeAll, beforeEach, afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// Mock window properties
beforeAll(() => {
  // We can't directly mock window, but we can mock its properties
  Object.defineProperties(window, {
    innerWidth: { value: 1024, writable: true },
    innerHeight: { value: 768, writable: true }
  });
  
  // Mock window methods
  vi.spyOn(window, 'addEventListener').mockImplementation(() => {});
  vi.spyOn(window, 'removeEventListener').mockImplementation(() => {});
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => setTimeout(() => cb(0), 0));
  
  // Ensure cancelAnimationFrame is properly mocked
  global.cancelAnimationFrame = vi.fn();
});

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.resetAllMocks();
  vi.useRealTimers();
  cleanup();
});
