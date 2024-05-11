import { useThrottleFn } from "ahooks";
import { type FC, useEffect, useMemo, useRef, useState } from "react";

interface IPosition {
  index: number;
  top: number;
  bottom: number;
  height: number;
  dHeight: number;
}

type Item = {
  id: number;
  name: string;
};

interface VirtualListProps {
  items: Item[];
  estimatedItemHeight?: number;
  containerHeight: number;
  containerWidth: number;
  prevCount?: number;
  nextCount?: number;
  onScrollEnd?: () => void;
}

// 二分查找, 返回 index, 如果没找到，返回 null
const binarySearch = (target: number, positions: IPosition[]) => {
  let start = 0;
  let end = positions.length - 1;
  let tempIdx = null;

  while (start <= end) {
    const midIdx = Math.floor(start + (end - start) / 2);
    const midVal = positions[midIdx].bottom;

    if (midVal === target) {
      return midIdx + 1;
    }
    if (midVal < target) {
      start = midIdx + 1;
    }
    if (midVal > target) {
      if (tempIdx === null || tempIdx > midIdx) {
        tempIdx = midIdx;
      }
      end = end - 1;
    }
  }
  return tempIdx;
};

const generatePositions = (
  positions: IPosition[],
  listLength: number,
  estimatedItemHeight: number,
) => {
  if (positions.length === 0) {
    console.log("初始化 positions");
    const arr = new Array(listLength).fill(null);
    const newPositions: IPosition[] = arr.map((_, idx) => {
      return {
        index: idx,
        height: estimatedItemHeight,
        top: idx * estimatedItemHeight,
        bottom: (idx + 1) * estimatedItemHeight,
        dHeight: 0,
      };
    });
    return newPositions;
  }
  // 加入了新数据，需要更新 positions
  console.log("加入新数据，更新 positions");
  const newPositions: IPosition[] = [
    ...positions,
    ...new Array(listLength - positions.length).fill(null),
  ];

  for (let i = positions.length; i < newPositions.length; i++) {
    const index = i;
    const height = estimatedItemHeight;
    const top = newPositions[i - 1].bottom;
    const bottom = top + height;
    const dHeight = 0;
    newPositions[i] = { index, height, top, bottom, dHeight };
  }
  return newPositions;
};

const updatePositions = (positions: IPosition[], children: Element[]) => {
  const newPositions: IPosition[] = [...positions];

  for (const child of children) {
    const { height } = child.getBoundingClientRect();
    const idx = Number(child.getAttribute("data-index"));
    if (newPositions[idx]) {
      const dHeight = positions[idx].height - height;
      if (dHeight) {
        newPositions[idx].height = height;
        newPositions[idx].bottom = newPositions[idx].bottom - dHeight;
        newPositions[idx].dHeight = dHeight;
      }
    }
  }

  const idx = Number(children[0].getAttribute("data-index") || "0");
  let startHeight = newPositions[idx].dHeight;
  newPositions[idx].dHeight = 0;

  for (let i = idx + 1; i < newPositions.length; i++) {
    newPositions[i].top = newPositions[i - 1].bottom;
    newPositions[i].bottom = newPositions[i].bottom - startHeight;
    if (newPositions[i].dHeight) {
      startHeight += newPositions[i].dHeight;
      newPositions[i].dHeight = 0;
    }
  }

  return newPositions;
};

const getIndex = (
  scrollTop: number,
  positions: IPosition[],
  prevCount: number,
  visibleCount: number,
  nextCount: number,
) => {
  if (!positions || positions.length === 0)
    return { startIdx: 0, endIdx: visibleCount };

  // 查找 startIdx，缓冲 prevCount 个元素
  const searchedIdx = binarySearch(scrollTop, positions) || 0;

  const startIdx = Math.max(searchedIdx - prevCount, 0);
  const endIdx =
    Math.min(searchedIdx + visibleCount + nextCount, positions.length - 1) ||
    visibleCount;

  console.log("🚀 ~ idx ~ idx:", searchedIdx);
  console.log("🚀 ~ startIdx:", startIdx);
  console.log("🚀 ~ endIdx ~ endIdx:", endIdx);

  return { startIdx, endIdx };
};

const VirtualList: FC<VirtualListProps> = ({
  items,
  estimatedItemHeight = 30,
  containerHeight,
  containerWidth,
  prevCount,
  nextCount,
  onScrollEnd,
}) => {
  const visibleCount = Math.ceil(containerHeight / estimatedItemHeight);
  prevCount = prevCount || visibleCount;
  nextCount = nextCount || visibleCount;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const positionsRef = useRef<IPosition[]>([]);

  const [maxEndIdx, setMaxEndIdx] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const { startIdx, endIdx } = getIndex(
    scrollTop,
    positionsRef.current,
    prevCount,
    visibleCount,
    nextCount,
  );

  const listHeight = useMemo(() => {
    const positions = positionsRef.current;

    if (positions.length > 0 && positions[positions.length - 1]) {
      return positions[positions.length - 1].bottom;
    }
    return containerHeight * 2;
  }, [containerHeight]);

  const contentOffset = useMemo(
    () => (startIdx > 0 ? positionsRef.current[startIdx].top : 0),
    [startIdx],
  );

  const contentHeight = listHeight - contentOffset;

  const containerStyle = {
    width: `${containerWidth}px`,
    height: `${containerHeight}px`,
    overflow: "hidden auto",
  };

  const contentStyle = {
    width: "100%",
    height: `${contentHeight}px`,
    transform: `translateY(${contentOffset}px)`,
  };

  const handleScroll = useThrottleFn(
    () => {
      if (!containerRef.current || !contentRef.current || !positionsRef.current)
        return;

      // 更新 positions
      const children = Array.from(contentRef.current.children);
      positionsRef.current = updatePositions(positionsRef.current, children);

      const { clientHeight, scrollHeight, scrollTop } = containerRef.current;

      setScrollTop(scrollTop);

      if (scrollHeight - clientHeight - scrollTop < 10) {
        console.log("到底了");
        if (endIdx === positionsRef.current.length - 1) {
          onScrollEnd?.();
        }
      }
    },
    { wait: 500 },
  );

  // 初始化
  useEffect(() => {
    positionsRef.current = generatePositions(
      positionsRef.current,
      items.length,
      estimatedItemHeight,
    );
  }, [estimatedItemHeight, items]);

  // 更新
  useEffect(() => {
    if (!contentRef.current || !positionsRef.current) return;

    // maxEndIdx < endIdx 时更新 positions，回滚时不更新
    if (maxEndIdx < endIdx) {
      setMaxEndIdx(endIdx);

      const children = Array.from(contentRef.current.children);
      positionsRef.current = updatePositions(positionsRef.current, children);
    }
  }, [endIdx, maxEndIdx]);

  return (
    <div ref={containerRef} style={containerStyle} onScroll={handleScroll.run}>
      <div ref={contentRef} style={contentStyle}>
        {items.slice(startIdx, endIdx + 1).map((item) => {
          return (
            <div
              key={item.id}
              data-index={item.id}
              className="flex items-center w-full border-b border-gray-300 hover:bg-gray-300/80 transition-all even:bg-gray-100"
            >
              <span className="h-full w-full break-words line-clamp-6">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualList;
