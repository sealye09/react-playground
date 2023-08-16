import { useEffect, useRef } from "react";

interface IUseInterval {
  delay: number | null;
  callback: () => void;
}

export const useInterval = ({ delay, callback }: IUseInterval) => {
  const savedCallback = useRef<() => void>();
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  // 缓存回调函数
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 启动定时器
  const start = () => {
    if (delay === null || intervalRef.current !== null) {
      return;
    }

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    intervalRef.current = setInterval(tick, delay);
  };

  // 暂停定时器
  const pause = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // 根据 delay 的变化，启动或暂停定时器
  useEffect(() => {
    if (delay === null) {
      pause();
    } else {
      start();
    }

    // 在组件卸载时清除定时器
    return () => {
      pause();
    };
  }, [delay]);

  return {
    start,
    pause,
  };
};
