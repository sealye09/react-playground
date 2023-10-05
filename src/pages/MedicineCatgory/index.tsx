import { useEffect, useState } from "react";

const MedicineCatgory = () => {
  console.log("render", Math.random());
  const [count, setCount] = useState(0);

  const handleAdd = async () => {
    console.log("add start");
    // setTimeout(() => {
    //   setCount((count) => count + 1);
    // }, 1000);
    setCount((count) => count + 1);

    console.log("count:", count);
    console.log("add end");
  };



  return (
    <>
      <div className="text-2xl">{count}</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAdd}
      >
        +1
      </button>
    </>
  );
};

export default MedicineCatgory;
