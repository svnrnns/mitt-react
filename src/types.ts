import { type EventType } from "mitt";

export type EventMap = Record<EventType, unknown>;
export type EventCallback = (...args: any[]) => void;
