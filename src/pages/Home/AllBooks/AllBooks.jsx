import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Card from "../../../shared/Card";
import { IoMdSearch } from "react-icons/io";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../../shared/LoadingSpinner ";
import PageNotFOund from "../../../shared/PageNotFOund";
import TextType from "../../../utils/TextType";

const AllBooks = () => {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { register, handleSubmit } = useForm();
  const [price, setPrice] = useState("");
  //   Positions
  const [page, setPage] = useState(1);
  const [allBook, setAllBook] = useState(0);
  const limit = 10;
  const skip = (page - 1) * limit;
  const totalPage = Math.ceil(allBook / limit);

  const axiosSecure = useAxiosSecure();

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

  const {
    data: books = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["Publish", "In Stock", page, search, price],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `allBooksCollections?one=Publish&tow=In Stock&limit=${limit}&skip=${skip}&search=${search}&sort=${price}`,
      );
      setAllBook(res?.data?.counts);
      return res?.data?.result || [];
    },
  });

  const handelSeawdg = (ol) => {
    const text = ol.search;
    setPage(1);
    setSearch(text);
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  {
    isFetching && (
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`w-11/12 mx-auto ${isDark ? "" : ""}`}>
      <div className="mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0">
        {/* Heading */}
        <h1 className="text-2xl text-center md:text-left md:text-3xl font-semibold text-primary leading-tight">
          <TextType
            text={`All Books (${allBook})`}
            typingSpeed={70}
            deletingSpeed={40}
            pauseDuration={2000}
            loop={false}
            showCursor={false}
          />
        </h1>

        {/* Right side: Search + Sort */}
        <div className="flex flex-col gap-5 md:gap-2 md:flex-row w-full md:w-auto">
          {/* Search */}
          <form onSubmit={handleSubmit(handelSeawdg)} className="flex-1">
            <label className="relative w-full max-w-md md:max-w-xs">
              <IoMdSearch
                className={`pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 ${
                  isDark ? "text-gray-400" : "text-gray-400"
                }`}
              />

              <input
                type="search"
                {...register("search")}
                name="search"
                placeholder="Search Book...."
                className={`w-full pl-10 pr-24 py-2 rounded-lg border ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                    : "bg-white text-gray-900 border-gray-300 focus:ring-orange-400 focus:border-orange-400"
                } focus:outline-none focus:ring-2`}
              />

              <button
                type="submit"
                className="absolute top-1/2 right-0 -translate-y-1/2
                  px-4 py-2 rounded-md bg-orange-500 text-white
                  hover:bg-orange-600 transition"
              >
                Search
              </button>
            </label>
          </form>

          {/* Sort Select */}
          <label className="">
            <select
              onChange={(e) => setPrice(e.target.value)}
              className={`
                select
                w-40
                px-4 py-2                
                rounded-lg              
                border ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }
                focus:outline-none
                focus:ring-2 focus:ring-orange-400
                cursor-pointer
                font-medium
                transition-all duration-300
              `}
            >
              <option disabled={true}>Select Any Option</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid mx-auto items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mt-15">
        {books.length === 0 ? (
          <PageNotFOund></PageNotFOund>
        ) : (
          books.map((book) => <Card key={book._id} book={book}></Card>)
        )}
      </div>

      {/* Pagination */}
      <div
        className={`flex justify-between items-center px-6 py-4 mt-7 border-t ${
          isDark ? "border-gray-700" : "border-gray-200"
        } rounded-b-2xl`}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`flex items-center gap-2 px-4 py-1 rounded-lg font-medium transition ${
            page === 1
              ? `text-gray-400 cursor-not-allowed ${isDark ? "bg-gray-700" : "bg-gray-200"}`
              : "bg-gradient-to-br from-orange-400 to-orange-600 text-white hover:opacity-90"
          }`}
        >
          <FaArrowLeftLong /> Previous
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPage }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition ${
                page === i + 1
                  ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
                  : `${
                      isDark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    } hover:bg-orange-100`
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          disabled={page === totalPage}
          onClick={() => setPage(page + 1)}
          className={`flex items-center gap-2 px-4 py-1 rounded-lg font-medium transition ${
            page === totalPage
              ? `text-gray-400 cursor-not-allowed ${isDark ? "bg-gray-700" : "bg-gray-200"}`
              : "bg-gradient-to-br from-orange-400 to-orange-600 text-white hover:opacity-90"
          }`}
        >
          Next <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};

export default AllBooks;
