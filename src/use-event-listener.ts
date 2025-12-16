import emitter from "./emitter";
import { useEffect, useCallback } from "react";
import { type EventCallback } from "./types";

/**
 * Registers event listeners using lifecycle hooks.
 * @param event - The event name to listen for.
 * @param callback - The callback to invoke when the event is emitted.
 */
export function useEventListener(eventName: string, handler: EventCallback) {
  const memoizedHandler = useCallback(handler, [handler]);

  useEffect(() => {
    emitter.on(eventName, memoizedHandler);
    return () => {
      emitter.off(eventName, memoizedHandler);
    };
  }, [eventName, memoizedHandler]);
}
