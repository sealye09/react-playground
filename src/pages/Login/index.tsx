import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import styles from "@/styles/login.module.scss";

interface Props {}

const Login: FC<Props> = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log("login...");
    // const res = await loginAPI({ ...values });
    // if (res.success) {
    //   setToken(res.data);
    //   messageApi.open({
    //     type: "success",
    //     content: "登入成功",
    //   });
    //   navigate("/admin/dashboard");
    // } else {
    //   messageApi.open({
    //     type: "error",
    //     content: `${res.errorMessage}`,
    //   });
    // }
  };

  return (
    <div className={styles.root}>
      {contextHolder}
      <Form
        size="large"
        name="normal_login"
        className={styles.form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="userName"
          rules={[{ required: true, message: "请输入用户名！" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码！" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登入
          </Button>
          <a
            style={{ padding: "0 16px" }}
            href=""
          >
            去注册
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
