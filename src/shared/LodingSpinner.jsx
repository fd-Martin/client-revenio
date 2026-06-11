import React from "react";
import animationData from "../../public/loding.json";

const LodingSpinner = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-[90vh]">
        <Lottie
          animationData={animationData}
          className="w-50 h-50"
          loop={true}
          autoplay={true}
        />{" "}
      </div>
    </div>
  );
};

export default LodingSpinner;
