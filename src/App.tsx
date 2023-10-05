import Layout from "./components/Layout";
import { Navigate, Route, Routes } from "react-router-dom";

import { getMenus, getRoutes } from "@/router/index";
import { getToken } from "./utils/tools";
import Login from "./pages/Login";
import { ToastContainer, ToastProvider } from "./components/Toast";

function App() {
  return (
    <ToastProvider>
      <ToastContainer />

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
          <Route
            path="*"
            element={<h2>404</h2>}
          />
        </Route>

        <Route
          path="/admin/login"
          element={getToken() ? <Navigate to="/admin/dashboard" /> : <Login />}
        />
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard" />}
        />
        <Route
          path="*"
          element={<h2>404</h2>}
        />
      </Routes>
    </ToastProvider>
  );
}

export default App;
