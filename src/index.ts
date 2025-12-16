import { useEventEmit } from "./use-event-emit";
import { useEventListener } from "./use-event-listener";

const eventEmit = useEventEmit;

export { useEventEmit, useEventListener, eventEmit };

// TypeScript
import { EventMap, EventCallback } from "./types";
export type { EventMap, EventCallback };
