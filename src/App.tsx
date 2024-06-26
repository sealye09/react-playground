import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

import { getMenus, getRoutes } from "@/router/index";
import { ToastProvider } from "./components/Toast/ToastProvider";
import Login from "./pages/Login";
import { getToken } from "./utils/tools";

function App() {
  return (
    <ToastProvider position="top-center">
      {getToken() ? <></> : <></>}
      <Routes>
        <Route
          path="/admin/"
          element={
            <Layout
              // @ts-ignore
              menuItems={getMenus()}
            />
          }
        >
          {getRoutes().map((item) => (
            <Route
              key={item?.key}
              path={item?.key?.replace("/admin/", "")}
              element={item?.element}
            />
          ))}
          <Route path="*" element={<h2>404</h2>} />
        </Route>

        <Route
          path="/admin/login"
          element={getToken() ? <Navigate to="/admin/dashboard" /> : <Login />}
        />
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route path="*" element={<h2>404</h2>} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
