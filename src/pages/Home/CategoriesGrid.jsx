import React, { useEffect, useState } from "react";
import H1text from "../../utils/H1text";
import { FaBook, FaRocket, FaHeart, FaHistory, FaBrain, FaGlobe } from "react-icons/fa";

const CategoriesGrid = () => {
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
    
  const categories = [
    { id: 1, name: "Fiction", icon: <FaBook />, color: isDark ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600" },
    { id: 2, name: "Sci-Fi", icon: <FaRocket />, color: isDark ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-600" },
    { id: 3, name: "Romance", icon: <FaHeart />, color: isDark ? "bg-pink-900/30 text-pink-400" : "bg-pink-100 text-pink-600" },
    { id: 4, name: "History", icon: <FaHistory />, color: isDark ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-600" },
    { id: 5, name: "Self-Help", icon: <FaBrain />, color: isDark ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600" },
    { id: 6, name: "Travel", icon: <FaGlobe />, color: isDark ? "bg-teal-900/30 text-teal-400" : "bg-teal-100 text-teal-600" },
  ];

  return (
    <div className="py-12">
      <H1text>Explore Categories</H1text>
      <p className={`text-center mb-10 mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Find your next favorite read by genre</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className={`group flex flex-col items-center justify-center p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
              isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
            }`}
          >
            <div className={`p-4 rounded-full ${cat.color} text-2xl mb-3 group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            <h3 className={`font-semibold group-hover:text-primary transition-colors ${isDark ? "text-gray-200" : "text-gray-800"}`}>
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;
