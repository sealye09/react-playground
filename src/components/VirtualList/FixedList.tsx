import { useThrottle } from "@/hooks/useThrottle";
import { FC, useEffect, useRef, useState } from "react";

interface FixedListProps {
  items: any[];
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
  const endIdx = Math.min(startIdx + visibleCount + prevCount + nextCount, items.length);

  const containerStyle = {
    width: `${containerWidth}px`,
    height: `${containerHeight}px`,
    overflow: "auto",
  };

  const contentStyle = {
    height: `${itemHeight * (items.length - startIdx)}px`,
    transform: `translateY(${startIdx * itemHeight}px)`,
  };

  const itemStyle = {
    height: `${itemHeight}px`,
  };

  const handleScroll = useThrottle(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const offset = container.scrollTop;
    setScrollTop(offset);
  }, 500);

  useEffect(() => {
    if (endIdx === items.length) {
      onScrollEnd && onScrollEnd();
    }
  }, [endIdx, items.length, onScrollEnd]);

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      onScroll={handleScroll}
    >
      <div style={contentStyle}>
        {items.slice(startIdx, endIdx).map((item) => {
          return (
            <div
              key={item.id}
              style={itemStyle}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FixedList;
