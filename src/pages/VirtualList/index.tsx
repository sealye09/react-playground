import { useMount } from "ahooks";
import { type FC, useState } from "react";

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

type Item = {
  id: number;
  name: string;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockData = async (from: number, to: number): Promise<Item[]> => {
  const list: Item[] = [];
  for (let i = from; i < to; i++) {
    list.push({
      id: i,
      name: i + randomText(),
    });
  }

  await wait(1000);
  return list;
};

const VirtualListPage: FC = () => {
  const [list, setList] = useState<Item[]>();

  const handleAdd = () => {
    const len = list?.length || 0;
    mockData(len, len + 100).then((res) => {
      setList((prev) => (prev ? [...prev, ...res] : res));
    });
  };

  useMount(() => {
    const arr = new Array(100).fill(0);
    const items = arr.map((_, idx) => {
      return {
        id: idx,
        name: idx + randomText(),
      };
    });

    setList(items);
  });

  return (
    <div className="flex gap-40">
      <div>
        <h1 className="my-4 text-lg">固定高度的虚拟列表</h1>
        {list ? (
          <FixedList
            items={list}
            itemHeight={60}
            containerWidth={200}
            containerHeight={360}
            onScrollEnd={handleAdd}
          />
        ) : (
          "loading..."
        )}
      </div>
      <div>
        <h1 className="my-4 text-lg">不定高度的虚拟列表</h1>
        {list ? (
          <VirtualList
            items={list}
            estimatedItemHeight={30}
            containerWidth={300}
            containerHeight={360}
            onScrollEnd={handleAdd}
          />
        ) : (
          "loading..."
        )}
      </div>
    </div>
  );
};

export default VirtualListPage;
