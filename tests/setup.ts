import { beforeEach, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import emitter from "../src/emitter";

/**
 * Global test setup for mitt-react
 * Ensures clean state between tests
 */

beforeEach(() => {
  // Clear all event listeners before each test
  emitter.all.clear();
});

afterEach(() => {
  // Cleanup React Testing Library
  cleanup();
});

