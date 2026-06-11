import React from "react";
import { Link } from "react-router-dom";
import animationData from "../../public/loding.json";

import Lottie from "lottie-react";

const NotFound404 = () => {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
      <div>
        <Lottie
          animationData={animationData}
          className="w-50 h-50"
          loop={true}
          autoplay={true}
        />
      </div>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-600 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold px-5 py-3 rounded-lg shadow-lg transition"
      >
        {/* Home Icon SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 9.75L12 3l9 6.75v10.5A2.25 2.25 0 0118.75 22.5H5.25A2.25 2.25 0 013 20.25V9.75z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 22.5v-6h6v6"
          />
        </svg>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound404;
