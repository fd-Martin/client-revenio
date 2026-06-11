import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const Card = ({ book }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    // Listen for theme changes from localStorage
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };

    // Check for theme changes
    const interval = setInterval(() => {
      const currentTheme = localStorage.getItem("theme") || "light";
      if (currentTheme !== theme) {
        setTheme(currentTheme);
      }
    }, 100);

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <div>
      <Link
        data-aos="fade-up"
        data-aos-delay="300"
        to={`/detlicesPages/${book._id}`}
        className={`
          max-w-sm 
          ${isDark ? "bg-gray-800" : "bg-white"}
          rounded-2xl 
          shadow-lg 
          overflow-hidden 
          group 
          hover:shadow-2xl 
          transition-shadow 
          duration-300 
          font-sans 
          block
          border ${isDark ? "border-gray-700" : "border-gray-200"}
          relative
        `}
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            className="
              mx-auto 
              h-40 
              py-4 
              transition-transform 
              duration-500 
              ease-in-out 
              group-hover:scale-110
            "
            src={book.image}
            alt={book.title}
          />

          {/* Stock Badge */}
          <span
            className="
              absolute top-2 left-2 
              bg-green-600 text-white text-xs 
              px-2 py-1 rounded-full shadow
            "
          >
            {book.availability_status || "In Stock"}
          </span>

          {/* Category Badge */}
          <span
            className="
              absolute top-2 right-2 
              bg-purple-600 text-white text-xs 
              px-2 py-1 rounded-full shadow
            "
          >
            {book.category}
          </span>

          {/* Hover Overlay */}
          <div
            className="
              absolute inset-0 
              bg-black/60 
              opacity-0 
              group-hover:opacity-100 
              text-white 
              flex flex-col justify-center items-start 
              p-4 
              transition-opacity duration-300 rounded-t-2xl
              text-xs
              space-y-1
            "
          >
            <p>
              <span className="font-semibold">Pages:</span> {book.page_count}
            </p>
            <p>
              <span className="font-semibold">Weight:</span> {book.weight} gm
            </p>
            <p>
              <span className="font-semibold">Publisher:</span> {book.publisher}
            </p>
            <p>
              <span className="font-semibold">Return Policy:</span>{" "}
              {book.return_policy}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div
          className={`p-3 px-6 border-t ${
            isDark ? "border-gray-700" : "border-gray-200"
          } flex flex-col gap-2`}
        >
          {/* Title */}
          <h2
            className={`text-lg font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            } truncate`}
            title={book.title}
          >
            Name: {book.title}
          </h2>

          {/* Language */}
          <p
            className={`text-xs ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Language : {book.language}
          </p>

          {/* Rating */}
          <p className="text-[12px] text-yellow-500 font-medium">
            Rating : ⭐ {book.rating_avg || 0} / 5
          </p>

          {/* Price */}
          <div
            className={`${
              isDark ? "text-white" : "text-gray-900"
            } font-semibold text-base mt-1`}
          >
            {/* MRP */}
            <p className="text-red-500 line-through">MRP: ৳ {book.price_mrp}</p>

            {/* Sell Price */}
            <p className="text-green-600 font-bold">
              Sell Price: ৳ {Math.floor(book.price_sell)}
            </p>
          </div>

          {/* View Details Button */}
          <button
            type="button"
            className="
              w-full 
              mt-3 
              bg-gradient-to-r from-orange-600 to-orange-400 
              text-white 
              font-semibold 
              py-2 
              rounded-lg 
              hover:from-orange-400 
              hover:to-orange-600 
              transition-colors 
              duration-300
            "
          >
            View Details
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Card;