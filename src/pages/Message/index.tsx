import { Button } from "antd";
import { useToast } from "@/components/Toast/useToast";

const MessagePage = () => {
  const { toast, success, info } = useToast();

  const handleSuccess = () => {
    console.log("Success");
    success("Success");
  };

  const handleInfo = () => {
    console.log("Info");
    info("Info");
  };

  const handleWarning = () => {
    console.log("Warning");
    toast({
      message: "Warning",
      type: "warning",
      duration: 500,
    });
  };

  const handleError = () => {
    console.log("Error");
    toast({
      message: "Error",
      type: "error",
      duration: 500,
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
