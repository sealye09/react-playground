import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

import { MasonryItem, Masonry } from "@/components/Masonry/Masonry";
import SImage from "@/components/Image";

const WaterFallPage: FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState(1); // 页码

  const columns = 4; // 列数
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
        setList(list.concat(res.data.data.rows));
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
    >
      {list.map((item, idx) => (
        <MasonryItem key={idx}>
          <Card
            hoverable
            cover={
              <SImage
                className="border"
                src={item.regular_url}
              />
            }
          >
            <Meta title={item.title + " " + idx} />
          </Card>
        </MasonryItem>
      ))}
    </Masonry>
  );
};

export default WaterFallPage;
