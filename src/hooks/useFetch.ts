import axios from "axios";
import { useEffect, useState } from "react";

interface IUseFetch {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  params?: object;
  body?: object;
}

export const useFetch = ({ method, url, params, body }: IUseFetch) => {
  const [data, setData] = useState<unknown>();
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
  }, [url, body, method, params]);

  return {
    data,
    isLoading,
  };
};
