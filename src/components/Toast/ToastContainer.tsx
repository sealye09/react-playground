import { FC, useContext } from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { ToastContext, ToastPosition } from ".";
import Toast from "./Toast";

const positionVariant = cva(["absolute z-50 space-y-4 min-w-fit"], {
  variants: {
    position: {
      "top-left": "top-8 left-12",
      "top-center": "top-8 left-1/2 -translate-x-1/2",
      "top-right": "top-8 right-12",
      "bottom-left": "bottom-8 left-12",
      "bottom-center": "bottom-8 left-1/2 -translate-x-1/2",
      "bottom-right": "bottom-8 right-12",
    },
  },
  defaultVariants: {
    position: "top-center",
  },
});
interface ToastContainerProps extends VariantProps<typeof positionVariant> {
  position?: ToastPosition;
  duration?: number;
}

export const ToastContainer: FC<ToastContainerProps> = ({
  position = "top-center",
  duration = 3000,
}) => {
  const { state, pauseAll, startAll } = useContext(ToastContext);

  const handleMouseEnter = () => {
    // console.log("mouse enter");
    pauseAll();
  };

  const handleMouseLeave = () => {
    // console.log("mouse leave");
    startAll();
  };

  if (!state) return null;

  return (
    <div
      className={cn(positionVariant({ position }))}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {state.map((toast) => {
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
