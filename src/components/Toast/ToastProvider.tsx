import {
  type ReactNode,
  type Reducer,
  createContext,
  useReducer,
  useRef,
} from "react";
import ToastContainer from "./ToastContainer";

export enum ToastAction {
  ADD_TOAST = "ADD_TOAST",
  DELETE_TOAST = "DELETE_TOAST",
}
export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type IToastAction =
  | {
      type: ToastAction.ADD_TOAST;
      payload: {
        message: string;
        type: ToastType;
        duration?: number;
      };
    }
  | {
      type: ToastAction.DELETE_TOAST;
      payload: string;
    };

export type IToast = {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
};

type IToastContext = {
  state: IToast[];
  dispatch: React.Dispatch<IToastAction>;
  pauseAll: () => void;
  startAll: () => void;
};

export const ToastContext = createContext<IToastContext>({} as IToastContext);

export const ToastProvider = ({
  children,
  position = "top-center",
}: {
  children: ReactNode;
  position?: ToastPosition;
}) => {
  const timers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const pauseAll = () => {
    for (const timer of timers.current.values()) {
      clearTimeout(timer);
    }
  };

  const startAll = () => {
    let accDuration = 500;
    timers.current.forEach((_, id) => {
      const toast = state.find((toast) => toast.id === id);
      if (toast) {
        const timer = setTimeout(() => {
          dispatch({ type: ToastAction.DELETE_TOAST, payload: id });
        }, Number(toast.duration) + accDuration);

        timers.current.set(id, timer);
        accDuration += 500;
      }
    });
  };

  const [state, dispatch] = useReducer<Reducer<IToast[], IToastAction>>(
    (state, action) => {
      switch (action.type) {
        case "ADD_TOAST": {
          const id = Math.random().toString(36).slice(2, 11);
          const duration = action.payload.duration || 3000;

          const timer = setTimeout(() => {
            dispatch({ type: ToastAction.DELETE_TOAST, payload: id });
          }, duration);

          timers.current.set(id, timer);

          if (state.length > 0) {
            return [...state, { ...action.payload, id, duration }];
          }
          return [{ ...action.payload, id, duration }];
        }

        case "DELETE_TOAST": {
          const timerToDelete = timers.current.get(action.payload);
          if (timerToDelete) {
            clearTimeout(timerToDelete);
            timers.current.delete(action.payload);
          }

          return state.filter((toast) => toast.id !== action.payload);
        }

        default:
          return state;
      }
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ state, dispatch, pauseAll, startAll }}>
      {children}
      <ToastContainer position={position} />
    </ToastContext.Provider>
  );
};
