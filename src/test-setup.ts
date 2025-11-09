import "@testing-library/jest-dom";

import { expect } from "vitest";

// Extend Vitest's expect with jest-dom matchers
declare global {
  namespace Vi {
    interface JestAssertion<T = any> extends jest.Matchers<void, T> {}
  }
}
