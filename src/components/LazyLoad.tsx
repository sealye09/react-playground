import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/utils/cn";
import { type FC, type HTMLAttributes, useRef, useState } from "react";

interface LazyLoadProps extends HTMLAttributes<HTMLDivElement> {}

const LazyLoad: FC<LazyLoadProps> = ({ children, className, ...rest }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useIntersectionObserver({
    target: divRef,
    onIntersect: ([entry], observerElement) => {
      if (entry.isIntersecting && divRef.current) {
        setIsVisible(true);
        console.log("进入视图");
        observerElement.unobserve(divRef.current);
      }
    },
  });

  return (
    <div ref={divRef} className={cn(className)} {...rest}>
      {isVisible ? children : null}
    </div>
  );
};

export default LazyLoad;
