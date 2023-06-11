import { DashboardOutlined, HeartOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";
import Dashboard from "../pages/Dashboard";
import UserList from "../pages/UserList";
import ArticleCatgory from "../pages/ArticleCatgory";
import ArticleInfo from "../pages/ArticleInfo";
import MedicineCatgory from "../pages/MedicineCatgory";
import MedicineInfo from "../pages/MedicineInfo";

export type RouteType = {
  label: string;
  key: string;
  element?: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode | React.ReactNode[];
  children?: RouteType | RouteType[];
};

const routes: RouteType[] = [
  {
    label: "看板",
    key: "/dashboard",
    element: <Dashboard />,
    icon: <DashboardOutlined />,
  },
  {
    label: "药品管理",
    key: "/medicine",
    icon: <HeartOutlined />,
    children: [
      {
        label: "药品分类",
        key: "/medicine/category",
        element: <MedicineCatgory />,
      },
      {
        label: "药品信息",
        key: "/medicine/info",
        element: <MedicineInfo />,
      },
    ],
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <FileOutlined />,
    children: [
      {
        label: "文章分类",
        key: "/article/category",
        element: <ArticleCatgory />,
      },
      {
        label: "文章信息",
        key: "/article/info",
        element: <ArticleInfo />,
      },
    ],
  },
  {
    label: "会员管理",
    key: "/user",
    icon: <UserOutlined />,
    element: <UserList />,
  },
];

function flatMenus(arr: RouteType[]) {
  const res: RouteType[] = [];
  const stack: RouteType[] = [...arr];

  while (stack.length !== 0) {
    const curr = stack.pop();
    if (curr) {
      if ("children" in curr) {
        const children = curr.children;
        if (children) {
          Array.isArray(children) ? stack.push(...children) : stack.push(children);
        }
      }
      res.unshift(curr);
    }
  }
  return res;
}

export function getMenus() {
  return routes;
}

export function getRoutes() {
  return flatMenus(routes);
}
