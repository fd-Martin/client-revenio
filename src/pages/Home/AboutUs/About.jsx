import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaInfoCircle,
  FaLightbulb,
  FaUsers,
  FaListAlt,
  FaBook,
  FaUserCog,
  FaExchangeAlt,
  FaShieldAlt,
  FaLaptopCode,
  FaSmile,
  FaCheckCircle,
  FaRocket,
} from "react-icons/fa";
import { CheckCircle, Rocket, Shield, Users } from "lucide-react";

// Using high-quality library images from Unsplash
const libraryImg1 = "https://i.ibb.co.com/nqXT5Tmk/image.png";
const libraryImg2 = "https://i.ibb.co.com/ynbFbR3K/image.png";

const About = () => {
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

  const features = [
    {
      id: 1,
      title: "About the Application",
      description:
        "This application is a modern Library Management System designed to simplify book tracking, user management, and borrowing activities. It helps libraries operate efficiently with a digital-first approach.",
      icon: <FaInfoCircle className="text-4xl text-primary" />,
    },
    {
      id: 2,
      title: "Purpose & Vision",
      description:
        "Our goal is to reduce manual work and bring automation to libraries. We aim to create a smart, fast, and user-friendly system for managing books and readers.",
      icon: <FaLightbulb className="text-4xl text-primary" />,
    },
    {
      id: 3,
      title: "Who Is This App For?",
      description:
        "Suitable for School & College Libraries, Public Libraries, Private Book Collections, Librarians & Students. This app fits both small and large libraries.",
      icon: <FaUsers className="text-4xl text-primary" />,
    },
    {
      id: 4,
      title: "Key Features Overview",
      description:
        "Includes book counting & inventory tracking, borrow & return management, user & admin roles, real-time data updates, and a secure authentication system.",
      icon: <FaListAlt className="text-4xl text-primary" />,
    },
    {
      id: 5,
      title: "Book Management System",
      description:
        "Admins can add new books, update details, track available & borrowed copies, and remove outdated items. Everything is organized and searchable.",
      icon: <FaBook className="text-4xl text-primary" />,
    },
    {
      id: 6,
      title: "User Management",
      description:
        "Supports Admin accounts and Registered users. Admins have full control with role-based access, while users enjoy a simple borrowing experience.",
      icon: <FaUserCog className="text-4xl text-primary" />,
    },
    {
      id: 7,
      title: "Borrow & Return Process",
      description:
        "Users can request books, view history, and check deadlines. Admins can approve, track, and manage all transactions smoothly.",
      icon: <FaExchangeAlt className="text-4xl text-primary" />,
    },
    {
      id: 8,
      title: "Security & Data Safety",
      description:
        "We focus on a secure login system, protected user data, and controlled access to admin features. Data privacy and safety are a top priority.",
      icon: <FaShieldAlt className="text-4xl text-primary" />,
    },
    {
      id: 9,
      title: "Technology Used",
      description:
        "Built using modern web technologies to ensure high performance, scalability, and a smooth user experience. The system is future-ready and easy to extend.",
      icon: <FaLaptopCode className="text-4xl text-primary" />,
    },
    {
      id: 10,
      title: "User-Friendly Interface",
      description:
        "The UI is clean, minimal, easy to navigate, and responsive for mobile & desktop. Even first-time users can use it without confusion.",
      icon: <FaSmile className="text-4xl text-primary" />,
    },
    {
      id: 11,
      title: "Benefits of Using This App",
      description:
        "Saves time, reduces paperwork, improves accuracy, ensures better book tracking, and leads to efficient library operations.",
      icon: <FaCheckCircle className="text-4xl text-primary" />,
    },
    {
      id: 12,
      title: "Future Plans & Improvements",
      description:
        "We plan to add advanced search & filters, analytics & reports, a notification system, and barcode/QR-based book tracking. Continuous improvement is our mission.",
      icon: <FaRocket className="text-4xl text-primary" />,
    },
  ];

  return (
    <div
      className={` min-h-screen ${
        isDark ? "bg-gray-800" : "bg-gradient-to-b from-gray-50 to-white"
      } border-t ${isDark ? "border-gray-700" : "border-base-300"}`}
    >
      <div className="w-11/12 mx-auto py-16">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-28">
          {/* Left Side - Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex gap-6 relative"
          >
            {/* Decorative background shape */}
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-orange-200 dark:bg-orange-900/30 rounded-full blur-3xl opacity-50 z-0"></div>

            <div className="w-1/2 z-10">
              <img
                src={libraryImg1}
                alt="Library Interior"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl transform translate-y-8 hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="w-1/2 z-10">
              <img
                src={libraryImg2}
                alt="Bookshelves"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl transform -translate-y-8 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h4 className="text-primary font-bold tracking-wider uppercase mb-2">
              Who We Are
            </h4>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              Driven to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                Discover?
              </span>{" "}
              <br />
              Discover it Here!
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-8"></div>

            <p className="text-lg text-gray-600 dark:text-white mb-6 leading-relaxed font-medium">
              We are more than just a delivery service; we are a
              technology-driven logistics company dedicated to bringing the joy
              of reading to your doorstep.
            </p>

            <p className="text-gray-500 dark:text-gray-200 mb-10 leading-relaxed">
              Explore our massive library and experience the future of book
              delivery, where tradition meets innovation. Our AI-powered
              recommendations help you find exactly what you're looking for,
              even if you don't know it yet.
            </p>

            <button className="group relative px-8 py-2.5 rounded-full bg-orange-500 text-white font-bold tracking-wide shadow-lg hover:shadow-orange-500/40 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Explore Services</span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-orange-400"></div>
            </button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
              Core Features
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              About The Application
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`group relative ${
                  isDark ? "bg-gray-800" : "bg-white"
                } p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border ${
                  isDark ? "border-gray-700" : "border-gray-100"
                } overflow-hidden`}
              >
                {/* Hover Gradient Border Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                <div className="mb-6 inline-flex p-4 hover:text-white bg-orange-50 dark:bg-orange-900/20 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-200 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {[
            { label: "Libraries Served", value: "500+" },
            { label: "Books Managed", value: "100K+" },
            { label: "Active Users", value: "10K+" },
            { label: "Daily Transactions", value: "1K+" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`${
                isDark ? "bg-gray-800" : "bg-white"
              } rounded-2xl p-8 text-center shadow-lg`}
            >
              <div className="text-4xl font-bold text-orange-500 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-white font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Additional 7 Sections */}
        <div id="Add New  Sectionns" className="space-y-20 mb-24">
          {/* Section 1: Our Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${
              isDark ? "bg-gray-800" : "bg-white"
            } rounded-3xl p-10 md:p-14 shadow-xl border ${
              isDark ? "border-gray-700" : "border-gray-100"
            }`}
          >
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/3">
                <div className="w-full h-full min-h-[200px] bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center">
                  <FaBook className="text-6xl text-primary opacity-80" />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 dark:text-white leading-relaxed text-lg">
                  Founded with a vision to revolutionize library management, our
                  platform emerged from the need to digitize and streamline
                  traditional library operations. We understand the challenges
                  faced by librarians and have created a solution that combines
                  simplicity with powerful features. Our journey began with a
                  simple question:
                  <span className="text-primary font-semibold italic">
                    {" "}
                    "How can we make library management effortless?"
                  </span>{" "}
                  Today, we serve hundreds of libraries worldwide, helping them
                  manage millions of books efficiently.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${
              isDark
                ? "bg-gray-800"
                : "bg-gradient-to-br from-orange-50 to-white"
            } rounded-3xl p-10 md:p-14 shadow-lg border ${
              isDark ? "border-gray-700" : "border-orange-100"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-10 text-center">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  id: 1,
                  title: "Easy to Use",
                  desc: "Intuitive interface designed for users of all technical levels.",
                },
                {
                  id: 2,
                  title: "Cost Effective",
                  desc: "Affordable pricing plans suitable for all library sizes.",
                },
                {
                  id: 3,
                  title: "24/7 Support",
                  desc: "Round-the-clock customer support to help you anytime.",
                },
                {
                  id: 4,
                  title: "Regular Updates",
                  desc: "Continuous improvements and new features added regularly.",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start space-x-5 p-6 ${
                    isDark ? "bg-gray-800" : "bg-white"
                  } rounded-2xl shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 text-lg font-bold shadow-lg shadow-orange-500/30">
                    {item.id}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-200 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 3: How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${
              isDark ? "bg-gray-800" : "bg-white"
            } rounded-3xl p-10 md:p-14 shadow-xl border ${
              isDark ? "border-gray-700" : "border-gray-100"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-10 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-10 left-0 w-full h-1 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 transform -translate-y-1/2 z-0"></div>

              {[
                {
                  step: "1",
                  title: "Sign Up",
                  desc: "Create your library account in minutes with simple registration.",
                },
                {
                  step: "2",
                  title: "Add Books",
                  desc: "Import or manually add your book collection to the system.",
                },
                {
                  step: "3",
                  title: "Manage",
                  desc: "Start managing borrows, returns, and inventory effortlessly.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center relative z-10">
                  <div
                    className={`${
                      isDark ? "bg-gray-800" : "bg-white"
                    } w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 ${
                      isDark ? "border-gray-700" : "border-orange-100"
                    }`}
                  >
                    <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-orange-50 to-red-600">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 4: Success Stories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${
              isDark
                ? "bg-gray-800 border border-gray-700"
                : "bg-gradient-to-r from-orange-600 to-red-600"
            } rounded-3xl p-10 md:p-14 shadow-2xl text-white relative overflow-hidden`}
          >
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center relative z-10">
              Success Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                <div className="mb-6 text-orange-200 text-5xl">"</div>
                <p className="text-white/90 italic mb-6 text-lg leading-relaxed">
                  This system transformed how we manage our school library. Book
                  tracking is now instant, and students love the easy borrowing
                  process!
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    S
                  </div>
                  <div>
                    <p className="font-bold text-white">Sarah Johnson</p>
                    <p className="text-orange-200 text-sm">School Librarian</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                <div className="mb-6 text-orange-200 text-5xl">"</div>
                <p className="text-white/90 italic mb-6 text-lg leading-relaxed">
                  We reduced paperwork by 90% and improved our inventory
                  accuracy. The admin panel is incredibly powerful yet simple to
                  use.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    M
                  </div>
                  <div>
                    <p className="font-bold text-white">Michael Chen</p>
                    <p className="text-orange-200 text-sm">
                      Public Library Manager
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 5: Team & Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${
              isDark ? "bg-gray-800" : "bg-white"
            } rounded-3xl p-10 md:p-14 shadow-xl border ${
              isDark ? "border-gray-700" : "border-gray-100"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: <CheckCircle className="w-8 h-8" />,
                  title: "Innovation",
                  desc: "Constantly improving with new features",
                  color: "bg-blue-500",
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Security",
                  desc: "Your data is always protected",
                  color: "bg-green-500",
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Community",
                  desc: "Building together with users",
                  color: "bg-purple-500",
                },
                {
                  icon: <Rocket className="w-8 h-8" />,
                  title: "Excellence",
                  desc: "Striving for the best quality",
                  color: "bg-orange-500",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-center group p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div
                    className={`${item.color} text-white w-20 h-20 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-200 text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 6: FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${
              isDark ? "bg-gray-800" : "bg-gray-50"
            } rounded-3xl p-10 md:p-14`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-10 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {[
                {
                  q: "Is this suitable for small libraries?",
                  a: "Yes! Our system is designed to work for libraries of all sizes, from small personal collections to large institutional libraries.",
                },
                {
                  q: "Can I import existing book data?",
                  a: "Absolutely! We support bulk import from Excel, CSV, and other common formats to make migration easy.",
                },
                {
                  q: "What about mobile access?",
                  a: "Our platform is fully responsive and works perfectly on smartphones, tablets, and desktop computers.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${
                    isDark ? "bg-gray-800" : "bg-white"
                  } p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border ${
                    isDark ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-3">
                    <span className="text-primary">Q.</span> {item.q}
                  </h3>
                  <p
                    className={`text-gray-600 dark:text-gray-200 pl-8 border-l-2 ${
                      isDark ? "border-gray-700" : "border-orange-100"
                    }`}
                  >
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 7: Contact & Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${
              isDark ? "bg-gray-800" : "bg-white"
            } rounded-3xl p-10 md:p-14 shadow-xl border ${
              isDark ? "border-gray-700" : "border-gray-100"
            } text-center`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12">
              Get in Touch
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: "📧",
                  title: "Email Support",
                  info: "support@library.com",
                  sub: "Response within 24h",
                },
                {
                  icon: "📞",
                  title: "Phone Support",
                  info: "+1 (800) 123-4567",
                  sub: "Mon-Fri 9am-6pm",
                },
                {
                  icon: "💬",
                  title: "Live Chat",
                  info: "Available 24/7",
                  sub: "Instant response",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-2xl ${
                    isDark
                      ? "bg-gray-800 border text-white border-gray-700"
                      : "bg-gray-50"
                  } hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors group`}
                >
                  <div
                    className={`${
                      isDark ? "bg-gray-800" : "bg-white"
                    } w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform text-3xl`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-primary font-semibold text-lg mb-1">
                    {item.info}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
