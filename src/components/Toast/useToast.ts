import { useContext } from "react";
import { ToastAction, ToastContext, ToastType } from "./ToastProvider";

export const useToast = () => {
  const { dispatch } = useContext(ToastContext);

  const success = (message: string, duration = 3000) => {
    dispatch({
      type: ToastAction.ADD_TOAST,
      payload: {
        message: message,
        type: "success",
        duration: duration,
      },
    });
  };

  const error = (message: string, duration = 3000) => {
    dispatch({
      type: ToastAction.ADD_TOAST,
      payload: {
        message: message,
        type: "error",
        duration: duration,
      },
    });
  };

  const info = (message: string, duration = 3000) => {
    dispatch({
      type: ToastAction.ADD_TOAST,
      payload: {
        message: message,
        type: "info",
        duration: duration,
      },
    });
  };

  const warning = (message: string, duration = 3000) => {
    dispatch({
      type: ToastAction.ADD_TOAST,
      payload: {
        message: message,
        type: "warning",
        duration: duration,
      },
    });
  };

  const toast = ({
    message = "info",
    type = "info",
    duration = 3000,
  }: {
    message: string;
    type?: ToastType;
    duration?: number;
  }) => {
    dispatch({
      type: ToastAction.ADD_TOAST,
      payload: {
        message: message,
        type: type,
        duration: duration,
      },
    });
  };

  return {
    success,
    error,
    info,
    warning,
    toast,
  };
};
