import React, { useState, useEffect } from "react";
import { TrendingUp, Award, BookOpen, Users, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";

const TopSellingBooksSection = () => {
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div
      className={` px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
        isDark ? "" : ""
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 dark:bg-orange-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200 dark:bg-amber-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-11/12 mx-auto relative z-10">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8" data-aos="fade-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 rounded-full shadow-lg">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
              <span className="text-white text-sm font-bold uppercase tracking-wider">
                Top Selling Collection
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2
                className={`text-3xl md:text-4xl font-extrabold leading-tight ${
                  isDark ? "text-white" : "text-primary"
                }`}
              >
                Discover Our Most
                <span className="block mt-2 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  Loved Books
                </span>
              </h2>

              <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
            </div>

            {/* Description */}
            <p
              className={`text-lg md:text-xl leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Join thousands of happy readers who have discovered their next
              favorite book with
              <span className="font-bold text-orange-600"> BookCourier</span>.
              Our top-selling collection features the most sought-after titles
              that readers can't stop talking about. From timeless classics to
              contemporary bestsellers, find the books that everyone is reading.
            </p>

            {/* Feature Points */}
            <div className="space-y-4 pt-4">
              {[
                {
                  icon: Award,
                  text: "Award-winning bestsellers from top authors",
                },
                { icon: BookOpen, text: "Curated selection across all genres" },
                { icon: Users, text: "Trusted by thousands of book lovers" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <p
                    className={`text-base md:text-lg pt-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  <CountUp start={0} end={1000} duration={3} />+
                </div>
                <div
                  className={`text-xs md:text-sm font-medium ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Happy Readers
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  <CountUp start={0} end={50} duration={3} />
                  K+
                </div>
                <div
                  className={`text-xs md:text-sm font-medium ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Books Sold
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  <CountUp start={0} end={4.9} decimals={1} duration={3} />★
                </div>
                <div
                  className={`text-xs md:text-sm font-medium ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Avg Rating
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Collection
                  <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Right Side - Image Content */}
          <div className="relative" data-aos="fade-left">
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-br from-orange-400 to-amber-400 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl blur-2xl opacity-30 animate-pulse animation-delay-1000"></div>

              {/* Image Grid */}
              <div className="relative grid grid-cols-2 gap-6">
                {/* Large Image */}
                <div className="col-span-2 relative group overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit=crop"
                    alt="Featured Book Collection"
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-2xl font-bold mb-2">
                      Featured Bestsellers
                    </h3>
                    <p className="text-gray-200 text-sm">
                      The books everyone's talking about
                    </p>
                  </div>
                </div>

                {/* Small Image 1 */}
                <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop"
                    alt="Popular Books"
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600/80 to-transparent flex items-end p-4">
                    <span className="text-white font-bold text-lg">
                      Classics
                    </span>
                  </div>
                </div>

                {/* Small Image 2 */}
                <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=300&fit=crop"
                    alt="New Releases"
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-600/80 to-transparent flex items-end p-4">
                    <span className="text-white font-bold text-lg">
                      New Arrivals
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-2xl p-6 animate-bounce-slow">
                <div className="text-center">
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    #1
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } mt-1`}
                  >
                    Bookstore
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default TopSellingBooksSection;
