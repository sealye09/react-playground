import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url: string, params?: any) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    axios
      .get(url, { params, signal: controller.signal })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  return {
    data,
    isLoading,
  };
}

export default useFetch;
