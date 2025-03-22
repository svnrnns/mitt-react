import { useEventEmit } from "./useEventEmit";
import { useEventListener } from "./useEventListener";

const eventEmit = useEventEmit;

export { useEventEmit, useEventListener, eventEmit };

// TypeScript
import { EventMap, EventCallback } from "./types";
export type { EventMap, EventCallback };
