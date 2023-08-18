import { useRef } from "react";

interface IUseThrottle {
  callback: Function;
  delay?: number;
}

export const useThrottle = ({ callback, delay = 300 }: IUseThrottle) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const throttledCallback = (...args: any[]) => {
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
