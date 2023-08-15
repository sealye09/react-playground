import { FC, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { useThrottle } from "@/hooks/useThrottle";
import { IItem } from "@/pages/WaterFallPage";

export interface MasonryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  width?: string;
}

export const MasonryItem: FC<MasonryItemProps> = ({
  children,
  className,
  height,
  width,
  style,
}) => {
  return (
    <div
      className={twMerge("absolute transition-all duration-300", className)}
      style={{
        height,
        width,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export interface MasonryProps {
  children?: React.ReactNode | React.ReactNode[];
  gapX?: number;
  gapY?: number;
  columns?: number;
  items: IItem[];
  onScrollEnd?: () => void;
}

export const Masonry: FC<MasonryProps> = ({
  children,
  gapX = 30,
  gapY = 20,
  columns = 4,
  items,
  onScrollEnd,
}) => {
  const containerRef = useRef(null);

  const contentHeights = [
    {
      line: 1,
      // 字数范围
      range: [0, 42],
      height: 70,
    },
    {
      line: 2,
      range: [42, 999],
      height: 92,
    },
  ];

  const handleScroll = useThrottle(() => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;

    if (
      scrollTop + window.innerHeight >= scrollHeight ||
      scrollTop + window.innerHeight >= scrollHeight - 100
    ) {
      onScrollEnd && onScrollEnd();
    }
  }, 1000);

  const handleResize = () => {
    if (!containerRef.current) return;
    const container = containerRef.current as HTMLDivElement;
    const children = Array.from(container.children) as HTMLElement[];

    const containerWidth = container.clientWidth;
    const colWidth = (containerWidth - (columns - 1) * gapX) / columns;
    const heights = new Array(columns).fill(0);

    children.forEach((child, idx) => {
      const height = Math.min(...heights);
      const columnIndex = heights.indexOf(height);
      const left = columnIndex * (colWidth + gapX);
      const top = height;

      child.style.width = `${colWidth}px`;
      child.style.left = `${left}px`;
      child.style.top = `${top}px`;

      // 根据图片的宽高比例计算高度, items 中的图片宽高比例，加上 gapY 和内容的行数
      const chars = items[idx].title.length;
      const contentHeight =
        contentHeights.find((item) => chars >= item.range[0] && chars < item.range[1])?.height ||
        contentHeights[0].height;
      const picHeight = colWidth / (items[idx].width / items[idx].height);
      console.log("🚀 ~ file: Masonry.tsx:103 ~ children.forEach ~ colWidth:", colWidth);
      console.log("🚀 ~ file: Masonry.tsx:103 ~ children.forEach ~ picHeight:", picHeight);

      heights[columnIndex] += contentHeight + picHeight + gapY;
    });

    const maxColumnHeight = Math.max(...heights);
    container.style.height = `${maxColumnHeight}px`;
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, [items.length]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-full w-full"
    >
      {children}
    </div>
  );
};
