import { FC, useEffect, useRef } from "react";

import { useThrottle } from "@/hooks/useThrottle";
import { twMerge } from "tailwind-merge";

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
  items?: any[];
  onScrollEnd?: () => void;
}

export const Masonry: FC<MasonryProps> = ({
  children,
  gapX = 30,
  gapY = 20,
  columns = 4,
  onScrollEnd,
}) => {
  const containerRef = useRef(null);

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

    children.forEach((child) => {
      const childHeight = child.clientHeight;
      const height = Math.min(...heights);
      const columnIndex = heights.indexOf(height);
      const left = columnIndex * (colWidth + gapX);
      const top = height;

      child.style.width = `${colWidth}px`;
      child.style.left = `${left}px`;
      child.style.top = `${top}px`;

      heights[columnIndex] += childHeight + gapY;
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

  // 监听children的img加载完成事件，重新布局
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current as HTMLDivElement;
    const children = Array.from(container.children) as HTMLElement[];

    const images = children.map((child) => child.querySelector("img"));

    images.forEach((image) => {
      if (!image) return;

      image.onload = () => {
        handleResize();
      };
    });
  }, [children]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-full w-full"
    >
      {children}
    </div>
  );
};
