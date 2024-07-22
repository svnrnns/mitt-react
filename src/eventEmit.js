import emitter from './emitter';

export function eventEmit(eventName, data) {
  emitter.emit(eventName, data);
}
