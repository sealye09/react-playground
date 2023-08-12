import { useRef } from "react";

export const useThrottle = (callback: Function, delay = 3000) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const throttledCallback = (...args: any[]) => {
    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        callback(...args);
        timeoutRef.current = null;
      }, delay);
    }
  };

  return throttledCallback;
};
