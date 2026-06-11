import React, { useState, useEffect } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Lock,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Eye,
  EyeOff,
  Check,
  X,
  Camera,
  CreditCard,
  Smartphone,
  Palette,
  Key,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SettingsComponent() {
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [accentColor, setAccentColor] = useState("orange");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Dhaka");

  // Dark mode load and save
  useEffect(() => {
    const savedMode = JSON.parse(window.localStorage.getItem("darkMode"));
    if (savedMode !== null) {
      setDarkMode(savedMode);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  const accentColors = {
    orange: "bg-orange-500 hover:bg-orange-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    green: "bg-green-500 hover:bg-green-600",
    red: "bg-red-500 hover:bg-red-600",
  };

  const getAccentClass = () => accentColors[accentColor] || accentColors.orange;
  const { user } = useAuth();
  const { register, reset, handleSubmit } = useForm();
  const handelData = (newas) => {
    reset();
  };
  const handelClickes = () => {
    toast.success("User Seatting Complete Now");
  };
  return (
    <div
      className={`min-h-screen py-20 ${
        darkMode
          ? "bg-gradient-to-br from-orange-50 via-white to-orange-50"
          : "bg-gradient-to-br from-orange-50 via-white to-orange-50"
      } p-4 md:p-8`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className={`${darkMode ? "text-white" : "text-gray-900"} mb-8`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-xl ${
                  darkMode ? "bg-orange-500/20" : "bg-orange-100"
                }`}
              >
                <Settings
                  className={`w-8 h-8 ${
                    darkMode ? "text-orange-400" : "text-orange-600"
                  }`}
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Settings</h1>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Manage your account settings and preferences
                </p>
              </div>
            </div>
            <div
              className={`px-4 py-2 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="text-xs text-gray-500">Last updated</div>
              <div
                className={`text-sm font-semibold ${
                  darkMode ? "text-orange-400" : "text-orange-600"
                }`}
              >
                Today
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Profile Complete", value: "85%", icon: User },
              { label: "Security Score", value: "92/100", icon: Shield },
              { label: "Active Sessions", value: "3", icon: Smartphone },
              { label: "Days Active", value: "127", icon: Calendar },
            ].map((stat, i) => (
              <div
                key={i}
                className={`${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center gap-3">
                  <stat.icon
                    className={`w-5 h-5 ${
                      darkMode ? "text-orange-400" : "text-orange-600"
                    }`}
                  />
                  <div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                    <div
                      className={`text-lg font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {stat.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div
            className={`${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border rounded-xl shadow-lg p-2 lg:w-72 h-fit  top-4`}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200 ${
                    isActive
                      ? darkMode
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                        : "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-700/50"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  {isActive && <Check className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div
              className={`${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } border rounded-xl shadow-lg p-6 md:p-8`}
            >
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className={`text-3xl font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Profile Information
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        darkMode
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      85% Complete
                    </span>
                  </div>

                  {/* Profile Picture */}
                  <div className="mb-6 flex items-center gap-6">
                    <div className="relative">
                      <div
                        className={`w-24 h-24 rounded-full ${
                          darkMode
                            ? "bg-gradient-to-br from-orange-500 to-orange-700"
                            : "bg-gradient-to-br from-orange-400 to-orange-600"
                        } flex items-center justify-center text-white text-3xl font-bold shadow-lg`}
                      >
                        {user?.photoURL ? (
                          <img
                            src={user?.photoURL || "User"}
                            className=" w-24 h-24 rounded-full"
                          ></img>
                        ) : (
                          "User"
                        )}
                      </div>
                      <button
                        className={`absolute bottom-0 right-0 p-2 rounded-full ${
                          darkMode
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "bg-orange-500 hover:bg-orange-600"
                        } text-white shadow-lg transition-colors`}
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-semibold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Profile Photo
                      </h3>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        JPG, PNG or GIF. Max size 2MB
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmit(handelData)}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          <User className="w-4 h-4" />
                          First Name
                        </label>
                        <input
                          type="text"
                          placeholder="John"
                          {...register("fristName")}
                          defaultValue={user?.displayName}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                              : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                          } focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all`}
                        />
                      </div>
                      <div>
                        <label
                          className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          <User className="w-4 h-4" />
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="User"
                          {...register("lastName")}
                          defaultValue="User"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                              : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                          } focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all`}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="john@example.com"
                        defaultValue={user?.email}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                            : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                        } focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all`}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          {...register("phoneNumber")}
                          placeholder="+880 1234-567890"
                          defaultValue="+880 1234-567890"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                              : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                          } focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all`}
                        />
                      </div>
                      <div>
                        <label
                          className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          <Briefcase className="w-4 h-4" />
                          Job Title
                        </label>
                        <input
                          type="text"
                          placeholder="Software Engineer"
                          {...register("job")}
                          defaultValue="Web Devloper "
                          className={`w-full px-4 py-3 rounded-lg border ${
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                              : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                          } focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all`}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                        Address
                      </label>
                      <input
                        type="text"
                        placeholder="City, Country"
                        {...register("city")}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                            : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                        } focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all`}
                      />
                    </div>

                    <div>
                      <label
                        className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <User className="w-4 h-4" />
                        Bio
                      </label>
                      <textarea
                        rows="4"
                        placeholder="Tell us about yourself..."
                        {...register("bieo")}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                            : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                        } focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all resize-none`}
                      ></textarea>
                      <div
                        className={`text-xs mt-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        0 / 500 characters
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        onClick={handelClickes}
                        className={`px-6 py-3 ${getAccentClass()} text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl`}
                      >
                        Save Changes
                      </button>
                      <button
                        className={`px-6 py-3 ${
                          darkMode
                            ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        } rounded-lg font-medium transition-colors`}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h2
                    className={`text-3xl font-bold mb-6 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Notification Preferences
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Email Notifications",
                        desc: "Receive updates and alerts via email",
                        state: emailNotifications,
                        setState: setEmailNotifications,
                        icon: Mail,
                      },
                      {
                        title: "Push Notifications",
                        desc: "Get push notifications on your device",
                        state: pushNotifications,
                        setState: setPushNotifications,
                        icon: Bell,
                      },
                      {
                        title: "SMS Notifications",
                        desc: "Receive text messages for important updates",
                        state: smsNotifications,
                        setState: setSmsNotifications,
                        icon: Phone,
                      },
                      {
                        title: "Marketing Emails",
                        desc: "Get news about products and features",
                        state: marketingEmails,
                        setState: setMarketingEmails,
                        icon: Mail,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          darkMode ? "bg-gray-700/50" : "bg-gray-50"
                        } hover:shadow-md transition-all`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-lg ${
                              darkMode ? "bg-orange-500/20" : "bg-orange-100"
                            }`}
                          >
                            <item.icon
                              className={`w-5 h-5 ${
                                darkMode ? "text-orange-400" : "text-orange-600"
                              }`}
                            />
                          </div>
                          <div>
                            <h3
                              className={`font-semibold ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {item.title}
                            </h3>
                            <p
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => item.setState(!item.state)}
                          className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                            item.state
                              ? "bg-orange-500"
                              : darkMode
                              ? "bg-gray-600"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-lg ${
                              item.state ? "translate-x-7" : ""
                            }`}
                          ></span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h2
                    className={`text-3xl font-bold mb-6 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Security Settings
                  </h2>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Two-Factor Authentication",
                        desc: "Add an extra layer of security to your account",
                        state: twoFactorAuth,
                        setState: setTwoFactorAuth,
                        icon: Lock,
                      },
                      {
                        title: "Biometric Authentication",
                        desc: "Use fingerprint or face recognition",
                        state: biometricAuth,
                        setState: setBiometricAuth,
                        icon: Smartphone,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          darkMode ? "bg-gray-700/50" : "bg-gray-50"
                        } hover:shadow-md transition-all`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-lg ${
                              darkMode ? "bg-orange-500/20" : "bg-orange-100"
                            }`}
                          >
                            <item.icon
                              className={`w-5 h-5 ${
                                darkMode ? "text-orange-400" : "text-orange-600"
                              }`}
                            />
                          </div>
                          <div>
                            <h3
                              className={`font-semibold ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {item.title}
                            </h3>
                            <p
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => item.setState(!item.state)}
                          className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                            item.state
                              ? "bg-orange-500"
                              : darkMode
                              ? "bg-gray-600"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-lg ${
                              item.state ? "translate-x-7" : ""
                            }`}
                          ></span>
                        </button>
                      </div>
                    ))}

                    <div
                      className={`p-6 rounded-lg ${
                        darkMode ? "bg-gray-700/50" : "bg-gray-50"
                      } mt-6`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Key
                          className={`w-5 h-5 ${
                            darkMode ? "text-orange-400" : "text-orange-600"
                          }`}
                        />
                        <h3
                          className={`text-lg font-semibold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Change Password
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Current Password"
                            className={`w-full px-4 py-3 pr-12 rounded-lg border ${
                              darkMode
                                ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-orange-500"
                                : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                            } focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all`}
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                              darkMode
                                ? "text-gray-400 hover:text-gray-300"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        <input
                          type="password"
                          placeholder="New Password"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            darkMode
                              ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-orange-500"
                              : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                          } focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all`}
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            darkMode
                              ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-orange-500"
                              : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                          } focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all`}
                        />
                        <button
                          className={`px-6 py-3 ${getAccentClass()} text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl`}
                        >
                          Update Password
                        </button>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-lg border-2 ${
                        darkMode
                          ? "border-red-500/30 bg-red-500/10"
                          : "border-red-200 bg-red-50"
                      }`}
                    >
                      <h4
                        className={`font-semibold mb-2 ${
                          darkMode ? "text-red-400" : "text-red-600"
                        }`}
                      >
                        Active Sessions
                      </h4>
                      <p
                        className={`text-sm mb-3 ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        You are currently logged in on 3 devices
                      </p>
                      <button
                        className={`text-sm font-medium ${
                          darkMode
                            ? "text-red-400 hover:text-red-300"
                            : "text-red-600 hover:text-red-700"
                        }`}
                      >
                        Sign out from all devices
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === "preferences" && (
                <div>
                  <h2
                    className={`text-3xl font-bold mb-6 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Preferences
                  </h2>
                  <div className="space-y-6">
                    <div
                      className={`p-6 rounded-lg ${
                        darkMode ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <label
                        className={`block text-sm font-medium mb-3 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <Globe className="w-4 h-4 inline mr-2" />
                        Language
                      </label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-white focus:border-orange-500"
                            : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                        } focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer`}
                      >
                        <option>English</option>
                        <option>বাংলা (Bangla)</option>
                        <option>हिन्दी (Hindi)</option>
                        <option>Español</option>
                        <option>Français</option>
                        <option>Deutsch</option>
                      </select>
                    </div>

                    <div
                      className={`p-6 rounded-lg ${
                        darkMode ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <label
                        className={`block text-sm font-medium mb-3 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Timezone
                      </label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-600 border-gray-500 text-white focus:border-orange-500"
                            : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                        } focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer`}
                      >
                        <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                        <option value="Asia/Kolkata">
                          Asia/Kolkata (GMT+5:30)
                        </option>
                        <option value="America/New_York">
                          America/New York (GMT-5)
                        </option>
                        <option value="Europe/London">
                          Europe/London (GMT+0)
                        </option>
                        <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                      </select>
                    </div>

                    <div
                      className={`p-6 rounded-lg ${
                        darkMode ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <label
                        className={`block text-sm font-medium mb-3 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Date Format
                      </label>
                      <div className="space-y-2">
                        {["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"].map(
                          (format) => (
                            <label
                              key={format}
                              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                                darkMode
                                  ? "hover:bg-gray-600"
                                  : "hover:bg-white"
                              } transition-colors`}
                            >
                              <input
                                type="radio"
                                name="dateFormat"
                                className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                              />
                              <span
                                className={
                                  darkMode ? "text-gray-300" : "text-gray-700"
                                }
                              >
                                {format}
                              </span>
                            </label>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === "appearance" && (
                <div>
                  <h2
                    className={`text-3xl font-bold mb-6 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Appearance
                  </h2>
                  <div className="space-y-6">
                    <div
                      className={`p-6 rounded-lg ${
                        darkMode ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          {darkMode ? (
                            <Moon className="w-5 h-5 text-orange-400" />
                          ) : (
                            <Sun className="w-5 h-5 text-orange-600" />
                          )}
                          <div>
                            <h3
                              className={`font-semibold ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              Dark Mode
                            </h3>
                            <p
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              Toggle dark theme across the entire application
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setDarkMode(!darkMode)}
                          className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                            darkMode ? "bg-orange-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-lg ${
                              darkMode ? "translate-x-7" : ""
                            }`}
                          ></span>
                        </button>
                      </div>

                      <div
                        className={`p-4 rounded-lg ${
                          darkMode
                            ? "bg-gray-600/50 border-orange-500/30"
                            : "bg-white border-orange-200"
                        } border-2`}
                      >
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          <Check className="w-4 h-4 inline text-orange-500 mr-2" />
                          Dark mode preference is saved and will persist across
                          sessions
                        </p>
                      </div>
                    </div>

                    <div
                      className={`p-6 rounded-lg ${
                        darkMode ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <h3
                        className={`font-semibold mb-4 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        <Palette className="w-5 h-5 inline mr-2" />
                        Accent Color
                      </h3>
                      <div className="grid grid-cols-5 gap-3">
                        {Object.keys(accentColors).map((color) => (
                          <button
                            key={color}
                            onClick={() => setAccentColor(color)}
                            className={`h-16 rounded-lg ${
                              accentColors[color]
                            } transition-all ${
                              accentColor === color
                                ? "ring-4 ring-offset-2 scale-105"
                                : "hover:scale-105"
                            } ${
                              darkMode
                                ? "ring-offset-gray-800"
                                : "ring-offset-white"
                            }`}
                            style={{
                              ringColor:
                                accentColor === color
                                  ? "currentColor"
                                  : "transparent",
                            }}
                          >
                            {accentColor === color && (
                              <Check className="w-6 h-6 text-white mx-auto" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`p-6 rounded-lg ${
                        darkMode ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <h3
                        className={`font-semibold mb-4 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Font Size
                      </h3>
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Small
                        </span>
                        <input
                          type="range"
                          min="12"
                          max="20"
                          defaultValue="16"
                          className="flex-1 accent-orange-500"
                        />
                        <span
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Large
                        </span>
                      </div>
                    </div>

                    <div
                      className={`p-6 rounded-lg ${
                        darkMode ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <h3
                        className={`font-semibold mb-4 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Sidebar Position
                      </h3>
                      <div className="space-y-2">
                        {["Left", "Right"].map((pos) => (
                          <label
                            key={pos}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                              darkMode ? "hover:bg-gray-600" : "hover:bg-white"
                            } transition-colors`}
                          >
                            <input
                              type="radio"
                              name="sidebarPos"
                              defaultChecked={pos === "Left"}
                              className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                            />
                            <span
                              className={
                                darkMode ? "text-gray-300" : "text-gray-700"
                              }
                            >
                              {pos}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === "billing" && (
                <div>
                  <h2
                    className={`text-3xl font-bold mb-6 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Billing & Subscription
                  </h2>

                  <div
                    className={`p-6 rounded-xl ${
                      darkMode
                        ? "bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30"
                        : "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
                    } border-2 mb-6`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3
                          className={`text-2xl font-bold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Pro Plan
                        </h3>
                        <p
                          className={`${
                            darkMode ? "text-orange-300" : "text-orange-700"
                          }`}
                        >
                          Active subscription
                        </p>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full ${
                          darkMode ? "bg-orange-500" : "bg-orange-600"
                        } text-white font-bold text-xl`}
                      >
                        $29/mo
                      </div>
                    </div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Next billing date: January 15, 2026
                    </div>
                  </div>
                  {/* Payment */}
                  <div className="space-y-4">
                    <div
                      className={`p-6 rounded-lg ${
                        darkMode ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <h3
                        className={`font-semibold mb-4 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        <CreditCard className="w-5 h-5 inline mr-2" />
                        Payment Method
                      </h3>
                      <div
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          darkMode ? "bg-gray-600" : "bg-white"
                        } border ${
                          darkMode ? "border-gray-500" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-8 rounded ${
                              darkMode ? "bg-gray-500" : "bg-gray-300"
                            } flex items-center justify-center`}
                          >
                            <CreditCard className="w-6 h-6" />
                          </div>
                          <div>
                            <div
                              className={`font-medium ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              •••• •••• •••• 4242
                            </div>
                            <div
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              Expires 12/2026
                            </div>
                          </div>
                        </div>
                        <button
                          className={`text-sm font-medium ${
                            darkMode
                              ? "text-orange-400 hover:text-orange-300"
                              : "text-orange-600 hover:text-orange-700"
                          }`}
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    <div
                      className={`p-6 rounded-lg ${
                        darkMode ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <h3
                        className={`font-semibold mb-4 ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Billing History
                      </h3>
                      <div className="space-y-3">
                        {[
                          {
                            date: "Dec 15, 2025",
                            amount: "$29.00",
                            status: "Paid",
                          },
                          {
                            date: "Nov 15, 2025",
                            amount: "$29.00",
                            status: "Paid",
                          },
                          {
                            date: "Oct 15, 2025",
                            amount: "$29.00",
                            status: "Paid",
                          },
                        ].map((invoice, i) => (
                          <div
                            key={i}
                            className={`flex items-center justify-between p-4 rounded-lg ${
                              darkMode
                                ? "bg-gray-600 hover:bg-gray-600/70"
                                : "bg-white hover:bg-gray-50"
                            } transition-colors`}
                          >
                            <div className="flex items-center gap-4">
                              <Calendar
                                className={`w-5 h-5 ${
                                  darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                              />
                              <div>
                                <div
                                  className={`font-medium ${
                                    darkMode ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  {invoice.date}
                                </div>
                                <div
                                  className={`text-sm ${
                                    darkMode ? "text-gray-400" : "text-gray-600"
                                  }`}
                                >
                                  Invoice #{1000 + i}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span
                                className={`font-semibold ${
                                  darkMode ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {invoice.amount}
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  darkMode
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {invoice.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-lg border ${
                        darkMode
                          ? "border-gray-600 bg-gray-700/30"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    >
                      <button
                        className={`text-sm font-medium ${
                          darkMode
                            ? "text-red-400 hover:text-red-300"
                            : "text-red-600 hover:text-red-700"
                        }`}
                      >
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
