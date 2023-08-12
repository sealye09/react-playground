import { FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

import { useThrottle } from "@/hooks/useThrottle";

const WaterFallPage: FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [page, setPage] = useState(1); // 页码

  const containerRef = useRef(null);
  const columns = 4; // 列数
  const gapX = 30; // 水平间距
  const gapY = 20; // 垂直间距

  const limit = 30; // 每页条数

  const handleScroll = useThrottle(() => {
    if (!containerRef.current) return;

    const container = containerRef.current as HTMLDivElement;
    const containerHeight = container.clientHeight;
    const scrollTop = document.documentElement.scrollTop;

    if (scrollTop / containerHeight >= 0.9) {
      console.log("scrollTop / containerHeight:", scrollTop / containerHeight);
      setPage((prev) => prev + 1);
    }
  }, 1000);

  const handleResize = () => {
    if (!containerRef.current) return;
    const container = containerRef.current as HTMLDivElement;
    const children = Array.from(container.children) as HTMLElement[];

    const containerWidth = container.clientWidth;
    const colWidth = (containerWidth - (columns - 1) * gapX) / columns;
    const heights = new Array(columns).fill(0);

    children.forEach((child) => {
      const childHeight = child.clientHeight;
      const height = Math.min(...heights);
      const columnIndex = heights.indexOf(height);
      const left = columnIndex * (colWidth + gapX);
      const top = height;

      child.style.width = `${colWidth}px`;
      child.style.left = `${left}px`;
      child.style.top = `${top}px`;

      heights[columnIndex] += childHeight + gapY;
    });

    const maxColumnHeight = Math.max(...heights);
    container.style.height = `${maxColumnHeight}px`;
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
  }, [page, limit]);

  if (!list || !list.length) {
    return <div>loading...</div>;
  }

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-full w-full"
    >
      {list.map((item: any, idx: number) => {
        return (
          <Card
            key={idx}
            className="absolute transition-all"
            hoverable
            cover={
              <img
                onLoad={() => {
                  handleResize();
                }}
                className="border"
                src={item.regular_url + "?x-oss-process=image/resize,w_450/format,jpg"}
              />
            }
          >
            <Meta title={item.title + idx} />
          </Card>
        );
      })}
    </div>
  );
};

export default WaterFallPage;
