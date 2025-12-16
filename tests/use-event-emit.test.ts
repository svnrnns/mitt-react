import { describe, it, expect, vi } from "vitest";
import { useEventEmit, eventEmit } from "../src";
import emitter from "../src/emitter";

describe("useEventEmit", () => {
  it("should emit an event", () => {
    const handler = vi.fn();
    emitter.on("test-event", handler);

    useEventEmit("test-event");

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("should emit an event with data", () => {
    const handler = vi.fn();
    emitter.on("test-event", handler);

    useEventEmit("test-event", { message: "hello" });

    expect(handler).toHaveBeenCalledWith({ message: "hello" });
  });

  it("should emit events with string data", () => {
    const handler = vi.fn();
    emitter.on("test-event", handler);

    useEventEmit("test-event", "string data");

    expect(handler).toHaveBeenCalledWith("string data");
  });

  it("should emit events with number data", () => {
    const handler = vi.fn();
    emitter.on("test-event", handler);

    useEventEmit("test-event", 42);

    expect(handler).toHaveBeenCalledWith(42);
  });

  it("should emit events with array data", () => {
    const handler = vi.fn();
    emitter.on("test-event", handler);

    useEventEmit("test-event", [1, 2, 3]);

    expect(handler).toHaveBeenCalledWith([1, 2, 3]);
  });

  it("should emit events with complex nested objects", () => {
    const handler = vi.fn();
    emitter.on("test-event", handler);

    const complexData = {
      user: { name: "John", age: 30 },
      items: [{ id: 1 }, { id: 2 }],
      metadata: { timestamp: Date.now() },
    };

    useEventEmit("test-event", complexData);

    expect(handler).toHaveBeenCalledWith(complexData);
  });
});

describe("eventEmit alias", () => {
  it("should be an alias for useEventEmit", () => {
    expect(eventEmit).toBe(useEventEmit);
  });

  it("should emit events just like useEventEmit", () => {
    const handler = vi.fn();
    emitter.on("alias-event", handler);

    eventEmit("alias-event", { test: true });

    expect(handler).toHaveBeenCalledWith({ test: true });
  });

  it("should emit events without data", () => {
    const handler = vi.fn();
    emitter.on("alias-event", handler);

    eventEmit("alias-event");

    expect(handler).toHaveBeenCalledTimes(1);
  });
});

