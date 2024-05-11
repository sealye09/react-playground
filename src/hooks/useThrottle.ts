import { useRef } from "react";

interface IUseThrottle {
  callback: (...args: unknown[]) => unknown;
  delay?: number;
}

export const useThrottle = ({ callback, delay = 300 }: IUseThrottle) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const throttledCallback = (...args: unknown[]) => {
    if (timeoutRef.current) {
      return;
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
      timeoutRef.current = null;
    }, delay);
  };

  return throttledCallback;
};
