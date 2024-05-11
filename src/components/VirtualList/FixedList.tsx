import clsx from "clsx";
import { type FC, useRef, useState } from "react";

import { useThrottle } from "@/hooks/useThrottle";

type Item = {
  id: number;
  name: string;
};

interface FixedListProps {
  items: Item[];
  itemHeight: number;
  containerHeight: number;
  containerWidth: number;
  prevCount?: number;
  nextCount?: number;
  onScrollEnd?: () => void;
}

const FixedList: FC<FixedListProps> = ({
  items,
  itemHeight,
  containerHeight,
  containerWidth,
  prevCount,
  nextCount,
  onScrollEnd,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [scrollTop, setScrollTop] = useState(0);

  const visibleCount = Math.ceil(containerHeight / itemHeight);

  prevCount = prevCount || visibleCount;
  nextCount = nextCount || visibleCount;

  const startIdx = Math.max(0, Math.floor(scrollTop / itemHeight) - prevCount);
  const endIdx = Math.min(
    startIdx + visibleCount + prevCount + nextCount,
    items.length,
  );

  const containerStyle = {
    width: `${containerWidth}px`,
    height: `${containerHeight}px`,
    overflow: "hidden auto",
  };

  const contentStyle = {
    width: "100%",
    height: `${itemHeight * (items.length - startIdx)}px`,
    transform: `translateY(${startIdx * itemHeight}px)`,
  };

  const itemStyle = {
    width: "100%",
    height: `${itemHeight}px`,
  };

  const handleScroll = useThrottle({
    callback: () => {
      if (!containerRef.current) return;

      const { clientHeight, scrollHeight, scrollTop } = containerRef.current;
      setScrollTop(scrollTop);
      if (scrollHeight - clientHeight - scrollTop < 10) {
        onScrollEnd?.();
      }
    },
    delay: 500,
  });

  return (
    <div ref={containerRef} style={containerStyle} onScroll={handleScroll}>
      <div style={contentStyle}>
        {items.slice(startIdx, endIdx).map((item) => {
          return (
            <div
              key={item.id}
              className={clsx(
                "flex items-center border-b border-gray-300",
                "hover:bg-gray-300/80 transition-all even:bg-gray-100",
              )}
              style={itemStyle}
            >
              <span className="w-full line-clamp-2">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FixedList;
