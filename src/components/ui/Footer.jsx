import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowUp,
  FaBookReader,
} from "react-icons/fa";

export default function Footer() {
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

  return (
    <footer
      className={` relative ${
        isDark ? "bg-gray-800" : "bg-orange-50"
      } border-t ${isDark ? "border-gray-700" : "border-base-300"}`}
    >
      <div className="max-w-11/12 mx-auto px-6 md:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaBookReader className="h-6 w-6 text-primary" />
              <a className="text-xl text-primary">BookCourier</a>
            </div>
            <p
              className={`${isDark ? "text-white" : "text-gray-600"} max-w-xs`}
            >
              BookCourier delivers your favorite books right to your doorstep,
              fast and hassle-free. Explore a vast collection of titles and
              enjoy easy online ordering anytime. Your next great read is just a
              click away!
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/mafhrbd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 cursor-pointer hover:bg-orange-200 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 cursor-pointer hover:bg-orange-200 transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 cursor-pointer hover:bg-orange-200 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 cursor-pointer hover:bg-orange-200 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Our Links */}
          <div>
            <h3
              className={`text-lg font-semibold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Our Links
            </h3>
            <ul
              className={`space-y-3 ${isDark ? "text-white" : "text-gray-600"}`}
            >
              {[
                "Dashboard",
                "All Book",
                "Privacy Policy",
                "Pricing Table",
                "FAQ",
              ].map((link, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition"
                >
                  <span className="text-orange-400"></span> {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Bookland ? */}
          <div>
            <h3
              className={`text-lg font-semibold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Bookland
            </h3>
            <ul
              className={`space-y-3 ${isDark ? "text-white" : "text-gray-600"}`}
            >
              {[
                "Bookland",
                "Services",
                "Book Details",
                "Blog Details",
                "Shop",
              ].map((link, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition"
                >
                  <span className="text-orange-400"></span> {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3
              className={`text-lg font-semibold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Resources
            </h3>
            <ul
              className={`space-y-3 ${isDark ? "text-white" : "text-gray-600"}`}
            >
              {["Download", "Help Center", "Shop Cart", "Login", "Partner"].map(
                (link, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition"
                  >
                    <span className="text-orange-400"></span> {link}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 ${
            isDark ? "text-white" : "text-gray-600"
          }`}
        >
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-orange-400 mt-1" />
            <div>
              <h4
                className={`font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                } mb-1`}
              >
                Get in Touch With Us
              </h4>
              <p>832 Thompson Drive, San Fransisco CA 94107, US</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaPhoneAlt className="text-orange-400 mt-1" />
            <div>
              <p>01613410880</p>
              <p>01577006071</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaEnvelope className="text-orange-400 mt-1" />
            <div>
              <p>aftabfarhan324@gmail.com</p>
              <p>aftabarkofarhan@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`mt-5 text-center ${
            isDark ? "text-gray-400" : "text-gray-400"
          } text-sm`}
        >
          BookCourier is your go-to online bookstore for quick and reliable book
          delivery. - © 2025 All Rights Reserved
        </div>
      </div>

      {/* Bottom Right Scroll To Top */}
      <button
        // aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className=" absolute bottom-10 right-10 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-500 transition"
      >
        <FaArrowUp className="text-white" />
      </button>
    </footer>
  );
}
