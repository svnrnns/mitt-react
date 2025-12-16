import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import emitter from "../src/emitter";
import { EventListenerComponent } from "./helpers";

describe("useEventListener", () => {
  describe("event registration", () => {
    it("should register an event listener", () => {
      const handler = vi.fn();
      render(
        <EventListenerComponent eventName="test-event" onEvent={handler} />
      );

      emitter.emit("test-event", { data: "test" });

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({ data: "test" });
    });

    it("should handle multiple sequential events", () => {
      const handler = vi.fn();
      render(
        <EventListenerComponent eventName="multi-event" onEvent={handler} />
      );

      emitter.emit("multi-event", "first");
      emitter.emit("multi-event", "second");
      emitter.emit("multi-event", "third");

      expect(handler).toHaveBeenCalledTimes(3);
      expect(handler).toHaveBeenNthCalledWith(1, "first");
      expect(handler).toHaveBeenNthCalledWith(2, "second");
      expect(handler).toHaveBeenNthCalledWith(3, "third");
    });
  });

  describe("cleanup behavior", () => {
    it("should cleanup listener on unmount", () => {
      const handler = vi.fn();
      const { unmount } = render(
        <EventListenerComponent eventName="cleanup-event" onEvent={handler} />
      );

      emitter.emit("cleanup-event", "before unmount");
      expect(handler).toHaveBeenCalledTimes(1);

      unmount();

      emitter.emit("cleanup-event", "after unmount");
      // Should not have been called again after unmount
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should not leak listeners after multiple mount/unmount cycles", () => {
      const handler = vi.fn();

      for (let i = 0; i < 5; i++) {
        const { unmount } = render(
          <EventListenerComponent eventName="leak-test" onEvent={handler} />
        );
        unmount();
      }

      emitter.emit("leak-test", "after cycles");
      // No listeners should remain
      expect(handler).toHaveBeenCalledTimes(0);
    });
  });

  describe("dynamic event handling", () => {
    it("should handle event name changes", () => {
      const handler = vi.fn();
      const { rerender } = render(
        <EventListenerComponent eventName="event-a" onEvent={handler} />
      );

      emitter.emit("event-a", "a");
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenLastCalledWith("a");

      rerender(
        <EventListenerComponent eventName="event-b" onEvent={handler} />
      );

      // Old event should not trigger handler
      emitter.emit("event-a", "a-again");
      expect(handler).toHaveBeenCalledTimes(1);

      // New event should trigger handler
      emitter.emit("event-b", "b");
      expect(handler).toHaveBeenCalledTimes(2);
      expect(handler).toHaveBeenLastCalledWith("b");
    });

    it("should handle handler changes", () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      const { rerender } = render(
        <EventListenerComponent eventName="handler-change" onEvent={handler1} />
      );

      emitter.emit("handler-change", "first");
      expect(handler1).toHaveBeenCalledTimes(1);

      rerender(
        <EventListenerComponent eventName="handler-change" onEvent={handler2} />
      );

      emitter.emit("handler-change", "second");
      expect(handler2).toHaveBeenCalledTimes(1);
    });
  });

  describe("multiple listeners", () => {
    it("should support multiple listeners for the same event", () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      render(
        <>
          <EventListenerComponent eventName="shared-event" onEvent={handler1} />
          <EventListenerComponent eventName="shared-event" onEvent={handler2} />
        </>
      );

      emitter.emit("shared-event", "shared data");

      expect(handler1).toHaveBeenCalledWith("shared data");
      expect(handler2).toHaveBeenCalledWith("shared data");
    });

    it("should support different listeners for different events", () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      render(
        <>
          <EventListenerComponent eventName="event-1" onEvent={handler1} />
          <EventListenerComponent eventName="event-2" onEvent={handler2} />
        </>
      );

      emitter.emit("event-1", "data-1");
      emitter.emit("event-2", "data-2");

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler1).toHaveBeenCalledWith("data-1");
      expect(handler2).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledWith("data-2");
    });

    it("should handle partial unmount correctly", () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      const { rerender } = render(
        <>
          <EventListenerComponent
            eventName="partial-event"
            onEvent={handler1}
          />
          <EventListenerComponent
            eventName="partial-event"
            onEvent={handler2}
          />
        </>
      );

      emitter.emit("partial-event", "both listening");
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);

      // Remove one listener
      rerender(
        <EventListenerComponent eventName="partial-event" onEvent={handler1} />
      );

      emitter.emit("partial-event", "only one listening");
      expect(handler1).toHaveBeenCalledTimes(2);
      expect(handler2).toHaveBeenCalledTimes(1);
    });
  });
});
