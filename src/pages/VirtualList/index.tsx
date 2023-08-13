import { FC, useEffect, useState } from "react";

import FixedList from "@/components/VirtualList/FixedList";
import VirtualList from "@/components/VirtualList/VirtualList";

const VirtualListPage: FC = () => {
  const [list, setList] = useState<any[]>([]);

  const handleAdd = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const arr = new Array(20).fill(0);
        const len = list.length;
        const items = arr.map((item, idx) => {
          return {
            id: idx + len,
            name: `name${idx + len}`,
          };
        });
        setList((list) => [...list, ...items]);
        resolve(null);
      }, 1000);
    });
  };

  useEffect(() => {
    const arr = new Array(40).fill(0);
    const items = arr.map((item, idx) => {
      return {
        id: idx,
        name: `name${idx}`,
      };
    });

    setList(items);
  }, []);

  return (
    <div className="flex gap-40">
      <div>
        <FixedList
          items={list}
          itemHeight={60}
          containerWidth={200}
          containerHeight={360}
          onScrollEnd={handleAdd}
        />
      </div>
      <div>
        <VirtualList></VirtualList>
      </div>
    </div>
  );
};

export default VirtualListPage;
