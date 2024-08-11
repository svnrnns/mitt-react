import emitter from './emitter';

export function useEventEmit(eventName, data) {
  emitter.emit(eventName, data);
}
