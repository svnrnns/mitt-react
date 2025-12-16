import React from "react";
import { useEventListener, useEventEmit } from "../../src";

export interface EventListenerProps {
  eventName: string;
  onEvent: (data: unknown) => void;
}

export interface EventEmitterProps {
  eventName: string;
  data?: unknown;
}

/**
 * Test component that listens to events using useEventListener hook
 */
export function EventListenerComponent({
  eventName,
  onEvent,
}: EventListenerProps) {
  useEventListener(eventName, onEvent);
  return <div data-testid="listener">Listening to {eventName}</div>;
}

/**
 * Test component that emits events on render using useEventEmit
 */
export function EventEmitterComponent({ eventName, data }: EventEmitterProps) {
  useEventEmit(eventName, data);
  return <div data-testid="emitter">Emitted {eventName}</div>;
}
