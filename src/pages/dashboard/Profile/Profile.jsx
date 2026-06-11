import React, { useEffect, useRef, useState, useMemo } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaCheckCircle,
  FaCamera,
  FaEdit,
  FaCog,
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3,
  FaNode,
  FaJava,
  FaPython,
  FaPhp,
  FaSwift,
  FaRust,
  FaDocker,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiTypescript,
  SiGo,
  SiKotlin,
  SiMongodb,
} from "react-icons/si";
import LoadingSpinner from "../../../shared/LoadingSpinner ";
import TextType from "../../../utils/TextType";
import { Link } from "react-router";
import InfoCard from "./InfoCard";
import { useForm } from "react-hook-form";
import { CgProfile } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Profile = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
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
  const { user } = useAuth();
  const references = useRef();
  const axiosSecure = useAxiosSecure();
  const { handleSubmit, register, reset } = useForm();

  // Floating Icons Configuration
  const floatingIcons = useMemo(() => {
    const icons = [
      FaReact,
      FaJs,
      FaHtml5,
      FaCss3,
      FaNode,
      FaJava,
      FaPython,
      FaPhp,
      FaSwift,
      FaRust,
      FaDocker,
      SiCplusplus,
      SiTypescript,
      SiGo,
      SiKotlin,
      SiMongodb,
    ];
    return icons.map((Icon, index) => ({
      Icon,
      id: index,
      initialX: Math.random() * 100, // percentage
      initialY: Math.random() * 100, // percentage
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
      size: 20 + Math.random() * 30,
    }));
  }, []);

  const {
    data: usersas,
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `loginRealTimerUser?email=${user?.email}`,
      );
      return res.data;
    },
  });

  const handelUpdeatProfile = () => {
    // console.log("Profile");
    references.current.showModal();
  };

  const handelProfileUpdeat = async (neawsa) => {
    let upphotos;
    // check if user uploaded new image
    if (neawsa.images && neawsa.images.length > 0) {
      // only upload when new photo exists
      const photo = neawsa.images[0];
      const formData = new FormData();
      formData.append("image", photo);

      const { data } = await axios.post(
        import.meta.env.VITE_img_host_key,
        formData,
      );

      upphotos = data?.data?.display_url;
    } else {
      // no new image → use old one
      upphotos = usersas.photoURL;
    }
    const updetProdileUser = {
      email: neawsa.email,
      displayName: neawsa.displayName,
      photoURL: upphotos,
      profileUpdeatTime: new Date().toISOString(),
    };

    const res = await axiosSecure.patch(
      `updeatCustomerProfile/${usersas?._id}?email=${usersas?.email}`,
      updetProdileUser,
    );

    if (res.data.acknowledged) {
      refetch();
      reset();
      references.current.close();
      toast.success("Your Profile Updeat Successfully");
    }
  };

  if (isLoading || isFetching) return <LoadingSpinner />;

  return (
    <div
      className={`min-h-screen flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        {/* Main Profile Card */}
        <div
          className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Animated Cover Image */}
          <div className="h-38 md:h-44 w-full bg-orange-600 relative overflow-hidden">
            {floatingIcons.map(
              ({ Icon, id, initialX, initialY, duration, delay, size }) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                  }}
                  className="absolute text-white/30"
                  style={{
                    left: `${initialX}%`,
                    top: `${initialY}%`,
                    fontSize: `${size}px`,
                  }}
                >
                  <Icon />
                </motion.div>
              ),
            )}

            {/* Overlay Gradient for depth (optional, keeping it subtle as requested) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
          </div>

          {/* Profile Content */}
          <div className="px-6 md:px-10 pb-10">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-6 gap-6">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                <img
                  src={usersas?.photoURL}
                  alt="Profile"
                  className={`w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-[6px] shadow-xl ${
                    isDark ? "border-gray-800" : "border-white"
                  }`}
                />
                <button
                  onClick={handelUpdeatProfile}
                  className="absolute bottom-2 right-2 p-2 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-colors cursor-pointer"
                  title="Update Photo"
                >
                  <FaCamera size={14} />
                </button>
              </motion.div>

              {/* Header Info */}
              <div className="flex-1 w-full md:w-auto mt-2 md:mt-0 md:mb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1
                      className={`text-2xl md:text-3xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      <TextType
                        text={usersas?.displayName || "User Name"}
                        typingSpeed={70}
                        deletingSpeed={40}
                        pauseDuration={2000}
                        loop={false}
                        showCursor={false}
                      />
                    </h1>
                    <p
                      className={`flex items-center gap-2 mt-1 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <FaEnvelope className="text-orange-500" />
                      {usersas?.email}
                    </p>
                  </div>

                  {/* Role Badge */}
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-sm flex items-center gap-2
                    ${
                      usersas?.role === "admin"
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                        : usersas?.role === "librarian"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                  >
                    <FaUserShield /> {usersas?.role}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`h-px w-full my-8 ${
                isDark ? "bg-gray-700" : "bg-gray-100"
              }`}
            ></div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <InfoCard
                  icon={<FaCalendarAlt />}
                  iconBg={isDark ? "bg-orange-900/20" : "bg-orange-50"}
                  iconColor="text-orange-600"
                  label="Member Since"
                  value={new Date(usersas?.crestAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <InfoCard
                  icon={<FaUser />}
                  iconBg={isDark ? "bg-amber-900/20" : "bg-amber-50"}
                  iconColor="text-amber-600"
                  label="User ID"
                  value={`#${usersas?._id?.slice(-8).toUpperCase()}`}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <InfoCard
                  icon={<FaEdit />}
                  iconBg={isDark ? "bg-blue-900/20" : "bg-blue-50"}
                  iconColor="text-blue-600"
                  label="Last Updated"
                  value={
                    usersas?.profileUpdeatTime
                      ? new Date(usersas.profileUpdeatTime).toLocaleString()
                      : "Not updated yet"
                  }
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <InfoCard
                  icon={<FaCheckCircle />}
                  iconBg={isDark ? "bg-green-900/20" : "bg-green-50"}
                  iconColor="text-green-600"
                  label="Account Status"
                  value="Active"
                />
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handelUpdeatProfile}
                className="flex-1 py-3.5 px-6 rounded-xl text-white font-semibold shadow-lg shadow-orange-500/20 bg-gradient-to-r from-orange-600 to-orange-500 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
              >
                <FaEdit /> Edit Profile
              </motion.button>

              <Link to="/deshbord/settings" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 px-6 rounded-xl font-semibold border-2 flex items-center justify-center gap-2 transition-all
                  ${
                    isDark
                      ? "border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <FaCog /> Settings
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Update Profile Modal */}
      <dialog
        ref={references}
        className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
      >
        <div
          className={`modal-box max-w-2xl p-0 overflow-hidden ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-6">
            <h3 className="font-bold text-xl text-white flex items-center gap-2">
              <CgProfile className="text-2xl" /> Update Profile
            </h3>
            <p className="text-orange-100 text-sm mt-1">
              Make changes to your public profile
            </p>
          </div>

          <div className="p-8">
            <form
              onSubmit={handleSubmit(handelProfileUpdeat)}
              className="space-y-6"
            >
              {/* Profile Image Preview */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img
                    src={user?.photoURL}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    alt="Current"
                  />
                  <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-1.5 rounded-full shadow-md">
                    <FaCamera size={12} />
                  </div>
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label
                  className={`block mb-2 font-semibold text-sm ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Display Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("displayName")}
                  type="text"
                  defaultValue={user?.displayName}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-orange-500 transition-colors
                  ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                  placeholder="Enter your name"
                />
              </div>

              {/* Email (Read Only) */}
              <div>
                <label
                  className={`block mb-2 font-semibold text-sm ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email")}
                  value={user?.email}
                  readOnly
                  className={`w-full px-4 py-3 rounded-xl border-2 cursor-not-allowed
                  ${
                    isDark
                      ? "bg-gray-900/50 border-gray-700 text-gray-400"
                      : "bg-gray-100 border-gray-200 text-gray-500"
                  }`}
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label
                  className={`block mb-2 font-semibold text-sm ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Update Photo (Optional)
                </label>
                <label
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all
                  ${
                    isDark
                      ? "border-gray-600 bg-gray-700/30 hover:bg-gray-700/50"
                      : "border-orange-200 bg-orange-50/50 hover:bg-orange-50"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaCamera
                      className={`w-8 h-8 mb-2 ${
                        isDark ? "text-gray-400" : "text-orange-400"
                      }`}
                    />
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Click to upload new picture
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                  <input
                    {...register("images")}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => references.current.close()}
                  type="button"
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold border-2 transition-colors
                  ${
                    isDark
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:to-orange-600 shadow-lg shadow-orange-500/20 transition-all transform active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Profile;
