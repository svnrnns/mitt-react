import emitter from "./emitter";
import { type EventMap } from "./types";

/**
 * Emits an event with the given name and data.
 * @param eventName - The name of the event.
 * @param data - The data to emit with the event.
 */
export function useEventEmit<T extends keyof EventMap>(
  eventName: T,
  data?: EventMap[T]
): void {
  emitter.emit(eventName, data);
}
