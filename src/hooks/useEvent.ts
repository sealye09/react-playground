import { useCallback, useLayoutEffect, useRef } from "react";

export const useEvent = <T extends Event = Event>(handler: (event: T) => void) => {
  const savedHandler = useRef<typeof handler>();

  useLayoutEffect(() => {
    savedHandler.current = handler;
  });

  return useCallback((...args: Parameters<typeof handler>) => {
    if (!savedHandler || !savedHandler.current) return;

    const fn = savedHandler.current;
    return fn(...args);
  }, []);
};
