import { useEffect, useState } from "react";
import axios from "axios";

interface IUseFetch {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  params?: object;
  body?: object;
}

export const useFetch = ({ method, url, params, body }: IUseFetch) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    // DELETE时body在axios的第二个参数
    if (method === "DELETE") {
      axios
        .delete(url, {
          data: body,
          signal: controller.signal,
        })
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      axios({
        method,
        url,
        params,
        data: body,
        signal: controller.signal,
      })
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }

    return () => {
      controller.abort();
    };
  }, [url]);

  return {
    data,
    isLoading,
  };
};
