import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";
import { Link, useLocation, useNavigate } from "react-router";
import { imagesBB } from "../../features/imagesUp";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Rigester = () => {
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const axioSecure = useAxiosSecure();
  const locations = useLocation();
  const from = locations.state || "/";
  const navigate = useNavigate();

  const { rigersterNow, updetUserInfo, googleLogin } = useAuth();

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

  const handelRegister = async (data) => {
    const email = data.email;
    const password = data.password;
    const displayName = data.name;
    const photo = data.file[0];
    const photoURL = await imagesBB(photo);

    const userInfoUpdet = {
      displayName,
      photoURL,
    };

    rigersterNow(email, password)
      .then((res) => {
        // console.log(res.user);
        const savedDatabase = {
          email,
          displayName,
          password,
          photoURL,
        };
        axioSecure.post(`ucustomer`, savedDatabase).then((res) => {
          // console.log(res.data);
        });
        updetUserInfo(userInfoUpdet).then(() => {
          navigate(from, { replace: true });

          toast.success("Rigester Successfully");
        });
      })
      .catch((err) => {
        toast.warning(err.code);
      });
    // console.log(email, password, photoURL);
  };

  const handelGoogleRigester = () => {
    googleLogin()
      .then((res) => {
        const savedDatabase = {
          email: res?.user?.email,
          displayName: res?.user?.displayName,
          password: res?.user?.password || "12453hgfgyusf%44hgv",
          photoURL: res?.user?.photoURL,
        };

        axioSecure.post(`ucustomer`, savedDatabase).then((res) => {
          // console.log(res.data);
        });
        toast.success("Rigester Successfully");
        navigate(from, { replace: true });
        // console.log(res.user);
      })
      .catch((err) => {
        toast.warning(err.code);
      });
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen w-full ${isDark ? "" : "bg-white"}`}
    >
      <div className="grid gap-8">
        <section
          id="back-div"
          className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl"
        >
          <div
            className={`border-8 border-transparent rounded-xl ${
              isDark ? "bg-gray-800" : "bg-white"
            } shadow-xl p-8 m-2`}
          >
            <h1
              className={`text-5xl font-bold text-center cursor-default ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Register Now
            </h1>
            <form
              onSubmit={handleSubmit(handelRegister)}
              className="space-y-6 mt-6"
            >
              <div className="relative group">
                <label
                  htmlFor="name"
                  className={`block mb-2 text-lg ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Name"
                  className={`border p-3 pl-10 shadow-md ${
                    isDark
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  } rounded-lg w-full focus:ring-2 focus:ring-orange-500 transition transform hover:scale-105 duration-300`}
                />
                <FaUserAlt
                  className={`absolute left-3 top-15 transform -translate-y-1/2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } pointer-events-none`}
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter Your Full Name
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="file"
                  className={`block mb-2 text-lg ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Import Photo
                </label>
                <input
                  type="file"
                  {...register("file")}
                  className={`file-input border shadow-md ${
                    isDark
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  } rounded-lg w-full focus:ring-2 focus:ring-orange-500 transition transform hover:scale-105 duration-300`}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className={`block mb-2 text-lg ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  className={`border p-3 pl-10 shadow-md ${
                    isDark
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  } rounded-lg w-full focus:ring-2 focus:ring-orange-500 transition transform hover:scale-105 duration-300`}
                  type="email"
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-2">
                    Please Enter Your Real Email
                  </p>
                )}
                <HiOutlineMail
                  className={`absolute left-3 top-15 transform -translate-y-1/2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } pointer-events-none w-5 h-5`}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className={`block mb-2 text-lg ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  })}
                  className={`border p-3 pl-10 shadow-md ${
                    isDark
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  } rounded-lg w-full focus:ring-2 focus:ring-orange-500 transition transform hover:scale-105 duration-300`}
                  type={show ? "text" : "password"}
                  placeholder="Password"
                />
                <RiLockPasswordLine
                  className={`absolute left-3 top-15 transform -translate-y-1/2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } w-5 h-5 pointer-events-none`}
                />

                <div
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-15 transform -translate-y-1/2 cursor-pointer z-10"
                >
                  {show ? (
                    <MdOutlineRemoveRedEye
                      className={`${
                        isDark ? "text-gray-400" : "text-gray-500"
                      } w-4 h-4`}
                    />
                  ) : (
                    <FaRegEyeSlash
                      className={`${
                        isDark ? "text-gray-400" : "text-gray-500"
                      } w-4 h-4`}
                    />
                  )}
                </div>

                {errors.password?.type === "required" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Set Up Password
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Password must be 6 characters or longer
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500 text-xs font-semibold mt-1">
                    Need uppercase, lowercase, digit & special character
                  </p>
                )}
              </div>

              <a
                href="#"
                className="text-orange-500 text-sm transition hover:underline"
              >
                Forget your password?
              </a>
              <button
                className="w-full p-3 mt-4 text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                type="submit"
              >
                Register Now
              </button>
            </form>
            <div
              className={`flex flex-col mt-4 text-sm text-center ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <p>
                You Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-orange-500 transition hover:underline"
                >
                  Login Now
                </Link>
              </p>
            </div>
            <div
              id="third-party-auth"
              className="flex justify-center gap-4 mt-5"
            >
              <button
                onClick={handelGoogleRigester}
                className={`
                  p-2 rounded-lg 
                  shadow-lg 
                  transition 
                  transform 
                  duration-300 
                  hover:scale-105 
                  hover:shadow-xl 
                  ${isDark ? "bg-gray-700" : "bg-white"}
                  hover:bg-gradient-to-r 
                  hover:from-orange-400 
                  hover:to-amber-600
                  focus:outline-none
                  focus:shadow-xl
                  px-6
                  focus:bg-gradient-to-r
                  focus:from-orange-200
                  focus:to-amber-300
                  flex gap-2
                `}
              >
                <img
                  className="w-6 h-6"
                  loading="lazy"
                  src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                  alt="Google"
                />
                <span className={isDark ? "text-white" : "text-gray-900"}>
                  {" "}
                  Google
                </span>
              </button>
            </div>
            <div
              className={`mt-4 text-center text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <p>
                By signing in, you agree to our{" "}
                <a
                  href="#"
                  className="text-orange-500 transition hover:underline"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-orange-500 transition hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Rigester;
