import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { getToken, serverUrl } from "./tools";

const request = axios.create({
  baseURL: serverUrl, // 请求的基础地址
  timeout: 5000,
  withCredentials: true,
});

// Add a request interceptor，发起请求之前执行
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // @ts-ignore
    config.headers.token = getToken();
    NProgress.start(); // 启动loading
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor，请求返会之后执行
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    return response;
  },
  function (error) {
    NProgress.done(); // 关闭loading
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default request;
