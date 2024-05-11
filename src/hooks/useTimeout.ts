import { useEffect, useRef } from "react";

interface IUseTimeout {
  delay: number | null;
  callback: () => void;
}

export const useTimeout = ({ delay, callback }: IUseTimeout) => {
  const savedCallback = useRef<() => void>();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 缓存回调函数
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 启动定时器
  const start = useRef(() => {
    if (delay === null || timeoutRef.current !== null) {
      return;
    }

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    timeoutRef.current = setTimeout(tick, delay);
  });

  // 暂停定时器
  const pause = useRef(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  });

  // 根据 delay 的变化，启动或暂停定时器
  useEffect(() => {
    if (delay === null) {
      pause.current();
    } else {
      start.current();
    }

    // 在组件卸载时清除定时器
    return () => {
      pause.current();
    };
  }, [delay]);

  return {
    start,
    pause,
  };
};
