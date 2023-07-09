import { FC, useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import { ToastContext } from ".";

interface ToastProps {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}

const Toast: FC<ToastProps> = ({ id, message, type, duration }) => {
  const { state, dispatch } = useContext(ToastContext);

  const onDismiss = (id: string) => {
    dispatch({
      type: "DELETE_TOAST",
      payload: id,
    });
  };

  useEffect(() => {
    if (duration) {
      const interval = setInterval(() => {
        onDismiss(id);
      }, duration);

      return () => {
        console.log("clear interval");
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div
      key={id}
      className="flex justify-between gap-2 px-4 py-2 bg-red-200 rounded-md shadow-lg min-w-fit"
    >
      <div className="w-6 h-6 flex justify-center items-center">
        <Icon
          icon="heroicons:information-circle"
          className="w-full h-full"
        />
      </div>
      <div className="body flex flex-1 flex-col mx-4">
        <span className="message text-sm">{message}</span>
      </div>
      <div
        className="w-5 h-5 p-1 hover:bg-red-500 rounded-md flex justify-center items-center translate-x-4 -translate-y-1.5"
        onClick={() => onDismiss(id)}
      >
        <Icon icon="heroicons:x-mark" />
      </div>
    </div>
  );
};

export default Toast;
