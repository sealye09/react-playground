import { Button } from "antd";
import { FC } from "react";

interface Props {}

const Dashboard: FC<Props> = ({}) => {
  async function asyncFunc() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(() => alert("asyncFunc"));
      }, 2000);
    });
  }

  return (
    <div>
      <Button
        onClick={async () => {
          await asyncFunc();
          console.log("click");
        }}
      >
        Async Button
      </Button>

      {"0" && <Button>&&</Button>}
    </div>
  );
};

export default Dashboard;
