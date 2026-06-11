import React, { useEffect, useState } from "react";
import { FaBookReader, FaRegUser } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import { CiUser } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { PiSignOutLight } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { Heart, ShoppingCart } from "lucide-react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";

const Navbar = () => {
  const [showa, setShowa] = useState(false);

  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(2);

  const { user, userLogOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  // console.log(user);

  const logoutNow = () => {
    userLogOut();
  };

  return (
    <>
      <div className=" bg-base-100 shadow-sm py-2.5 z-90">
        <div className="navbar  w-11/12 mx-auto">
         
          <div className="navbar-center hidden lg:flex">
            <ul className=" menu-horizontal px-1">
              <li>
                <NavLink to="/" className="mr-5 text-md font-semibold">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/books" className="mr-5 text-md font-semibold">
                  {" "}
                  Books
                </NavLink>
              </li>
              <li>
                <NavLink to="/deshbord" className="mr-5 text-md font-semibold">
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="  navbar-end">
            <div className=" hidden md:block">
             {user ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="dropdown dropdown-end">
                      {/* AVATAR */}
                      <div
                        tabIndex={0}
                        role="button"
                        className="relative btn btn-ghost btn-circle avatar hover:scale-105 transition"
                      >
                        <div className="w-10 h-10 rounded-full ring-2 ring-[#e85d04] ring-offset-2 ring-offset-white overflow-hidden shadow-lg flex items-center justify-center bg-white">
                          {user.photoURL ? (
                            <img
                              src={
                                user?.photoURL ? (
                                  user?.photoURL
                                ) : (
                                  <CiUser className="w-8 h-8 text-[#e85d04]" />
                                )
                              }
                              alt="User Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <CiUser className="w-8 h-8 text-[#e85d04]" />
                          )}
                        </div>

                        {/*  */}

                        {user && (
                          <>
                            {" "}
                            <span className="absolute -top-0.5 -right-2 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white animate-pulse" />
                          </>
                        )}
                      </div>

                      {/* DROPDOWN */}
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content mt-6 w-64 rounded-2xl
              bg-base-100 p-4 shadow-2xl border border-base-300"
                      >
                        {/* USER INFO */}
                        <li className="mb-3">
                          <div className="flex items-center gap-3 cursor-default">
                            <div className="avatar">
                              {user.photoURL ? (
                                <img
                                  src={
                                    user?.photoURL ? (
                                      user?.photoURL
                                    ) : (
                                      <CiUser className="w-8 h-8 text-[#e85d04]" />
                                    )
                                  }
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <CiUser className="w-8 h-8 text-[#e85d04]" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold leading-tight ml-1">
                                {user?.displayName || "User"}
                              </p>
                              <p className="text-xs text-base-content/60 flex items-center gap-1">
                                <i className="fa-regular fa-envelope" />
                                Verified account
                              </p>
                            </div>
                          </div>
                        </li>

                        <div className="divider my-2" />
                        {/* wish list */}
                        <li>
                          <Link className="relative cursor-pointer">
                            <Heart className="w-6 h-6 text-red-500" />

                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                              {wishlistCount}
                            </span>
                          </Link>
                        </li>

                        <div className="divider my-2" />
                        <li>
                          {/* Shopping Cart */}
                          <Link className="relative cursor-pointer">
                            <ShoppingCart className="w-6 h-6 text-blue-600" />
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                              {cartCount}
                            </span>
                          </Link>
                        </li>
                        <div className="divider my-2" />
                        {/* SETTINGS */}
                        <li>
                          <div>
                            <CgProfile className=" w-6 h-6"></CgProfile>
                            Profile
                          </div>
                        </li>
                        <div className="divider my-1" />

                        {/* SETTINGS */}
                        <li>
                          <div>
                            <CiSettings className=" w-7 h-7"></CiSettings>
                            Settings
                          </div>
                        </li>

                        {/* THEME */}
                        <div className="divider my-1" />
                        <li>
                          <div>
                            <label className="swap swap-rotate ">
                              {" "}
                              {/* this hidden checkbox controls the state */}{" "}
                              <input
                                type="checkbox"
                                onChange={(e) => handleTheme(e.target.checked)}
                                defaultChecked={
                                  localStorage.getItem("theme") === "dark"
                                }
                                className="theme-controller"
                                value="synthwave"
                              />{" "}
                              {/* sun icon */}{" "}
                              <svg
                                className="swap-off h-7 w-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                {" "}
                                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />{" "}
                              </svg>{" "}
                              {/* moon icon */}{" "}
                              <svg
                                className="swap-on h-7 w-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                {" "}
                                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />{" "}
                              </svg>{" "}
                            </label>
                            Theme
                          </div>
                        </li>

                        <div className="divider my-2" />

                        {/* LOGOUT */}
                        <li>
                          <button
                            onClick={logoutNow}
                            className="flex items-center gap-2 text-red-500 bg-red-50 rounded-xl"
                          >
                            <PiSignOutLight className=" w-6 h-6"></PiSignOutLight>
                            <i className="fa-solid fa-right-from-bracket" />
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex gap-3">
                  {/* LOGIN */}
               
                </ div>
              )}
            </div>
            {/* MobileMenu */}
            <div className="block md:hidden items-center">
              <div
                onClick={() => setShowa(!showa)}
                className="transition duration-300 ease-in-out transform"
              >
                {showa ? (
                  <CgClose className="w-10 h-10 opacity-100 scale-100 transition duration-300" />
                ) : (
                  <HiOutlineMenuAlt3 className="w-10 h-10 opacity-100 scale-100 transition duration-300" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showa && (
        <div className=" bg-base-100 border-t border-base-300 opacity-100 scale-100 transition duration-300">
          {user ? (
            <>
              <div className="flex items-center gap-3"> 
                <div className="dropdown dropdown-end">
                  {/* AVATAR */}
                  <div
                    tabIndex={0}
                    role="button"
                    className="relative btn btn-ghost btn-circle avatar hover:scale-105 transition"
                  >
                    <div className="w-10 h-10 rounded-full ring-2 ring-[#e85d04] ring-offset-2 ring-offset-white overflow-hidden shadow-lg flex items-center justify-center bg-white">
                      {user.photoURL ? (
                        <img
                          src={
                            user?.photoURL ? (
                              user?.photoURL
                            ) : (
                              <CiUser className="w-8 h-8 text-[#e85d04]" />
                            )
                          }
                          alt="User Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <CiUser className="w-8 h-8 text-[#e85d04]" />
                      )}
                    </div>

                    {/*  */}

                    {user && (
                      <>
                        {" "}
                        <span className="absolute -top-0.5 -right-2 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white animate-pulse" />
                      </>
                    )}
                  </div>

                  {/* DROPDOWN */}
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-6 w-64 rounded-2xl
              bg-base-100 p-4 shadow-2xl border border-base-300"
                  >
                    {/* USER INFO */}
                    <li className="mb-3">
                      <div className="flex items-center gap-3 cursor-default">
                        <div className="avatar">
                          {user.photoURL ? (
                            <img
                              src={
                                user?.photoURL ? (
                                  user?.photoURL
                                ) : (
                                  <CiUser className="w-8 h-8 text-[#e85d04]" />
                                )
                              }
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <CiUser className="w-8 h-8 text-[#e85d04]" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold leading-tight ml-1">
                            {user?.displayName || "User"}
                          </p>
                          <p className="text-xs text-base-content/60 flex items-center gap-1">
                            <i className="fa-regular fa-envelope" />
                            Verified account
                          </p>
                        </div>
                      </div>
                    </li>

                    <div className="divider my-2" />
                    {/* wish list */}
                    <li>
                      <Link className="relative cursor-pointer">
                        <Heart className="w-6 h-6 text-red-500" />

                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                          {wishlistCount}
                        </span>
                      </Link>
                    </li>

                    <div className="divider my-2" />
                    <li>
                      {/* Shopping Cart */}
                      <Link className="relative cursor-pointer">
                        <ShoppingCart className="w-6 h-6 text-blue-600" />
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                          {cartCount}
                        </span>
                      </Link>
                    </li>
                    <div className="divider my-2" />
                    {/* SETTINGS */}
                    <li>
                      <div>
                        <CgProfile className=" w-6 h-6"></CgProfile>
                        Profile
                      </div>
                    </li>
                    <div className="divider my-1" />

                    {/* SETTINGS */}
                    <li>
                      <div>
                        <CiSettings className=" w-7 h-7"></CiSettings>
                        Settings
                      </div>
                    </li>

                    {/* THEME */}
                    <div className="divider my-1" />
                    <li>
                      <div>
                        <label className="swap swap-rotate ">
                          {" "}
                          {/* this hidden checkbox controls the state */}{" "}
                          <input
                            type="checkbox"
                            onChange={(e) => handleTheme(e.target.checked)}
                            defaultChecked={
                              localStorage.getItem("theme") === "dark"
                            }
                            className="theme-controller"
                            value="synthwave"
                          />{" "}
                          {/* sun icon */}{" "}
                          <svg
                            className="swap-off h-7 w-7 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            {" "}
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />{" "}
                          </svg>{" "}
                          {/* moon icon */}{" "}
                          <svg
                            className="swap-on h-7 w-7 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            {" "}
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />{" "}
                          </svg>{" "}
                        </label>
                        Theme
                      </div>
                    </li>

                    <div className="divider my-2" />

                    {/* LOGOUT */}
                    <li>
                      <button
                        onClick={logoutNow}
                        className="flex items-center gap-2 text-red-500 bg-red-50 rounded-xl"
                      >
                        <PiSignOutLight className=" w-6 h-6"></PiSignOutLight>
                        <i className="fa-solid fa-right-from-bracket" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className=" flex flex-col ">
              {/* LOGIN */}
              <Link
                to="/auth/login"
                className="px-6 py-2 rounded-xl font-semibold text-[#e85d04]
          border-2 border-[#e85d04]
          transition-all duration-300
          hover:bg-gradient-to-r from-[#C2410C] to-[#e85d04]
          hover:text-white hover:scale-105"
              >
                Login
              </Link>

              {/* REGISTER */}
              <Link
                to="/auth/rigester"
                className="px-6 py-2 rounded-xl text-white font-semibold
          bg-gradient-to-r from-[#C2410C] to-[#e85d04]
          shadow-lg transition-all duration-300
          hover:scale-105"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
