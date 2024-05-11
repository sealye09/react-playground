import { useEffect, useRef } from "react";

interface IUseInterval {
  delay: number | null;
  callback: () => void;
}

export const useInterval = ({ delay, callback }: IUseInterval) => {
  const savedCallback = useRef<() => void>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 缓存回调函数
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 启动定时器
  const start = useRef(() => {
    if (delay !== null) {
      intervalRef.current = setInterval(() => {
        savedCallback.current?.();
      }, delay);
    }
  });

  // 暂停定时器
  const pause = useRef(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
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
