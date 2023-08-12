import { useRef } from "react";

// debounce: delay 之后执行，如果 delay 期间内再次触发，则重新计时
export const useDebounce = (fn: Function, delay: number) => {
  const timer = useRef<NodeJS.Timeout>();
  return (...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};
