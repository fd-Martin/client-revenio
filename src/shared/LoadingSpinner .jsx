// import Lottie from "lottie-react";
import React from "react";
// import animationData from "../../public/mySpine.json";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      {" "}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-orange-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
      </div>{" "}
    </div>
  );
};

export default LoadingSpinner;
