import { FC, useContext } from "react";
import { ToastContext, ToastPosition } from ".";
import Toast from "./Toast";

interface ToastContainerProps {
  position?: ToastPosition;
  duration?: number;
}

export const ToastContainer: FC<ToastContainerProps> = ({
  duration = 3000,
  position = "top-center",
}) => {
  const { state } = useContext(ToastContext);
  return (
    <div className="absolute top-4 z-50 left-1/2 -translate-x-1/2 flex flex-col gap-4">
      {!!state &&
        state.map((toast) => {
          return (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              duration={duration}
            />
          );
        })}
    </div>
  );
};

export default ToastContainer;
