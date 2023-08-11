import {
  DashboardOutlined,
  HeartOutlined,
  FileOutlined,
  UserOutlined,
  MessageOutlined,
  FallOutlined,
} from "@ant-design/icons";

import Dashboard from "@/pages/Dashboard";
import Masonry from "@/pages/Masonry";
import ArticleCatgory from "@/pages/ArticleCatgory";
import ArticleInfo from "@/pages/ArticleInfo";
import MedicineCatgory from "@/pages/MedicineCatgory";
import MedicineInfo from "@/pages/MedicineInfo";
import MessagePage from "@/pages/Message";
import WaterFallPage from "@/pages/WaterFallPage";

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
    key: "/admin/dashboard",
    element: <Dashboard />,
    icon: <DashboardOutlined />,
  },
  {
    label: "药品管理",
    key: "/admin/medicine",
    icon: <HeartOutlined />,
    children: [
      {
        label: "药品分类",
        key: "/admin/medicine/category",
        element: <MedicineCatgory />,
      },
      {
        label: "药品信息",
        key: "/admin/medicine/info",
        element: <MedicineInfo />,
      },
    ],
  },
  {
    label: "文章管理",
    key: "/admin/article",
    icon: <FileOutlined />,
    children: [
      {
        label: "文章分类",
        key: "/admin/article/category",
        element: <ArticleCatgory />,
      },
      {
        label: "文章信息",
        key: "/admin/article/info",
        element: <ArticleInfo />,
      },
    ],
  },

  {
    label: "消息",
    key: "/admin/message",
    icon: <MessageOutlined />,
    element: <MessagePage />,
  },
  {
    label: "Flex瀑布流",
    key: "/admin/flexwaterfall",
    icon: <UserOutlined />,
    element: <Masonry />,
  },

  {
    label: "瀑布流",
    key: "/admin/waterfall",
    icon: <FallOutlined />,
    element: <WaterFallPage />,
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
