import { FC, useState } from "react";
import { Breadcrumb, Button, Layout as AntdLayout, Menu, theme } from "antd";
import { RouteType } from "../AppProvider";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import Avatar from "./Avatar";
import logo from "../../assets/react.svg";
import styles from "@/styles/layout.module.scss";
import React from "react";

const { Header, Content, Footer, Sider } = AntdLayout;

interface Props {
  menuItems: RouteType;
}

const title = "React Playground";

const Layout: FC<Props> = ({ menuItems }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  return (
    <AntdLayout>
      <Sider
        className={styles.sider}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        collapsible
      >
        <div className={styles.sider_head} />
        <Menu
          theme="dark"
          // defaultValue={}
          defaultSelectedKeys={[...location.pathname]}
          mode="inline"
          // @ts-ignore
          items={menuItems}
          onClick={(key) => {
            navigate(key.key);
          }}
        />
      </Sider>
      <AntdLayout
        style={{
          marginLeft: collapsed ? 80 : 200,
        }}
        className={styles.site_layout}
      >
        <Header
          className={styles.header}
          style={{ background: colorBgContainer }}
        >
          <div className={styles.left_head}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <h2>{title}</h2>
          </div>
          <div className={styles.right_head}>
            <Avatar avatarSrc={logo} />
          </div>
        </Header>

        <Content
          style={{ margin: "24px 16px 0", overflow: "initial" }}
          className={styles.content}
        >
          <Breadcrumb className={styles.bread}>
            <Breadcrumb.Item>sample</Breadcrumb.Item>
            <Breadcrumb.Item>sample</Breadcrumb.Item>
            <Breadcrumb.Item>sample</Breadcrumb.Item>
          </Breadcrumb>

          <div
            className={styles.content_center}
            style={{
              background: colorBgContainer,
            }}
          >
            <div style={{ padding: 24, textAlign: "center", background: colorBgContainer }}>
              <p>long content</p>
              {
                // indicates very long content
                Array.from({ length: 100 }, (_, index) => (
                  <React.Fragment key={index}>
                    {index % 20 === 0 && index ? "more" : "..."}
                    <br />
                  </React.Fragment>
                ))
              }
            </div>
            <Outlet />
          </div>
        </Content>
        <Footer className={styles.footer}>Ant Design ©2023 Created by Ant UED</Footer>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
