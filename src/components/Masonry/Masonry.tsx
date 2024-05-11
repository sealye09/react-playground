import { useMount, useThrottleFn } from "ahooks";
import { type FC, useEffect, useRef } from "react";

import type { IItem } from "@/pages/WaterFallPage";
import { cn } from "@/utils/cn";

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
      className={cn("absolute transition-all duration-300", className)}
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
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useThrottleFn(
    () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;

      if (
        scrollTop + window.innerHeight >= scrollHeight ||
        scrollTop + window.innerHeight >= scrollHeight - 100
      ) {
        onScrollEnd?.();
      }
    },
    {
      wait: 500,
    },
  );

  const handleResize = useThrottleFn(
    () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const children = Array.from(container.children) as HTMLDivElement[];

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
        const contentHeight =
          child.querySelector(".ant-card-body")?.clientHeight || 0;
        const picHeight = colWidth / (items[idx].width / items[idx].height);

        heights[columnIndex] += contentHeight + picHeight + gapY;
      });

      const maxColumnHeight = Math.max(...heights);
      container.style.height = `${maxColumnHeight}px`;
    },
    {
      wait: 500,
    },
  );

  useMount(() => {
    window.addEventListener("resize", handleResize.run);
    window.addEventListener("scroll", handleScroll.run);

    handleResize.run();

    return () => {
      window.removeEventListener("resize", handleResize.run);
      window.removeEventListener("scroll", handleScroll.run);
    };
  });

  useEffect(() => {
    handleResize.run();
  }, [handleResize]);

  return (
    <div ref={containerRef} className="relative mx-auto h-full w-full">
      {children}
    </div>
  );
};
