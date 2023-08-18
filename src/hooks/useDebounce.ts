import { useRef } from "react";

interface IUseDebounce {
  callback: Function;
  delay?: number;
}

export const useDebounce = ({ callback, delay = 300 }: IUseDebounce) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = (...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};
