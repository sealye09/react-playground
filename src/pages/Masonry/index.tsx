import { FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Card } from "antd";

import { useThrottle } from "@/hooks/useThrottle";
import SImage from "@/components/Image";

interface IItem {
  id: string;
  title: string;
  url: string;
  height: number;
  width: number;
}

const Masonry: FC = () => {
  const containerRef = useRef(null);

  const [list, setList] = useState<IItem[]>([]);
  const [colData, setColData] = useState<IItem[][]>([]); // 列数据
  const [heights, setHeights] = useState<number[]>([]); // 每列高度
  const [page, setPage] = useState(1); // 页码
  const [loading, setLoading] = useState(false); // 加载状态

  const columns = 4; // 列数
  const limit = 20; // 每页条数

  const gapX = 20; // 水平间距
  const gapY = 20; // 垂直间距

  const handleScroll = useThrottle({
    callback: () => {
      if (!containerRef.current) return;
      // 监听滚动事件，到达底部时加载更多
      const container = containerRef.current as HTMLDivElement;
      const containerHeight = container.clientHeight;
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      if (scrollHeight - scrollTop - containerHeight < 20) {
        setPage((page) => page + 1);
      }
    },
    delay: 1000,
  });

  const getData = useThrottle({
    callback: async () => {
      axios
        .get("https://www.vilipix.com/api/v1/picture/public", {
          params: {
            page,
            limit,
            offset: (Number(page) - 1) * Number(limit),
            sort: "hot",
            type: 0,
          },
        })
        .then((res) => {
          setList(
            list.concat(
              res.data.data.rows.map((item: any, idx: number) => {
                return {
                  id: idx + list.length,
                  title: item.title,
                  url: item.regular_url,
                  height: item.height,
                  width: item.width,
                };
              })
            )
          );
        });
    },
    delay: 1000,
  });

  // 初始化
  useEffect(() => {
    setColData(new Array(columns).fill([]));
    setHeights(new Array(columns).fill(0));

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 更新列数据，追加到最短列
  useEffect(() => {
    if (!containerRef.current || !heights.length || !colData.length) return;
    const container = containerRef.current as HTMLDivElement;
    const children = Array.from(container.children) as HTMLElement[];

    const colWidth = children[0].clientWidth;
    const currHeights = [...heights];
    const currColData = [...colData];
    const colDataLength = currColData.length * currColData[0].length;

    for (let i = colDataLength; i < list.length; i++) {
      const minHeight = Math.min(...currHeights);
      const idx = currHeights.indexOf(minHeight);
      currColData[idx] = [...currColData[idx], list[i]];
      const height = colWidth / (list[i].width / list[i].height);
      currHeights[idx] += height;
    }

    setColData(currColData);
    setHeights(currHeights);
  }, [list.length, containerRef.current]);

  useEffect(() => {
    getData();
  }, [page, limit]);

  return (
    <div
      ref={containerRef}
      className="masonry min-h-screen mx-auto flex w-full h-full"
      style={{
        gap: `${gapX}px`,
      }}
    >
      {colData.map((col, idx) => (
        <div
          key={idx}
          className="masonry-col flex flex-col w-full"
          style={{
            gap: `${gapY}px`,
          }}
        >
          {col.map((item, index) => (
            <Card
              key={index}
              hoverable
              loading={loading}
              cover={
                <SImage
                  className="border w-full h-full"
                  src={item.url}
                  onLoad={() => {
                    setLoading(false);
                  }}
                />
              }
            >
              <span className="line-clamp-2 text-base">{item.id + " " + item.title}</span>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
