import mitt, { Emitter } from "mitt";
import { type EventMap } from "./types";

const emitter: Emitter<EventMap> = mitt<EventMap>();
export default emitter;
