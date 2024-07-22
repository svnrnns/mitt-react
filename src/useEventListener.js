import emitter from './emitter';
import { useEffect, useCallback } from 'react';

export function useEventListener(eventName, handler) {
  const memoizedHandler = useCallback(handler, [handler]);

  useEffect(() => {
    emitter.on(eventName, memoizedHandler);
    return () => {
      emitter.off(eventName, memoizedHandler);
    };
  }, [eventName, memoizedHandler]);
}
