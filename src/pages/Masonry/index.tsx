import { FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

import { useThrottle } from "@/hooks/useThrottle";

import "./index.css";

const Masonry: FC = () => {
  const [height, setHeight] = useState(0); // 容器高度
  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState(1); // 页码
  const colHeights: number[] = [0, 0, 0, 0]; // 每列高度

  const containerRef = useRef(null);
  const columns = 4; // 列数
  const gapX = 10; // 水平间距
  const gapY = 10; // 垂直间距

  const width = (100 - (columns - 1) * gapX) / columns; // 每列宽度

  const limit = 30; // 每页条数

  const handleScroll = useThrottle(() => {
    if (!containerRef.current) return;
    // 监听滚动事件，到达底部时加载更多
    const container = containerRef.current as HTMLDivElement;
    const containerHeight = container.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + containerHeight >= scrollHeight) {
      setPage(page + 1);
    }
  }, 1000);

  useEffect(() => {
    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  const getData = useThrottle(async () => {
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
  }, 1000);

  useEffect(() => {
    getData();
  }, [page, limit]);

  if (!list || !list.length) {
    return <div>loading...</div>;
  }

  return (
    <div
      ref={containerRef}
      className="masonry min-h-screen h-[3000px] mx-auto flex flex-col flex-wrap"
      style={{
        height: `${height}px`,
      }}
    >
      {list.map((item: any, idx: number) => {
        return (
          <Card
            key={idx}
            className="card top-0 left-0"
            style={{
              position: "relative",
              marginBottom: `${gapX}px`,
              width: width + "%",
            }}
            hoverable
            cover={
              <img
                className="border"
                src={item.regular_url + "?x-oss-process=image/resize,w_450/format,jpg"}
              />
            }
          >
            <Meta title={item.title + idx} />
          </Card>
        );
      })}
      {
        // 占位元素
        // Array.from({ length: columns - 1 }).map((_, idx) => {
        //   return (
        //     <div
        //       className={`divider${idx + 1} w-full h-full`}
        //       key={idx}
        //     ></div>
        //   );
        // })
      }
    </div>
  );
};

export default Masonry;
