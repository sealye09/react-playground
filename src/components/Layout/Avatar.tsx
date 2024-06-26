import { Avatar as AntdAvatar, Dropdown, type MenuProps } from "antd";
import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../../utils/tools";

interface Props {
  avatarSrc: string;
}

const Avatar: React.FC<Props> = ({ avatarSrc }) => {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "info",
      label: (
        <Link to="" replace>
          个人信息
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <Link
          to="login"
          replace
          onClick={() => {
            console.log("logout");
            clearToken();
            navigate("/");
          }}
        >
          退出
        </Link>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <AntdAvatar className="min-w-fit m-auto" src={avatarSrc} size={32} />
    </Dropdown>
  );
};

export default Avatar;
