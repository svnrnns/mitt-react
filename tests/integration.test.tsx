import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, act } from "@testing-library/react";
import { useEventEmit } from "../src";
import { EventListenerComponent } from "./helpers";

describe("integration: useEventEmit + useEventListener", () => {
  describe("basic communication", () => {
    it("should allow emitting and listening within React components", () => {
      const handler = vi.fn();
      render(
        <EventListenerComponent
          eventName="integration-event"
          onEvent={handler}
        />
      );

      act(() => {
        useEventEmit("integration-event", { integrated: true });
      });

      expect(handler).toHaveBeenCalledWith({ integrated: true });
    });

    it("should handle events emitted before listener mounts", () => {
      const handler = vi.fn();

      // Emit before rendering listener
      useEventEmit("early-event", "early data");

      render(
        <EventListenerComponent eventName="early-event" onEvent={handler} />
      );

      // Listener missed the early event
      expect(handler).not.toHaveBeenCalled();

      // But can receive new events
      useEventEmit("early-event", "late data");
      expect(handler).toHaveBeenCalledWith("late data");
    });
  });

  describe("performance", () => {
    it("should handle rapid event emission", () => {
      const handler = vi.fn();
      render(
        <EventListenerComponent eventName="rapid-event" onEvent={handler} />
      );

      act(() => {
        for (let i = 0; i < 100; i++) {
          useEventEmit("rapid-event", i);
        }
      });

      expect(handler).toHaveBeenCalledTimes(100);
    });

    it("should handle concurrent listeners with rapid events", () => {
      const handlers = Array.from({ length: 10 }, () => vi.fn());

      render(
        <>
          {handlers.map((handler, i) => (
            <EventListenerComponent
              key={i}
              eventName="concurrent-event"
              onEvent={handler}
            />
          ))}
        </>
      );

      act(() => {
        for (let i = 0; i < 50; i++) {
          useEventEmit("concurrent-event", i);
        }
      });

      handlers.forEach((handler) => {
        expect(handler).toHaveBeenCalledTimes(50);
      });
    });
  });

  describe("edge cases", () => {
    it("should work with undefined data", () => {
      const handler = vi.fn();
      render(
        <EventListenerComponent eventName="undefined-event" onEvent={handler} />
      );

      act(() => {
        useEventEmit("undefined-event", undefined);
      });

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(undefined);
    });

    it("should work with null data", () => {
      const handler = vi.fn();
      render(
        <EventListenerComponent eventName="null-event" onEvent={handler} />
      );

      act(() => {
        useEventEmit("null-event", null);
      });

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(null);
    });

    it("should work with boolean data", () => {
      const handler = vi.fn();
      render(
        <EventListenerComponent eventName="bool-event" onEvent={handler} />
      );

      act(() => {
        useEventEmit("bool-event", true);
        useEventEmit("bool-event", false);
      });

      expect(handler).toHaveBeenCalledTimes(2);
      expect(handler).toHaveBeenNthCalledWith(1, true);
      expect(handler).toHaveBeenNthCalledWith(2, false);
    });

    it("should work with empty string data", () => {
      const handler = vi.fn();
      render(
        <EventListenerComponent eventName="empty-string" onEvent={handler} />
      );

      act(() => {
        useEventEmit("empty-string", "");
      });

      expect(handler).toHaveBeenCalledWith("");
    });

    it("should work with zero as data", () => {
      const handler = vi.fn();
      render(
        <EventListenerComponent eventName="zero-event" onEvent={handler} />
      );

      act(() => {
        useEventEmit("zero-event", 0);
      });

      expect(handler).toHaveBeenCalledWith(0);
    });

    it("should handle special characters in event names", () => {
      const handler = vi.fn();
      const eventName = "event:with:colons.and.dots-and-dashes_and_underscores";

      render(
        <EventListenerComponent eventName={eventName} onEvent={handler} />
      );

      act(() => {
        useEventEmit(eventName, "special");
      });

      expect(handler).toHaveBeenCalledWith("special");
    });
  });
});
