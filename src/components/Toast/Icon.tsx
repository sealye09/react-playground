import { FC } from "react";
import { Icon } from "@iconify/react";

interface ToastIconProps {
  type: "success" | "error" | "warning" | "info";
}

const ToastIcon: FC<ToastIconProps> = ({ type }) => {
  switch (type) {
    case "success":
      return (
        <Icon
          icon="heroicons:check-circle"
          className="w-6 h-6"
        />
      );
    case "error":
      return (
        <Icon
          icon="heroicons:exclamation-circle"
          className="w-6 h-6"
        />
      );
    case "warning":
      return (
        <Icon
          icon="heroicons:exclamation-triangle"
          className="w-6 h-6"
        />
      );
    case "info":
      return (
        <Icon
          icon="heroicons:information-circle"
          className="w-6 h-6"
        />
      );
    default:
      return (
        <Icon
          icon="heroicons:information-circle"
          className="w-6 h-6"
        />
      );
  }
};

export default ToastIcon;
