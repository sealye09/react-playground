import { useInfiniteScroll } from "ahooks";
import { Card } from "antd";
import axios from "axios";
import type { FC } from "react";

import SImage from "@/components/Image";
import { Masonry, MasonryItem } from "@/components/Masonry/Masonry";

export interface IItem {
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

const WaterFallPage: FC = () => {
  const columns = 4; // 列数
  const gapX = 30; // 水平间距
  const gapY = 20; // 垂直间距

  const limit = 15; // 每页条数

  const { data, loading, loadingMore, noMore } = useInfiniteScroll(
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
    },
  );

  if (!data || !data.list.length) {
    return null;
  }

  return (
    <>
      <Masonry columns={columns} gapX={gapX} gapY={gapY} items={data.list}>
        {data?.list.map((item, idx) => (
          <MasonryItem key={item.id}>
            <Card
              cover={<SImage className="border w-full h-full" src={item.url} />}
            >
              <span className="line-clamp-2 text-base">
                {`${item.title} ${idx}`}
              </span>
            </Card>
          </MasonryItem>
        ))}
      </Masonry>

      <div className="h-20 flex justify-center items-center">
        {loading || loadingMore ? (
          <span className="text-base">加载中...</span>
        ) : null}

        {noMore ? <span className="text-base">没有更多了</span> : null}
      </div>
    </>
  );
};

export default WaterFallPage;
