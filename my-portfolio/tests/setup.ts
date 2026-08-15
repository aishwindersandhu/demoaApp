import '@testing-library/jest-dom/vitest';
import { vi, beforeEach, afterEach } from 'vitest';

beforeEach(() => {
  // jsdom does not implement these — stub them so components that call them don't throw.
  Element.prototype.scrollBy = vi.fn();
  URL.createObjectURL = vi.fn(() => 'blob:mock-url');
  URL.revokeObjectURL = vi.fn();
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});
