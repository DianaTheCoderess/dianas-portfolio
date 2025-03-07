// This file sets up the DOM environment for tests
import { beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Setup a fake DOM environment for tests
beforeAll(() => {
  // Create required DOM elements that might be missing in the test environment
  if (!global.document.getElementById('root')) {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }
});

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Clean up after all tests
afterAll(() => {
  document.body.innerHTML = '';
});
