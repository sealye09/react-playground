import { Icon } from "@iconify/react";
import type { ToastType } from "./ToastProvider";

const ToastIcon = ({ type }: { type: ToastType }) => {
  switch (type) {
    case "success":
      return (
        <Icon
          icon="heroicons:check-circle"
          className="w-full h-full text-green-900"
        />
      );
    case "error":
      return (
        <Icon
          icon="heroicons:exclamation-circle"
          className="w-full h-full text-red-900"
        />
      );
    case "warning":
      return (
        <Icon
          icon="heroicons:exclamation-triangle"
          className="w-full h-full text-yellow-900"
        />
      );
    case "info":
      return (
        <Icon
          icon="heroicons:information-circle"
          className="w-full h-full text-blue-900"
        />
      );
    default:
      return (
        <Icon icon="heroicons:information-circle" className="w-full h-full" />
      );
  }
};

export default ToastIcon;
