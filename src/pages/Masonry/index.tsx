import { FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Card } from "antd";

import { useThrottle } from "@/hooks/useThrottle";

const Masonry: FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState(1); // 页码

  const containerRef = useRef(null);
  const columns = 4; // 列数

  const limit = 30; // 每页条数

  const colData = new Array(columns).fill([]).map((_, idx) => {
    return list.filter((_, i) => i % columns === idx);
  }); // 每列数据

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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      className="masonry min-h-screen h-[3000px] mx-auto flex w-full gap-4"
    >
      {colData.map((col, idx) => (
        <div
          key={idx}
          className="masonry-col flex flex-col w-full gap-10"
        >
          {col.map((item, index) => (
            <Card
              key={index}
              hoverable
              cover={
                <img
                  className="border"
                  src={item.regular_url}
                />
              }
            >
              <span className="line-clamp-2 text-base">{item.title + " " + idx}</span>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
