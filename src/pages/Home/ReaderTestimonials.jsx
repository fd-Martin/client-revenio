import React, { useEffect, useState } from "react";
import H1text from "../../utils/H1text";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const ReaderTestimonials = () => {
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
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Book Blogger",
      image: "https://i.pravatar.cc/150?u=sarah",
      quote: "BookCourier transformed how I buy books. The delivery is incredibly fast, and the packaging ensures every book arrives in pristine condition!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Student",
      image: "https://i.pravatar.cc/150?u=michael",
      quote: "Found all my university textbooks here at unbeatable prices. The student discount was a huge bonus. Highly recommended!",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Fiction Lover",
      image: "https://i.pravatar.cc/150?u=emily",
      quote: "The recommendation engine is spot on. I've discovered three of my new favorite authors thanks to the 'Similar Books' feature.",
      rating: 4
    },
    {
      id: 4,
      name: "Beiley Jon",
      role: "Closea Lover",
      image: "https://i.ibb.co.com/spxf3fZC/young-beautiful-girl-posing-black-leather-jacket-park.jpg",
      quote: "The recommendation engine is spot on. I've discovered three of my new favorite authors thanks to the 'Similar Books' feature.",
      rating: 6
    }
  ];

  return (
    <div className="py-12">
      <H1text>Reader Stories</H1text>
      <p className={`text-center mb-10 mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Hear from our community of book lovers</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {testimonials.map((item) => (
          <div key={item.id} className={`p-8 rounded-2xl shadow-lg relative hover:-translate-y-2 transition-transform duration-300 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}>
            <FaQuoteLeft className={`text-4xl absolute top-6 right-6 ${
              isDark ? "text-gray-700" : "text-gray-200"
            }`} />
            
            <div className="flex items-center gap-1 text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < item.rating ? "text-yellow-400" : "text-gray-300"} />
              ))}
            </div>
            
            <p className={`mb-6 italic relative z-10 ${isDark ? "text-gray-300" : "text-gray-600"}`}>"{item.quote}"</p>
            
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
              <div>
                <h4 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{item.name}</h4>
                <p className="text-xs text-primary font-medium">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReaderTestimonials;
