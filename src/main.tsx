import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import zh_CN from "antd/locale/zh_CN";

import App from "./App.tsx";
import "@/styles/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <ConfigProvider
      locale={zh_CN}
      csp={{ nonce: "YourNonceCode" }}
    >
      <App />
    </ConfigProvider>
  </Router>,
);
