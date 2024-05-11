import { useRef } from "react";

interface IUseDebounce {
  callback: (...args: unknown[]) => unknown;
  delay?: number;
}

export const useDebounce = ({ callback, delay = 300 }: IUseDebounce) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = (...args: unknown[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};
