import { FC, createContext, useReducer } from "react";

type ToastActionType = "ADD_TOAST" | "DELETE_TOAST";

interface IToastAction {
  type: ToastActionType;
  payload: any;
}

export interface IToast {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}

interface IToastContext {
  state: IToast[];
  dispatch: React.Dispatch<IToastAction>;
}

export const ToastContext = createContext<IToastContext>([] as any);

interface IToastProvider {
  children: React.ReactNode;
}

export const ToastProvider: FC<IToastProvider> = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<IToast[], IToastAction>>((state, action) => {
    switch (action.type) {
      case "ADD_TOAST":
        const id = Math.random().toString(36).substr(2, 9);
        const duration = action.payload.duration || 3000;
        if (state.length > 0) {
          return [...state, { ...action.payload, id, duration }];
        } else return [{ ...action.payload, id, duration }];

      case "DELETE_TOAST":
        return state.filter((toast) => toast.id !== action.payload);
      default:
        return state;
    }
  }, [] as any);

  return <ToastContext.Provider value={{ state, dispatch }}>{children}</ToastContext.Provider>;
};
