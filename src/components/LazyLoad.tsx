import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/utils/cn";
import { FC, HTMLAttributes, useRef, useState } from "react";

interface LazyLoadProps extends HTMLAttributes<HTMLDivElement> {}

const LazyLoad: FC<LazyLoadProps> = ({ children, className, ...rest }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isVisiable, setIsVisiable] = useState(false);

  useIntersectionObserver({
    target: divRef,
    onIntersect: ([entry], observerElement) => {
      if (entry.isIntersecting && divRef.current) {
        setIsVisiable(true);
        console.log("进入视图");
        observerElement.unobserve(divRef.current);
      }
    },
  });

  return (
    <div
      ref={divRef}
      className={cn(className)}
      {...rest}
    >
      {isVisiable ? children : null}
    </div>
  );
};

export default LazyLoad;
