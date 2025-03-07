// This file sets up the DOM environment for tests
import { beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Configure testing library
import { configure } from '@testing-library/react';

// Configure testing library
configure({
  testIdAttribute: 'data-testid',
});

// Setup a fake DOM environment for tests
beforeAll(() => {
  // Ensure document and body exist
  if (!global.document || !global.document.body) {
    throw new Error('DOM environment not properly set up');
  }
  
  // Create root element for React
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
});

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Clean up after all tests
afterAll(() => {
  if (global.document && global.document.body) {
    document.body.innerHTML = '';
  }
});
