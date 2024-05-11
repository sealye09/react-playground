import { ConfigProvider } from "antd";
import zh_CN from "antd/locale/zh_CN";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "@/styles/index.scss";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Router>
      <ConfigProvider locale={zh_CN} csp={{ nonce: "YourNonceCode" }}>
        <App />
      </ConfigProvider>
    </Router>
  </StrictMode>,
);
