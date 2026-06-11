import Lottie from "lottie-react";
import React from "react";
import { Link } from "react-router";
import animationData from "../../public/loding.json";

const Forbitiene = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <div className="w-64 h-64">
        <Lottie
          animationData={animationData}
          className="w-50 h-50"
          loop={true}
          autoplay={true}
        />
      </div>

      <h1 className="text-3xl font-bold text-red-600 mt-4">
        You Are Forbidden to Access This Page
      </h1>

      <p className="text-lg text-gray-600 mt-2">
        Please contact the administrator if you believe this is an error.
      </p>

      <div className="my-5 space-x-3">
        <Link to="/" className="btn btn-primary text-black">
          Go to Home
        </Link>
        <Link className="btn btn-secondary" to="/deshbord">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Forbitiene;
