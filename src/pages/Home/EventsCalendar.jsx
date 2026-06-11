import React, { useEffect, useState } from "react";
import H1text from "../../utils/H1text";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const EventsCalendar = () => {
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
  const events = [
    {
      id: 1,
      title: "Book Launch: 'The Silent Echo'",
      date: "Oct 15",
      time: "6:00 PM",
      location: "Central Library Hall",
      image: "https://i.ibb.co.com/HfsytVhG/image.png",
    },
    {
      id: 2,
      title: "Meet the Author: Stephen King",
      date: "Oct 22",
      time: "4:00 PM",
      location: "Virtual Event (Zoom)",
      image: "https://i.ibb.co.com/1JPgvctg/image.png",
    },
    {
      id: 3,
      title: "Kids Storytelling Workshop",
      date: "Oct 28",
      time: "10:00 AM",
      location: "BookCourier Kids Corner",
      image: "https://i.ibb.co.com/3yJVwv9L/image.png",
    },
    {
      id: 4,
      title: "Kids Storytelling Workshop",
      date: "Oct 28",
      time: "10:00 AM",
      location: "BookCourier Kids Corner",
      image: "https://i.ibb.co.com/FkHYNDtM/image.png",
    },
  ];

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 px-4">
        <div>
          <H1text>Upcoming Events</H1text>
          <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Connect with authors and fellow readers
          </p>
        </div>
        <button className="hidden md:block text-primary font-semibold hover:underline">
          View All Events &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className={`group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-center shadow-sm">
                <span className="block text-xs font-bold text-gray-500 uppercase">
                  {event.date.split(" ")[0]}
                </span>
                <span className="block text-xl font-bold text-primary">
                  {event.date.split(" ")[1]}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3
                className={`text-xl font-bold mb-3 group-hover:text-primary transition-colors ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {event.title}
              </h3>

              <div
                className={`space-y-2 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaClock className="text-primary" /> {event.time}
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" /> {event.location}
                </div>
              </div>

              <button className="w-full mt-5 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium">
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="md:hidden w-full mt-6 text-primary font-semibold hover:underline text-center">
        View All Events &rarr;
      </button>
    </div>
  );
};

export default EventsCalendar;
