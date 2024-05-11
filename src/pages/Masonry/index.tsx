import { useInfiniteScroll } from "ahooks";
import { Card } from "antd";
import axios from "axios";
import { type FC, useEffect, useRef } from "react";

import SImage from "@/components/Image";

interface IItem {
  id: string;
  title: string;
  url: string;
  height: number;
  width: number;
}

type ApiItem = {
  title: string;
  regular_url: string;
  height: number;
  width: number;
};

type Result = {
  total: number;
  list: IItem[];
};

const getData = async (
  offset: number,
  limit: number,
  listLength: number,
): Promise<Result> => {
  const res = await axios.get("https://www.vilipix.com/api/v1/picture/public", {
    params: {
      limit,
      offset,
      sort: "hot",
    },
  });
  const data = res.data.data;
  const list: IItem[] = data.rows.map((item: ApiItem, idx: number) => ({
    id: idx + listLength,
    title: item.title,
    url: item.regular_url,
    height: item.height,
    width: item.width,
  }));

  return {
    total: data.count,
    list,
  };
};

const Masonry: FC = () => {
  const columns = 4; // 列数
  const limit = 10; // 每页条数

  const gapX = 20; // 水平间距
  const gapY = 20; // 垂直间距

  const containerRef = useRef<HTMLDivElement>(null);

  const containerWidth = containerRef.current?.clientWidth || 0;
  const colWidth = (containerWidth - gapX * (columns - 1)) / columns;

  const colData = useRef<IItem[][]>(new Array(columns).fill([]));
  const heights = useRef<number[]>(new Array(columns).fill(0));

  const { loading, loadingMore, noMore } = useInfiniteScroll(
    (d: Result | undefined) => {
      const offset = d?.list?.length || 0;
      return getData(offset, limit, offset);
    },
    {
      target: () => document,
      isNoMore: (d) => {
        const total = d?.total || 0;
        const listLength = d?.list?.length || 0;
        const hasMore = total > listLength;
        return !hasMore;
      },
      onSuccess: (data?: Result | undefined, e?: Error | undefined) => {
        if (e) {
          console.error(e);
        }
        if (!data) return;

        const currHeights = [...heights.current];
        const currColData = [...colData.current];

        for (const item of data.list) {
          const minHeight = Math.min(...currHeights);
          const idx = currHeights.indexOf(minHeight);

          currColData[idx] = [...currColData[idx], item];
          const height = colWidth / (item.width / item.height);
          currHeights[idx] += height;
        }

        colData.current = currColData;
        heights.current = currHeights;
      },
    },
  );

  useEffect(() => {
    // 设计 document 滚动到顶部
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <div className="w-full h-full">
      <div
        ref={containerRef}
        className="masonry min-h-screen mx-auto flex w-full h-full pb-20"
        style={{
          gap: `${gapX}px`,
        }}
      >
        {colData.current.map((col, idx) => (
          <div
            key={col[0]?.id || idx}
            className="masonry-col flex flex-col w-full"
            style={{
              gap: `${gapY}px`,
            }}
          >
            {col.map((item) => (
              <Card
                key={item.id}
                cover={
                  <SImage className="border w-full h-full" src={item.url} />
                }
              >
                <span className="line-clamp-1 text-base">
                  {`${item.id} ${item.title}`}
                </span>
              </Card>
            ))}
          </div>
        ))}
      </div>

      <div className="h-20 relative bottom-20 flex justify-center items-center">
        {loading || loadingMore ? (
          <span className="text-center text-base">加载中...</span>
        ) : null}
        {noMore ? (
          <span className="text-center text-base">没有更多了</span>
        ) : null}
      </div>
    </div>
  );
};

export default Masonry;
