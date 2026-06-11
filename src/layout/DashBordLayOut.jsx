import { NavLink, Link, Outlet, Navigate } from "react-router";

import { FaBookReader, FaUserCheck } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { CiSettings, CiUser } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { PiSignOutLight } from "react-icons/pi";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { HiMiniUserGroup } from "react-icons/hi2";
import { ImBooks } from "react-icons/im";
import { GiBookAura, GiWhiteBook } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import { BrickWallShield, Logs } from "lucide-react";
import { HiOutlineHome } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { CreditCard } from "lucide-react";
import LoadingSpinner from "../shared/LoadingSpinner ";
import useRole from "../hooks/useRole";
import { HiMenuAlt3 } from "react-icons/hi";

const DashBordLayOut = () => {
  const { user, loding, userLogOut } = useAuth();
  const { role, roleLoding } = useRole();
  // console.log(role);

  if (loding || roleLoding) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="drawer lg:drawer-open h-screen bg-base-100">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content flex flex-col h-screen">
        {/* ✅ FIXED NAVBAR */}
        <nav className="navbar fixed top-0  py-3 right-0 z-50 md:z-10 bg-base-300 px-4 shadow-md flex justify-between">
          <div className="flex items-center gap-1 md:gap-3 md:pl-60">
            {/* Toggle Button */}
            <div className=" block md:hidden">
              <NavLink
                to="/"
                className={() =>
                  `flex gap-3 items-center px-4 py-1.5 
                  `
                }
              >
                <HiOutlineHome className="w-6 h-6" />
              </NavLink>
            </div>
            {/* LOGO */}
            <div className="flex items-center gap-2 text-primary">
              <FaBookReader className="w-6 h-6" />
              <span className="text-xl font-semibold">BookCourier</span>
            </div>
          </div>

          {/* Avatar */}
          <div className=" md:pr-7 flex items-center gap-2">
            <div className="w-12 h-12 rounded-full ring ring-orange-500 flex items-center justify-center">
              {user ? (
                <img
                  src={user?.photoURL}
                  className=" w-12 h-12 rounded-full border border-orange-500"
                ></img>
              ) : (
                <CiUser className="w-7 h-7 text-orange-500" />
              )}
            </div>
            <label
              htmlFor="my-drawer-4"
              className="btn btn-ghost btn-square lg:hidden"
            >
              <Logs />
            </label>
          </div>
        </nav>

        {/* ✅ CONTENT (navbar height space added) */}
        <div className="flex-grow mt-14 py-10 px-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side h-screen">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        {/* ✅ FULL HEIGHT SIDEBAR */}
        <div className=" w-50 md:w-55 md:z-60 md:pt-2 bg-gray-900 text-white flex flex-col h-full">
          {/* MAIN MENU */}
          <ul className="menu px-4 py-4 flex-grow gap-6">
            <div className=" hidden md:block">
              <li>
                <NavLink
                  to="/"
                  className={() =>
                    `flex gap-3 items-center px-4 py-1.5 bg-orange-500 text-white md:mt-0 mt-18 rounded-xl
                  `
                  }
                >
                  <HiOutlineHome className="w-6 h-6" /> Home
                </NavLink>
              </li>
            </div>
            {/* ADMIN */}
            {role === "admin" && (
              <>
                <li className="pt-1">
                  <NavLink
                    to="/deshbord/admin"
                    className={({ isActive }) =>
                      `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                    }
                  >
                    <RiDashboardHorizontalLine className="w-6 h-6" /> Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/deshbord/adminuserDataSloved"
                    className={({ isActive }) =>
                      `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                    }
                  >
                    <HiMiniUserGroup className="w-6 h-6" /> All Users
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/deshbord/manazeBooks"
                    className={({ isActive }) =>
                      `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                    }
                  >
                    <ImBooks className="w-6 h-6" /> Manage Books
                  </NavLink>
                </li>
              </>
            )}
            {/* LIBRARIAN */}
            {role === "librarian" && (
              <>
                <li className="pt-1">
                  <NavLink
                    to="/deshbord/libraian"
                    className={({ isActive }) =>
                      `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                    }
                  >
                    <RiDashboardHorizontalLine className="w-6 h-6" /> Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/deshbord/addbooks"
                    className={({ isActive }) =>
                      `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                    }
                  >
                    <GiWhiteBook className="w-6 h-6" /> Add Book
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/deshbord/myBooks"
                    className={({ isActive }) =>
                      `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                    }
                  >
                    <GiBookAura className="w-6 h-6" /> My Books
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/deshbord/orderAllBooks"
                    className={({ isActive }) =>
                      `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                    }
                  >
                    <FaClipboardList className="w-6 h-6" /> Orders
                  </NavLink>
                </li>
              </>
            )}

            {/* USER */}
            {role === "user" && (
              <>
                <li className="pt-1">
                  <NavLink
                    to="/deshbord/user"
                    className={({ isActive }) =>
                      `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                    }
                  >
                    <RiDashboardHorizontalLine className="w-6 h-6" /> Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/deshbord/userorder"
                    className={({ isActive }) =>
                      `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                    }
                  >
                    <Logs className="w-6 h-6" /> Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/deshbord/paymenthistory"
                    className={({ isActive }) =>
                      `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                    }
                  >
                    <CreditCard className="w-6 h-6" /> Payment History
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/deshbord/whishList"
                    className={({ isActive }) =>
                      `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                    }
                  >
                    {/* <BrickWallShield className="w-6 h-6" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Wishlist
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/deshbord/profileLoginUser"
                className={({ isActive }) =>
                  `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                }
              >
                <CgProfile className="w-6 h-6" /> Profile
              </NavLink>
            </li>
          </ul>

          {/* ✅ BOTTOM FIXED */}
          <ul className="menu border-t border-gray-700 px-4 py-3">
            {/* <li className=" mt-5">
              <NavLink
                to="/deshbord/profileLoginUser"
                className={({ isActive }) =>
                  `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                }
              >
                <CgProfile className="w-6 h-6" /> Profile
              </NavLink>
            </li> */}
            <li className=" mt-5">
              <NavLink
                to="/deshbord/settings"
                className={({ isActive }) =>
                  `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                }
              >
                <CiSettings className="w-6 h-6" /> Settings
              </NavLink>
            </li>
            <li className=" mt-5">
              <button
                onClick={() => userLogOut()}
                c
                className={({ isActive }) =>
                  `flex gap-3 px-4 py-1.5 rounded-xl
                      ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-800"
                      }`
                }
              >
                <PiSignOutLight className="w-6 h-6" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBordLayOut;
