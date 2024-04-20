import React from "react";
import { RingLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-10">
      <div className="flex flex-col ">
        <RingLoader color="#36d7b7" loading={true} />
        <div className="text-lg font-bold text-white">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
