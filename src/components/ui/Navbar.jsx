import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Home,
  Settings,
  Bell,
  User,
  Moon,
  Sun,
  Search,
  ChevronDown,
  Heart,
  Info,
  Globe,
} from "lucide-react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { GiSpellBook } from "react-icons/gi";
import { FaUserCog } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import logo from "../../assets/book.png"
import { FaBookReader } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { FiUser } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { PiSignOutLight } from "react-icons/pi";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner ";
import { IoIosLogOut } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";

export default function Navbar() {
  const { user, userLogOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  // THEME STATE
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [darkMode, setDarkMode] = useState(theme === "dark");

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setDarkMode(theme === "dark");
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const bgPrimary = darkMode ? "bg-gray-900" : "bg-white";
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-300" : "text-gray-700";
  const textMuted = darkMode ? "text-gray-400" : "text-gray-600";
  const borderColor = darkMode ? "border-gray-800" : "border-gray-200";
  const hoverBg = darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100";

  // Real Time Updeat Baki..... ?
  const { data: wishlistCount } = useQuery({
    queryKey: ["whisListdata", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `whisListdataGetANndswr?email=${user?.email}`,
      );
      // console.log(res.data);
      return res?.data;
    },
  });

  const { data: usersas } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `loginRealTimerUser?email=${user?.email}`,
      );
      return res.data;
    },
  });

  return (
    <nav
      className={`${bgPrimary} border-b ${borderColor} shadow-sm transition-colors duration-300 sticky top-0 z-50    fixed `}
    >
      <div className=" w-11/12 mx-auto py-0.5  md:px-0 px-3  ">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            
            <div className="navbar-start flex  items-center ">             
            <img src={logo} alt="" className="h-1/3 w-52" />
            </div> 
            
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all duration-200`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </NavLink>
            <NavLink
              to="/books"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all duration-200`}
            >
              <GiSpellBook className="w-5 h-5" />
              <span className="font-medium">All Books</span>
            </NavLink>
            <NavLink
              to="/about"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all duration-200`}
            >
              <Info className="w-5 h-5" />
              <span className="font-medium">About</span>
            </NavLink>
            <NavLink
              to="/coverage"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all duration-200`}
            >
              <Globe className="w-5 h-5" />
              <span className="font-medium">Coverage</span>
            </NavLink>
            <NavLink
              to="/deshbord"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all duration-200`}
            >
              <MdOutlineDashboardCustomize className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap1.5 md:gap-3">
            {/* Profile Dropdown */}
            <div className="relative hidden md:block ">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className={`flex items-center gap-2 p-1 rounded-lg ${hoverBg} transition-all duration-200`}
              >
                {user ? (
                  <img
                    src={usersas?.photoURL}
                    className="w-11 h-11 rounded-full"
                  ></img>
                ) : (
                  <div className=" flex text-center gap-6 ">
                    <Link
                      to="/auth/login"
                      className="px-5 py-1.5 rounded-xl font-semibold text-[#e85d04]
                            border-2 hover:border flex items-center gap-3 border-[#e85d04]
                            transition-all duration-300
                            hover:bg-gradient-to-r from-[#C2410C] to-[#e85d04]
                            hover:text-white hover:scale-105"
                    >
                      <FaUserCheck className=" w-4 h-4" /> Login
                    </Link>

                    {/* REGISTER */}
                    <Link
                      to="/auth/rigester"
                      className="px-5 py-1.5 gap-3 rounded-xl text-white font-semibold
                            bg-gradient-to-r from-[#C2410C] to-[#e85d04]
                            shadow-lg transition-all flex items-center duration-300
                            hover:scale-105"
                    >
                      <FaUserCog className=" w-4 h-4" /> Register
                    </Link>
                  </div>
                )}
                <ChevronDown
                  className={`w-4 h-4 ${textSecondary} hidden sm:block transition-transform duration-200 ${
                    profileDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {user && profileDropdown && (
                <div
                  className={`absolute right-0 mt-2 w-56 ${bgPrimary} rounded-xl shadow-xl border ${borderColor} py-2 transition-all duration-200`}
                >
                  {usersas && (
                    <>
                      <div className={`px-5 py-5 border-b ${borderColor}`}>
                        <p className={`font-semibold ${textPrimary}`}>
                          {usersas?.displayName}
                        </p>
                        <p className={`text-sm ${textMuted}`}>
                          {usersas?.email}
                        </p>
                      </div>

                      <Link
                        to="/profile2"
                        className={`flex items-center gap-3 px-5 py-2 ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all`}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>

                      <Link
                        to="/settingse"
                        className={`flex items-center gap-3 px-5 py-2 ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all`}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>

                      <div className={`border-t ${borderColor} mt-2 pt-2`}>
                        <button
                          onClick={userLogOut}
                          className={`w-full rounded-lg text-left flex items-center gap-3 px-4 py-2 text-orange-500 bg-orange-50 ${hoverBg} transition-all`}
                        >
                          <PiSignOutLight className="w-5 h-5" />
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className={`p-2 rounded-lg ${hoverBg} ${textSecondary} hover:text-orange-500 transition-all duration-200`}
              title={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {}
            {/* Wishlist Button */}
            <Link to="/deshbord/whishList">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg ${hoverBg} ${textSecondary} hover:text-red-500 transition-all duration-200 relative group`}
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  <Heart className="w-5 h-5 group-hover:fill-red-500" />
                </motion.div>

                {/* Wishlist Count Badge */}
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-5 h-5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 shadow-lg"
                  >
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </motion.span>
                )}

                {/* Pulse Animation for New Addition */}
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full animate-ping opacity-75"></span>
                )}
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${hoverBg} ${textSecondary} transition-all`}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4  pb-6 border-t ${borderColor}`}>
            <div className="space-y-1">
              <div className="relative px-3 ">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className={`flex items-center gap-2 p-1 rounded-lg ${hoverBg} transition-all duration-200`}
                >
                  {user ? (
                    <div>
                      <img
                        src={usersas?.photoURL}
                        className="w-12 h-12 rounded-full"
                      ></img>
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      <FiUser></FiUser>
                    </div>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 ${textSecondary} hidden sm:block transition-transform duration-200 ${
                      profileDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              <NavLink
                to="/profile2"
                className={`flex items-center gap-3 px-4 py-2 ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </NavLink>
              <NavLink
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all duration-200`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </NavLink>
              <NavLink
                to="/about"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all duration-200`}
              >
                <Info className="w-5 h-5" />
                <span className="font-medium">About</span>
              </NavLink>
              <NavLink
                to="/coverage"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all duration-200`}
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium">Coverage</span>
              </NavLink>

              <NavLink
                to="/books"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all duration-200`}
              >
                <GiSpellBook className="w-5 h-5" />
                <span className="font-medium">All Books</span>
              </NavLink>
              <NavLink
                to="/deshbord"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all duration-200`}
              >
                <MdOutlineDashboardCustomize className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </NavLink>
              <NavLink
                to="/settingse"
                className={`flex items-center gap-3 px-4 py-2 ${textSecondary} ${hoverBg} hover:text-orange-500 transition-all`}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </NavLink>
              {user ? (
                <>
                  <div className=" px-4">
                    <button
                      onClick={() => userLogOut()}
                      className="px-6 py-1.5 mt-2 gap-2 rounded-lg  font-semibold
        bg-gradient-to-br from-orange-400 to-orange-600 text-white hover:opacity-90
         shadow-lg transition-all flex items-center justify-center duration-300
         hover:scale-105 w-35"
                    >
                      <IoIosLogOut className="w-5 h-5 md:w-4 md:h-4" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className=" flex flex-col px-4 text-center gap-3 ">
                  <Link
                    to="/auth/login"
                    className="px-6 py-[4px]  w-35 rounded-lg font-semibold text-[#e85d04]
                            border-2 hover:border flex items-center gap-3 border-[#e85d04]
                            transition-all duration-300
                            hover:bg-gradient-to-r from-[#C2410C] to-[#e85d04]
                            hover:text-white hover:scale-105"
                  >
                    <FaUserCheck className=" w-4 h-4" /> Login
                  </Link>

                  {/* REGISTER */}
                  <Link
                    to="/auth/rigester"
                    className="px-6 py-1.5 mt-2 gap-2 rounded-lg  font-semibold
        bg-gradient-to-br from-orange-400 to-orange-600 text-white hover:opacity-90
         shadow-lg transition-all flex items-center justify-center duration-300
         hover:scale-105 w-35"
                  >
                    <FaUserCog className="w-4 h-4 md:w-4 md:h-4" />
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
