import React, { useEffect, useState } from "react";
import H1text from "../../utils/H1text";
import { FaAward, FaBookOpen, FaUsers, FaPenNib } from "react-icons/fa";
import { motion } from "framer-motion";

const AuthorSpotlight = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
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
    <div className="py-16  dark:bg-gray-800 rounded-3xl my-10 px-6 md:px-12">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Image Side */}
        <div className="w-full md:w-1/3 relative">
          <div className="absolute inset-0 bg-primary/20 rounded-2xl transform rotate-3 scale-105 z-0"></div>
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600"
            alt="Featured Author"
            className="relative z-10 w-full h-[400px] object-cover rounded-2xl shadow-xl grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Content Side */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
            <FaAward /> Author of the Month
          </div>

          <h2 className="text-4xl font-bold text-primary dark:text-white">
            J.K. Rowling
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            British author and philanthropist, best known for writing the Harry
            Potter fantasy series. The books have won multiple awards, and sold
            more than 500 million copies, becoming the best-selling book series
            in history.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {/* Stat 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className={`p-4 rounded-xl shadow-sm text-center cursor-pointer transition-colors duration-300 ${
                isDark ? "bg-gray-700" : "bg-white"
              }`}
            >
              <FaBookOpen className="mx-auto text-2xl text-primary mb-2" />
              <h4
                className={`font-bold text-xl ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                15+
              </h4>
              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Best Sellers
              </p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              className={`p-4 rounded-xl shadow-sm text-center cursor-pointer transition-colors duration-300 ${
                isDark ? "bg-gray-700" : "bg-white"
              }`}
            >
              <FaAward className="mx-auto text-2xl text-primary mb-2" />
              <h4
                className={`font-bold text-xl ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                42
              </h4>
              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Awards Won
              </p>
            </motion.div>

            {/* Stat 3 (New) */}
            <motion.div
              whileHover={{ y: -10 }}
              className={`p-4 rounded-xl shadow-sm text-center cursor-pointer transition-colors duration-300 ${
                isDark ? "bg-gray-700" : "bg-white"
              }`}
            >
              <FaUsers className="mx-auto text-2xl text-primary mb-2" />
              <h4
                className={`font-bold text-xl ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                500M+
              </h4>
              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Copies Sold
              </p>
            </motion.div>

            {/* Stat 4 (New) */}
            <motion.div
              whileHover={{ y: -10 }}
              className={`p-4 rounded-xl shadow-sm text-center cursor-pointer transition-colors duration-300 ${
                isDark ? "bg-gray-700" : "bg-white"
              }`}
            >
              <FaPenNib className="mx-auto text-2xl text-primary mb-2" />
              <h4
                className={`font-bold text-xl ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                25
              </h4>
              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Years Writing
              </p>
            </motion.div>
          </div>
          <button className="group relative px-8 py-2.5 rounded-full bg-orange-500 text-white font-bold tracking-wide shadow-lg hover:shadow-orange-500/40 transition-all duration-300 overflow-hidden">
            <span className="relative z-10"> View All Books</span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-orange-400"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorSpotlight;
