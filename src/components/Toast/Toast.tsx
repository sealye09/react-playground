import { FC, useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import { VariantProps, cva } from "class-variance-authority";
import { ToastContext, ToastType } from ".";
import ToastIcon from "./ToastIcon";

const bgColorVariant = cva(
  ["flex", "justify-between", "gap-2", "px-4", "py-2", "rounded-md", "shadow-lg", "min-w-fit"],
  {
    variants: {
      intent: {
        success: "bg-green-200",
        error: "bg-red-200",
        warning: "bg-yellow-200",
        info: "bg-blue-200",
      },
    },
    defaultVariants: {
      intent: "info",
    },
  },
);

const hoverBgColorVariant = cva(
  [
    "w-5",
    "h-5",
    "p-1",
    "rounded-md",
    "flex",
    "justify-center",
    "items-center",
    "translate-x-4",
    "-translate-y-1.5",
  ],
  {
    variants: {
      intent: {
        success: ["hover:bg-green-300/90"],
        error: ["hover:bg-red-300/90"],
        warning: ["hover:bg-yellow-300/90"],
        info: ["hover:bg-blue-300/90"],
      },
    },
    defaultVariants: {
      intent: "info",
    },
  },
);

const textColorVariant = cva(["text-sm"], {
  variants: {
    intent: {
      success: "text-green-900",
      error: "text-red-900",
      warning: "text-yellow-900",
      info: "text-blue-900",
    },
  },
  defaultVariants: {
    intent: "info",
  },
});

interface ToastProps
  extends VariantProps<typeof bgColorVariant>,
    VariantProps<typeof hoverBgColorVariant> {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

const Toast: FC<ToastProps> = ({ id, message, type, duration }) => {
  const { dispatch } = useContext(ToastContext);

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
      className={bgColorVariant({ intent: type })}
    >
      <div className="w-6 h-6 flex justify-center items-center">
        <ToastIcon type={type} />
      </div>
      <div className="body flex flex-1 flex-col mx-4">
        <span className={textColorVariant({ intent: type })}>{message}</span>
      </div>
      <div
        className={hoverBgColorVariant({ intent: type })}
        onClick={() => onDismiss(id)}
      >
        <Icon icon="heroicons:x-mark" />
      </div>
    </div>
  );
};

export default Toast;
