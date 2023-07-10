import { FC, useContext } from "react";
import { Button } from "antd";
import { ToastContext } from "@/components/Toast";

interface MessagePageProps {}

const MessagePage: FC<MessagePageProps> = ({}) => {
  const { dispatch } = useContext(ToastContext);

  const handleSuccess = () => {
    console.log("Success");
    dispatch({
      type: "ADD_TOAST",
      payload: {
        message: "Success",
        type: "success",
      },
    });
  };

  const handleInfo = () => {
    console.log("Info");

    dispatch({
      type: "ADD_TOAST",
      payload: {
        message: "Info",
        type: "info",
      },
    });
  };

  const handleWarning = () => {
    console.log("Warning");
    dispatch({
      type: "ADD_TOAST",
      payload: {
        message: "Warning",
        type: "warning",
      },
    });
  };

  const handleError = () => {
    console.log("Error");
    dispatch({
      type: "ADD_TOAST",
      payload: {
        message: "Error",
        type: "error",
      },
    });
  };

  return (
    <>
      <div className="flex gap-4">
        <Button
          className="bg-green-500"
          onClick={handleSuccess}
        >
          Sucess
        </Button>
        <Button
          className="bg-blue-500"
          onClick={handleInfo}
        >
          Info
        </Button>
        <Button
          className="bg-red-500"
          onClick={handleError}
        >
          Errror
        </Button>
        <Button
          className="bg-yellow-500"
          onClick={handleWarning}
        >
          Warn
        </Button>
      </div>
    </>
  );
};

export default MessagePage;
