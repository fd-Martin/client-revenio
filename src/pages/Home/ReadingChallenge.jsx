import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaFire,
  FaBookOpen,
  FaMedal,
  FaCrown,
  FaArrowRight,
} from "react-icons/fa";

const ReadingChallenge = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariant = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className=" px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className={`relative rounded-lg p-6 sm:p-10 md:p-16 overflow-hidden `}
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-xs sm:text-sm tracking-wide uppercase"
            >
              <FaFire className="text-orange-500 animate-pulse" /> Trending
              Challenge
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className={`text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight ${
                isDark ? " text-primary" : "text-gray-900"
              }`}
            >
              Level Up Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Reading Game
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className={`text-base sm:text-lg max-w-xl ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Join thousands of book lovers in the ultimate reading marathon.
              Track progress, earn badges, and dominate the leaderboard!
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="group relative w-full sm:w-auto px-8 py-3 rounded-full bg-orange-500 text-white font-bold tracking-wide shadow-lg hover:shadow-orange-500/40 transition-all duration-300 overflow-hidden flex justify-center items-center">
                <span className="relative z-10 flex items-center gap-2">
                  Join Now <FaArrowRight />
                </span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-orange-400"></div>
              </button>

              <button
                className={`w-full sm:w-auto px-8 py-3 rounded-full font-bold text-lg border-2 transition-all duration-300 flex justify-center items-center gap-2 ${
                  isDark
                    ? "border-gray-600 text-white hover:bg-gray-800"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                View Leaderboard
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 pt-6"
            >
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white dark:border-gray-800"
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="User"
                  />
                ))}
              </div>
              <div className={isDark ? "text-gray-300" : "text-gray-600"}>
                <p className="font-bold text-lg sm:text-xl">
                  +<CountUp end={1500} duration={2.5} />k
                </p>
                <p className="text-xs sm:text-sm">Active Readers</p>
              </div>
            </motion.div>
          </div>

          {/* Right Interactive Visuals */}
          <div className="relative mt-12 lg:mt-0">
            {/* Floating Cards */}
            <motion.div
              variants={floatingVariant}
              animate="animate"
              className={`absolute -top-6 right-0 sm:right-10 lg:right-10 z-20 p-3 sm:p-4 rounded-2xl shadow-xl backdrop-blur-md border scale-90 sm:scale-100 origin-bottom-left ${
                isDark
                  ? "bg-gray-800/80 border-gray-700"
                  : "bg-white/80 border-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-yellow-100 rounded-full text-yellow-600">
                  <FaCrown className="text-lg sm:text-xl" />
                </div>
                <div>
                  <p
                    className={`text-[10px] sm:text-xs font-bold ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Top Reader
                  </p>
                  <p
                    className={`text-sm sm:text-base font-bold ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Alex M.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={floatingVariant}
              animate="animate"
              transition={{ delay: 1 }}
              className={`absolute -bottom-6 left-0 z-20 p-3 sm:p-4 rounded-2xl shadow-xl backdrop-blur-md border scale-90 sm:scale-100 origin-top-right ${
                isDark
                  ? "bg-gray-800/80 border-gray-700"
                  : "bg-white/80 border-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-green-100 rounded-full text-green-600">
                  <FaMedal className="text-lg sm:text-xl" />
                </div>
                <div>
                  <p
                    className={`text-[10px] sm:text-xs font-bold ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Current Streak
                  </p>
                  <p
                    className={`text-sm sm:text-base font-bold ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    45 Days 🔥
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Main Graphic */}
            <div
              className={`relative z-10 rounded-3xl overflow-hidden shadow-2xl transform rotate-0 lg:rotate-2 hover:rotate-0 transition-transform duration-500 ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h3
                  className={`font-bold text-base sm:text-lg ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  BookCourier Progress
                </h3>
                <FaBookOpen className="text-orange-500" />
              </div>
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span
                      className={isDark ? "text-gray-300" : "text-gray-600"}
                    >
                      Yearly Goal
                    </span>
                    <span className="text-orange-600">78%</span>
                  </div>
                  <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "78%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`p-3 sm:p-4 rounded-xl ${
                      isDark ? "bg-gray-700" : "bg-orange-50"
                    }`}
                  >
                    <p className="text-xl sm:text-2xl font-bold text-orange-600">
                      <CountUp end={42} duration={3} />
                    </p>
                    <p
                      className={`text-[10px] sm:text-xs ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Books Read
                    </p>
                  </div>
                  <div
                    className={`p-3 sm:p-4 rounded-xl ${
                      isDark ? "bg-gray-700" : "bg-blue-50"
                    }`}
                  >
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">
                      <CountUp end={12500} separator="," duration={3} />
                    </p>
                    <p
                      className={`text-[10px] sm:text-xs ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Pages Turned
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReadingChallenge;
