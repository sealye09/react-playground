import { useRef } from "react";

export const useThrottle = (
  callback: Function,
  delay = 3000,
  options = { leading: true, trailing: false }
) => {
  const timer = useRef<any>(null);
  const lastRun = useRef<any>(null);

  const throttledCallback = (...args: any) => {
    const now = Date.now();

    if (options.leading) {
      if (lastRun.current === null) {
        lastRun.current = now;
      }

      const remaining = delay - (now - lastRun.current);

      if (remaining <= 0) {
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = null;
        }

        lastRun.current = now;
        callback(...args);
      } else if (!timer.current) {
        timer.current = setTimeout(() => {
          lastRun.current = now;
          callback(...args);
        }, remaining);
      }
    } else if (!timer.current) {
      timer.current = setTimeout(() => {
        lastRun.current = now;
        callback(...args);
      }, delay);
    }
  };

  return throttledCallback;
};
