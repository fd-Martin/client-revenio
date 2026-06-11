import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaStar,
  FaShoppingCart,
  FaArrowRight,
  FaHeart,
  FaEye,
  FaFire,
  FaClock,
  FaTrophy,
} from "react-icons/fa";

const LetasCard = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [wishlist, setWishlist] = useState([]);
  const [quickView, setQuickView] = useState(null);

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

  const books = [
    {
      id: 1,
      title: "Flovely And Unicorn Erna",
      category: "Design Low Book",
      price: 30.0,
      originalPrice: 39.99,
      rating: 4,
      reviews: 128,
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
      author: "Albert",
      authorImg: "https://i.pravatar.cc/150?u=albert",
      badge: null,
      trending: false,
      newArrival: false,
      stock: 15,
    },
    {
      id: 2,
      title: "Qple GPad With Retinay Sispla",
      category: "Design Low Book",
      price: 30.0,
      originalPrice: 39.99,
      rating: 5,
      reviews: 256,
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400",
      author: "Wilson",
      authorImg: "https://i.pravatar.cc/150?u=wilson",
      badge: "Hot",
      badgeColor: "bg-orange-500",
      trending: true,
      newArrival: false,
      stock: 8,
    },
    {
      id: 3,
      title: "Simple Things You To Save BOOK",
      category: "Design Low Book",
      price: 30.0,
      originalPrice: 39.99,
      rating: 4,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400",
      author: "Wilson",
      authorImg: "https://i.pravatar.cc/150?u=wilson2",
      badge: null,
      trending: false,
      newArrival: true,
      stock: 25,
    },
    {
      id: 4,
      title: "How Deal With Very Bad BOOK",
      category: "Design Low Book",
      price: 30.0,
      originalPrice: 39.99,
      rating: 5,
      reviews: 342,
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
      author: "Esther",
      authorImg: "https://i.pravatar.cc/150?u=esther",
      badge: "-30%",
      badgeColor: "bg-teal-600",
      trending: false,
      newArrival: false,
      stock: 5,
    },
  ];

  const toggleWishlist = (bookId) => {
    setWishlist((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      {/* Header Section with Filter Tabs */}
      <div className="flex flex-col gap-4 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-primary font-bold mb-1">
              Bookle Top Books
            </h2>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Discover amazing books with great deals
            </p>
          </div>
          <Link to="/books" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto group relative px-6 sm:px-8 py-2.5 rounded-full bg-orange-500 text-white font-bold tracking-wide shadow-lg hover:shadow-orange-500/40 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore More <FaArrowRight className="text-sm" />
              </span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-orange-400"></div>
            </button>
          </Link>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              isDark ? "bg-orange-500 text-white" : "bg-orange-500 text-white"
            }`}
          >
            All Books
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              isDark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FaFire className="inline mr-1" /> Trending
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              isDark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FaClock className="inline mr-1" /> New Arrivals
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              isDark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FaTrophy className="inline mr-1" /> Best Sellers
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
        {/* Book Cards */}
        {books.map((book) => (
          <div
            key={book.id}
            className={`group rounded-xl p-4 sm:p-5 shadow-md transition-all hover:shadow-xl border flex flex-col ${
              isDark
                ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                : "bg-white border-gray-100 hover:border-gray-300"
            }`}
          >
            {/* Image Container with Actions */}
            <div
              className={`relative mb-3 sm:mb-4 rounded-lg p-3 sm:p-4 h-48 sm:h-56 lg:h-64 flex items-center justify-center ${
                isDark ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <img
                src={book.image}
                alt={book.title}
                className="h-full w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {book.badge && (
                  <span
                    className={`text-white text-xs font-bold px-2.5 py-1 rounded-md ${book.badgeColor}`}
                  >
                    {book.badge}
                  </span>
                )}
                {book.trending && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                    <FaFire /> Trending
                  </span>
                )}
                {book.newArrival && (
                  <span className="bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    New
                  </span>
                )}
              </div>

              {/* Quick Action Buttons */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => toggleWishlist(book.id)}
                  className={`p-2 rounded-full shadow-lg transition-all ${
                    wishlist.includes(book.id)
                      ? "bg-red-500 text-white"
                      : isDark
                      ? "bg-gray-800 text-gray-300 hover:bg-red-500 hover:text-white"
                      : "bg-white text-gray-700 hover:bg-red-500 hover:text-white"
                  }`}
                >
                  <FaHeart className="text-sm" />
                </button>
                <button
                  onClick={() => setQuickView(book.id)}
                  className={`p-2 rounded-full shadow-lg transition-all ${
                    isDark
                      ? "bg-gray-800 text-gray-300 hover:bg-orange-500 hover:text-white"
                      : "bg-white text-gray-700 hover:bg-orange-500 hover:text-white"
                  }`}
                >
                  <FaEye className="text-sm" />
                </button>
              </div>

              {/* Stock Indicator */}
              {book.stock < 10 && (
                <div className="absolute bottom-2 left-2 right-2">
                  <div
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      book.stock < 5
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    Only {book.stock} left!
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col">
              <p
                className={`text-xs mb-1 uppercase tracking-wide ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {book.category}
              </p>
              <h3
                className={`font-bold text-base sm:text-lg leading-tight mb-3 line-clamp-2 min-h-[2.5rem] ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {book.title}
              </h3>

              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <span className="text-orange-500 font-bold text-lg sm:text-xl">
                  ${book.price.toFixed(2)}
                </span>
                <span
                  className={`text-sm line-through ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  ${book.originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded">
                  {Math.round(
                    ((book.originalPrice - book.price) / book.originalPrice) *
                      100
                  )}
                  % OFF
                </span>
              </div>

              {/* Author & Rating */}
              <div className="flex justify-between items-center mb-2 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={book.authorImg}
                    alt={book.author}
                    className="w-6 h-6 rounded-full flex-shrink-0"
                  />
                  <span
                    className={`text-sm truncate ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {book.author}
                  </span>
                </div>
                <div className="flex text-orange-400 text-xs gap-0.5 flex-shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < book.rating ? "text-orange-400" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Reviews Count */}
              <p
                className={`text-xs mb-4 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                ({book.reviews} reviews)
              </p>

              {/* Add to Cart Button */}
              <button
                className={`w-full py-2.5 rounded-full font-semibold text-sm hover:bg-orange-400 hover:text-white transition-all flex items-center justify-center gap-2 mt-auto shadow-sm hover:shadow-md ${
                  isDark
                    ? "bg-gray-700 text-white hover:bg-orange-300"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <FaShoppingCart className="text-sm" /> Add To Cart
              </button>
            </div>
          </div>
        ))}

        {/* Promo Banner */}
        <div className="bg-gradient-to-br from-teal-700 to-teal-800 rounded-xl p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden min-h-[350px] sm:min-h-[400px] lg:min-h-auto">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-teal-600 rounded-bl-full opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-yellow-400 rounded-tr-full opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-teal-600 rounded-full opacity-20 blur-3xl"></div>

          <div className="relative z-10">
            <div className="inline-block bg-yellow-400 text-teal-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
              SPECIAL OFFER
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
              Find Your Next Books!
            </h3>
            <p className="mb-4 sm:mb-6 text-teal-100 text-sm sm:text-base">
              And Get Your 25% Discount Now!
            </p>
            <button className="bg-white text-teal-800 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-sm hover:bg-gray-100 transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
              Shop Now <FaArrowRight className="text-xs" />
            </button>
          </div>

          <div className="relative z-10 mt-4 sm:mt-6 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300"
              alt="Student with books"
              className="w-full max-w-[200px] sm:max-w-[250px] h-auto object-cover rounded-lg shadow-xl transform translate-y-2 sm:translate-y-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetasCard;
