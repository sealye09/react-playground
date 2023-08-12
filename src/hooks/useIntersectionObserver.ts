import { RefObject, useCallback, useEffect } from "react";

interface IntersectionObserverInit {
  target: RefObject<Element>;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect: IntersectionObserverCallback;
}

export const useIntersectionObserver = ({
  target,
  rootMargin = "0px",
  threshold = 0.1,
  onIntersect,
}: IntersectionObserverInit) => {
  const createObserver = useCallback(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold,
    });

    return observer;
  }, [rootMargin, threshold, onIntersect]);

  useEffect(() => {
    if (!target.current) {
      return;
    }

    const observer = createObserver();
    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [target, createObserver]);
};
