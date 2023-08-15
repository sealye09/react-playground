import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";

import { MasonryItem, Masonry } from "@/components/Masonry/Masonry";
import SImage from "@/components/Image";

export interface IItem {
  id: string;
  title: string;
  url: string;
  height: number;
  width: number;
}

const WaterFallPage: FC = () => {
  const [list, setList] = useState<IItem[]>([]);
  const [page, setPage] = useState(1); // 页码

  const columns = 5; // 列数
  const gapX = 30; // 水平间距
  const gapY = 20; // 垂直间距

  const limit = 30; // 每页条数

  const getData = async () => {
    console.log("load data");

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
        console.log(res);
        setList(
          list.concat(
            res.data.data.rows.map((item: any) => {
              return {
                id: item.picture_id,
                title: item.title,
                url: item.regular_url,
                height: item.height,
                width: item.width,
              };
            })
          )
        );
      });
  };

  useEffect(() => {
    getData();
  }, [page]);

  if (!list || !list.length) {
    return <div>loading...</div>;
  }

  return (
    <Masonry
      columns={columns}
      gapX={gapX}
      gapY={gapY}
      onScrollEnd={() => {
        setPage((page) => page + 1);
      }}
      items={list}
    >
      {list.map((item, idx) => (
        <MasonryItem key={idx}>
          <Card
            hoverable
            cover={
              <SImage
                className="border w-full h-full"
                src={item.url}
              />
            }
          >
            <span>{item.title + " " + idx}</span>
          </Card>
        </MasonryItem>
      ))}
    </Masonry>
  );
};

export default WaterFallPage;
