import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner ";
import TextType from "../../utils/TextType";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: usersas,
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

  if (isLoading || isFetching) return <LoadingSpinner />;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10
      bg-gradient-to-br from-orange-50 via-slate-50 to-amber-50
     "
    >
      <div className="w-full max-w-2xl">
        {/* Card */}
        <div
          className="bg-white dark:bg-[#262626]
          rounded-[28px]
          border border-orange-100 dark:border-[#3a3a3a]
          shadow-xl hover:shadow-2xl
          transition-all duration-300 overflow-hidden"
        >
          {/* Cover */}
          <div className="relative h-36 bg-gradient-to-r from-[#C2410C] to-orange-500">
            <div className="absolute -bottom-16 left-8">
              <img
                src={usersas?.photoURL}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover
                ring-4 ring-white dark:ring-[#262626]
                shadow-lg transition hover:scale-105"
              />
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 px-8 pb-8">
            {/* Header */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-gray-100">
                  <TextType
                    text={usersas?.displayName || "User Name"}
                    typingSpeed={70}
                    deletingSpeed={40}
                    pauseDuration={2000}
                    loop={false}
                    showCursor={false}
                  />
                </h1>

                <p className="mt-2 text-sm flex items-center gap-2 text-slate-500 dark:text-gray-300">
                  <FaEnvelope className="text-[#C2410C]" />
                  {usersas?.email}
                </p>
              </div>

              {/* Role */}
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full
                text-sm font-medium border
                ${
                  usersas?.role === "admin"
                    ? "bg-orange-100/70 text-[#C2410C] border-orange-300 dark:bg-[#3a2418] dark:border-[#5a3a26]"
                    : usersas?.role === "librarian"
                      ? "bg-amber-100/70 text-amber-700 border-amber-300 dark:bg-[#393116] dark:border-[#5a4d1f]"
                      : "bg-green-100/70 text-green-700 border-green-300 dark:bg-[#1f3a2a] dark:border-[#29503a]"
                }`}
              >
                <FaUserShield />
                {usersas?.role}
              </span>
            </div>

            <div className="my-6 border-t border-gray-200 dark:border-[#3a3a3a]" />

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoCard
                icon={<FaCalendarAlt />}
                iconBg="bg-orange-100 dark:bg-[#3a2418]"
                iconColor="text-[#C2410C]"
                label="Account Created"
                value={new Date(usersas?.crestAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              />

              <InfoCard
                icon={<FaUser />}
                iconBg="bg-amber-100 dark:bg-[#393116]"
                iconColor="text-amber-700"
                label="User ID"
                value={`#${usersas?._id?.slice(-8)}`}
              />

              <InfoCard
                icon={<FaUserShield />}
                iconBg="bg-orange-100 dark:bg-[#3a2418]"
                iconColor="text-[#C2410C]"
                label="Access Level"
                value={usersas?.role}
              />

              <InfoCard
                icon={<FaCheckCircle />}
                iconBg="bg-green-100 dark:bg-[#1f3a2a]"
                iconColor="text-green-600"
                label="Account Status"
                value="Active"
              />
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                className="flex-1 rounded-xl py-3 font-semibold text-white
                bg-gradient-to-r from-[#C2410C] to-orange-500
                shadow-md hover:shadow-lg hover:scale-[1.03]
                transition-all duration-200"
              >
                Update Profile
              </button>

              <Link
                to="/deshbord/settings"
                className="px-6 rounded-xl py-3 font-semibold
                border border-orange-300 dark:border-[#5a3a26]
                text-[#C2410C] dark:text-orange-400
                hover:bg-orange-50 dark:hover:bg-[#2f2f2f]
                transition"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Info Card */
const InfoCard = ({ icon, iconBg, iconColor, label, value }) => (
  <div
    className="bg-white dark:bg-[#2a2a2a]
    border border-orange-100 dark:border-[#3a3a3a]
    rounded-xl p-4 shadow-sm
    hover:shadow-md hover:-translate-y-1
    transition-all duration-300"
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 ${iconBg} ${iconColor}
        rounded-lg flex items-center justify-center`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500 dark:text-gray-300">{label}</p>
        <p className="text-sm font-semibold text-slate-800 dark:text-gray-100 capitalize">
          {value}
        </p>
      </div>
    </div>
  </div>
);

export default Profile;
