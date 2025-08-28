// Test setup file for Vitest
// Configure global test environment and utilities

import { beforeAll, afterAll } from 'vitest';

// Global test setup
beforeAll(() => {
  // Set test environment variables if needed
  process.env.NODE_ENV = 'test';
  
  // Suppress console.log during tests unless explicitly needed
  if (process.env.VITEST_VERBOSE !== 'true') {
    console.log = () => {};
  }
});

// Global test cleanup
afterAll(() => {
  // Clean up any test resources
});

// Global test utilities
export const testUtils = {
  // Helper to create mock behavior samples
  createBehavior: (overrides: Partial<any> = {}) => ({
    latencyMs: 800,
    switches: 0,
    hoverRefsMs: 0,
    underClockHit: true,
    ...overrides
  }),
  
  // Helper to wait for async operations
  wait: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Helper to create deterministic random numbers for testing
  seededRandom: (seed: number) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }
};
