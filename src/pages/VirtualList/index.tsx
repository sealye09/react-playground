import { FC, useEffect, useState } from "react";

import FixedList from "@/components/VirtualList/FixedList";
import VirtualList from "@/components/VirtualList/VirtualList";

const randomText = () => {
  const len = Math.floor(Math.random() * 100);
  const zhChars = "你我他她它们 一二三四五六七八九十 百千万亿 人民币";
  return new Array(len)
    .fill(0)
    .map(() => zhChars[Math.floor(Math.random() * zhChars.length)])
    .join("");
};

const VirtualListPage: FC = () => {
  const [list, setList] = useState<any[]>([]);

  const handleAdd = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const arr = new Array(50).fill(0);
        const len = list.length;
        const items = arr.map((_, idx) => {
          return {
            id: idx + len,
            name: idx + len + randomText(),
          };
        });
        setList(list.concat(items));
        resolve(null);
      }, 1000);
    });
  };

  useEffect(() => {
    const arr = new Array(100).fill(0);
    const items = arr.map((_, idx) => {
      return {
        id: idx,
        name: idx + randomText(),
      };
    });

    setList(items);
  }, []);

  return (
    <div className="flex gap-40">
      <div>
        <h1 className="text-lg my-4">固定高度的虚拟列表</h1>
        <FixedList
          items={list}
          itemHeight={60}
          containerWidth={200}
          containerHeight={360}
          onScrollEnd={handleAdd}
        />
      </div>
      <div>
        <h1 className="text-lg my-4">不定高度的虚拟列表</h1>
        <VirtualList
          items={list}
          estimatedItemHeight={30}
          containerWidth={300}
          containerHeight={360}
          onScrollEnd={handleAdd}
        />
      </div>
    </div>
  );
};

export default VirtualListPage;
