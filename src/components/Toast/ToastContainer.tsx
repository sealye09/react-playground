import { type VariantProps, cva } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { type FC, useContext } from "react";

import { cn } from "@/utils/cn";
import Toast from "./Toast";
import { ToastContext, type ToastPosition } from "./ToastProvider";

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

type ToastContainerProps = {
  position?: ToastPosition;
} & VariantProps<typeof positionVariant>;

export const ToastContainer: FC<ToastContainerProps> = ({
  position = "top-center",
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
      <AnimatePresence>
        {state.map((toast) => (
          <motion.div
            key={toast.id}
            className="relative"
            initial={{ opacity: 0, scale: 0.85, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -50 }}
            transition={{ duration: 0.3, type: "ease" }}
          >
            <Toast id={toast.id} message={toast.message} type={toast.type} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
