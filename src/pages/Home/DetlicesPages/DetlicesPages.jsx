import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { GoDuplicate } from "react-icons/go";
import { GrLanguage } from "react-icons/gr";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import LoadingSpinner from "../../../shared/LoadingSpinner ";
import TextType from "../../../utils/TextType";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "sonner";
import ReviewCard from "./ReviewCard";
import { FaCheck } from "react-icons/fa";

const DetlicesPages = () => {
  const queryClient = useQueryClient();
  const reviewRefe = useRef();
  const naviget = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Load Single Book Detlices
  const {
    data: book = {},
    isLoading: newLoding,
    refetch,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/oneBooks/${id}`);
      return res.data;
    },
  });

  // Load Related Catagorey Books
  const { data: relatedBooks = [], isLoading } = useQuery({
    queryKey: ["related", book?.category],
    enabled: !!book?.category,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `catogryfinde?category=${book?.category}`,
      );
      return res.data;
    },
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handelSeawdg = (customerInfo) => {
    // console.log(customerInfo);
    const orderInfo = {
      name: customerInfo.name,
      email: customerInfo.email,
      address: customerInfo.address,
      phoneNumber: customerInfo.phoneNumber,
      book,
    };

    axiosSecure.post("ordernow", orderInfo).then((res) => {
      // console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Order Successfully ");
        setIsOpen(false);
        reviewRefe.current.showModal();
      }
    });
  };
  // Review Data set
  const handerewiews = (e) => {
    e.preventDefault();
    const reating = e.target.rating.value;
    if (reating) {
      const setReviewDataBase = {
        bookId: id,
        bookName: book.title,
        bookImage: book.image,
        bookPrice: book.price_sell,
        bookWeight: book.weight,
        bookPages: book.page_count,
        reviewerEmail: user?.email,
        reviewerName: user?.displayName,
        reviewerPhoto: user?.photoURL,
        reviewerRating: Number(reating),
        reviewDate: new Date().toISOString(),
      };
      // console.log(setReviewDataBase);
      axiosSecure.post("reviewUserNow", setReviewDataBase).then((res) => {
        refetch();
        // console.log(res.data);
        if (res.data.acknowledged) {
          reviewRefe.current.close();
          toast.success("Thanks For Your Review");
          naviget("/deshbord/userorder");
        }
      });
    }
  };

  const { data: reviewase, isLoading: reviewLoding } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `detliseBookReview/${id}?email=${user?.email}`,
      );
      // console.log(res.data);
      return res.data;
    },
  });

  const { data: checkValue, refetch: checkValueRefetch } = useQuery({
    queryKey: ["find", id, user?.email],
    enabled: !!id && !!user?.email, // Prevent empty calls
    queryFn: async () => {
      const res = await axiosSecure.get(
        `findthisBookSavedornot?id=${id}&email=${user?.email}`,
      );

      return res?.data;
    },
  });

  const bookaddYourWishList = () => {
    const setwhislistData = {
      bookId: id,
      bookName: book.title,
      bookImage: book.image,
      bookLanguage: book.language,
      bookPrice: book.price_sell,
      bookWeight: book.weight,
      bookPages: book.page_count,
      wishlisterEmail: user?.email,
      wishlisterName: user?.displayName,
      wishlisterPhoto: user?.photoURL,
      wishlistingDate: new Date().toISOString(),
    };

    axiosSecure
      .post(`whiseListerInfo?email=${user?.email}&id=${id}`, setwhislistData)
      .then((res) => {
        if (res.data.message === "Book Allready Saved your WhisList") {
          toast.warning("Already on Wishlist!");
        } else {
          toast.success("Added to Wishlist!");
        }

        checkValueRefetch();
      });

    queryClient.invalidateQueries(["whisListdata", user?.email]);
  };

  if (isLoading || newLoding) return <LoadingSpinner></LoadingSpinner>;
  if (reviewLoding) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="min-h-screen  pb-24 pt-20">
      {/* Hero Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-12">
          {/* ===========================
               LEFT - IMAGE SECTION
          =========================== */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                {/* Main Card */}
                <div className="relative bg-white rounded-3xl p-6 shadow-2xl border border-gray-200/50">
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 aspect-[3/4]">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      src={book?.image}
                      alt={book?.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Stock Badge */}
                    {book?.stock_qty > 0 && (
                      <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        In Stock
                      </motion.div>
                    )}

                    {/* Discount Badge */}
                    {book?.price_mrp && book?.price_sell && (
                      <motion.div
                        initial={{ scale: 0, rotate: 10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm"
                      >
                        {Math.round(
                          ((book.price_mrp - book.price_sell) /
                            book.price_mrp) *
                            100,
                        )}
                        %
                      </motion.div>
                    )}
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-gradient-to-br from-amber-50 to-orange-100 p-4 rounded-xl text-center border border-amber-200/50 shadow-sm"
                    >
                      <div className="text-2xl mb-1">⭐</div>
                      <p className="text-xs text-gray-600 mb-0.5">Rating</p>
                      <p className="text-lg font-bold text-amber-600">
                        {book?.rating_avg || 0}
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl text-center border border-blue-200/50 shadow-sm"
                    >
                      <div className="text-2xl mb-1">📖</div>
                      <p className="text-xs text-gray-600 mb-0.5">Pages</p>
                      <p className="text-lg font-bold text-blue-600">
                        {book?.page_count}
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-xl text-center border border-purple-200/50 shadow-sm"
                    >
                      <div className="text-2xl mb-1">📦</div>
                      <p className="text-xs text-gray-600 mb-0.5">Stock</p>
                      <p className="text-lg font-bold text-purple-600">
                        {book?.stock_qty}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ===========================
               MIDDLE - DETAILS SECTION
          =========================== */}
          <div className="lg:col-span-7 xl:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50"
            >
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg mb-4">
                <GoDuplicate size={14} />
                {book?.category}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl  font-black text-gray-900 leading-tight mb-4 tracking-tight">
                {book?.title}
              </h1>

              {/* Author */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-gray-500">by</span>
                <span className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors cursor-pointer">
                  {book?.author}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < Math.floor(book?.rating_avg || 0)
                          ? "text-amber-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {book?.rating_avg || 0} out of 5
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6"></div>

              {/* Price Section */}
              <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-6 rounded-2xl mb-6 shadow-xl">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

                <div className="relative">
                  <p className="text-white/90 text-sm font-semibold mb-2">
                    Special Offer
                  </p>
                  <div className="flex items-baseline gap-4 flex-wrap">
                    <span className="text-3xl  font-black text-white">
                      ৳{book?.price_sell}
                    </span>
                    <span className="text-xl line-through text-white/60 font-semibold">
                      ৳{book?.price_mrp}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3 flex-wrap">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full font-bold shadow-lg border border-white/30">
                      <span className="text-md">🔥</span>
                      Save ৳{book?.price_mrp - book?.price_sell}
                    </div>
                    <div className="text-white/90 text-sm font-medium">
                      ✓ Limited Time Deal
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  onClick={openModal}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 px-6 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    🛒
                  </span>
                  <span>Place Order</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </motion.button>

                {/* AI Khna velidetions er kaj baki acha  */}

                {!isLoading && checkValue?.saved === false && (
                  <motion.button
                    onClick={bookaddYourWishList}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 px-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-orange-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Add to Wishlist
                  </motion.button>
                )}
                {!isLoading && checkValue?.saved === true && (
                  <button className="w-full py-2 px-6 rounded-2xl font-bold text-lg bg-green-600 text-white flex items-center justify-center gap-2 shadow-lg">
                    ✔ Already in Wishlist
                  </button>
                )}
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">🚚</div>
                  <p className="text-xs font-semibold text-gray-700">Fast</p>
                  <p className="text-xs text-gray-500">Delivery</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🔒</div>
                  <p className="text-xs font-semibold text-gray-700">100%</p>
                  <p className="text-xs text-gray-500">Secure</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">↩️</div>
                  <p className="text-xs font-semibold text-gray-700">Easy</p>
                  <p className="text-xs text-gray-500">Returns</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ===========================
               RIGHT - SIDEBAR
          =========================== */}
          <div className="lg:col-span-12 xl:col-span-3 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-500 to-pink-600 p-5 rounded-2xl shadow-xl text-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <GrLanguage size={20} />
                </div>
                <h3 className="font-bold text-lg">Language</h3>
              </div>
              <p className="text-white/90 font-semibold text-lg">
                {book?.language}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-2xl shadow-xl text-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <MdOutlinePublishedWithChanges size={20} />
                </div>
                <h3 className="font-bold text-lg">Publisher</h3>
              </div>
              <p className="text-white/90 font-semibold text-sm line-clamp-2">
                {book?.publisher}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-orange-500 to-red-600 p-5 rounded-2xl shadow-xl text-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-xl">
                  🏷️
                </div>
                <h3 className="font-bold text-lg">Tags</h3>
              </div>
              <p className="text-white/90 font-semibold text-sm">
                {book?.tags || "New Tags"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-blue-500 to-indigo-600 p-5 rounded-2xl shadow-xl text-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-xl">
                  ⚖️
                </div>
                <h3 className="font-bold text-lg">Weight</h3>
              </div>
              <p className="text-white/90 font-semibold text-lg">
                {book?.weight} gm
              </p>
            </motion.div>
          </div>
        </div>

        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
            <h2 className="text-3xl font-black text-gray-900">
              Book Description
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            {book?.description}
          </p>
        </motion.div>

        {/* Book Info & Seller Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Book Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">📚</span>
              <h2 className="text-2xl font-black text-gray-900">
                Book Details
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-5 rounded-2xl border border-blue-200/50">
                <div className="text-3xl mb-2">📄</div>
                <p className="text-xs text-gray-600 mb-1 font-medium">
                  Total Pages
                </p>
                <p className="text-2xl font-black text-blue-700">
                  {book?.page_count}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-5 rounded-2xl border border-purple-200/50">
                <div className="text-3xl mb-2">⚖️</div>
                <p className="text-xs text-gray-600 mb-1 font-medium">Weight</p>
                <p className="text-2xl font-black text-purple-700">
                  {book?.weight}g
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-5 rounded-2xl border border-green-200/50">
                <div className="text-3xl mb-2">📊</div>
                <p className="text-xs text-gray-600 mb-1 font-medium">Status</p>
                <p className="text-sm font-black text-green-700">
                  {book?.availability_status}
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-5 rounded-2xl border border-orange-200/50">
                <div className="text-3xl mb-2">📅</div>
                <p className="text-xs text-gray-600 mb-1 font-medium">
                  Listed On
                </p>
                <p className="text-sm font-black text-orange-700">
                  {new Date(book?.creatAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Seller Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">👤</span>
              <h2 className="text-2xl font-black text-gray-900">Seller Info</h2>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-gray-100 p-6 rounded-2xl border border-gray-200 mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={book?.sellerInfo?.sellerPhoto}
                    alt="Seller"
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg border-4 border-white"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-3 border-white shadow-lg"></div>
                </div>
                <div className="flex-1">
                  <p className="font-black text-gray-900 text-xl mb-1">
                    {book?.sellerInfo?.sellerName}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    {book?.sellerInfo?.sellerEmail}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6 rounded-2xl border-2 border-orange-200">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center text-2xl shadow-lg">
                  📦
                </div>
                <div className="flex-1">
                  <p className="font-black text-gray-900 mb-2 text-lg">
                    Return Policy
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {book?.return_policy}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* reviewer Card */}
        {reviewase.length === 0 ? (
          ""
        ) : (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-8 bg-gradient-to-b from-orange-600 to-red-500 rounded-full"></div>
              <h2 className="text-3xl  font-black  text-primary">
                <TextType
                  text={`User Ratings for Books to Guide Readers`}
                  typingSpeed={70}
                  deletingSpeed={40}
                  pauseDuration={2000}
                  loop={false}
                  showCursor={false}
                />
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4  gap-4 p-6">
              {/* Review Card */}
              {reviewase.map((review, i) => (
                <ReviewCard key={i} review={review}></ReviewCard>
              ))}
            </div>
          </div>
        )}
        {/* Related Books */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-8 bg-gradient-to-b from-violet-600 to-purple-600 rounded-full"></div>
            <h2 className="text-3xl  font-black   text-primary">
              <TextType
                text={"Related Category Books"}
                typingSpeed={70}
                deletingSpeed={40}
                pauseDuration={2000}
                loop={false}
                showCursor={false}
              />
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {relatedBooks.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Link
                  to={`/detlicesPages/${item._id}`}
                  className="group block bg-white rounded-3xl shadow-lg hover:shadow-2xl p-4 transition-all duration-300 border border-gray-100 hover:-translate-y-2"
                >
                  <div className="relative w-full aspect-[4/4] overflow-hidden rounded-2xl mb-4 bg-gray-100">
                    <img
                      src={item?.image}
                      alt={item?.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <span className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-full shadow-lg font-semibold">
                      {item.availability_status || "Available"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-bold line-clamp-2 group-hover:text-purple-600 transition-colors leading-tight">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      {item.author}
                    </p>
                    <p className="text-xs text-gray-400">{item.category}</p>

                    <div className="pt-2 border-t border-gray-100 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-black text-green-600">
                          ৳{item.price_sell}
                        </span>
                        <span className="text-xs line-through text-gray-400">
                          ৳{item.price_mrp}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400 text-sm">★</span>
                        <span className="text-xs font-semibold text-gray-700">
                          {item.rating_avg || 0} / 5
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center "
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 relative animate-in duration-300">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-200"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Please Complete Your Order
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Fill in your details to proceed
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handelSeawdg)} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700 text-sm">
                  <svg
                    className="w-4 h-4 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Your Name
                  <span className="text-red-500">*</span>
                </label>

                <input
                  {...register("name", { required: "Your Name is required" })}
                  type="text"
                  defaultValue={user?.displayName || ""}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-700 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all duration-200"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700 text-sm">
                  <svg
                    className="w-4 h-4 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Your Email
                  <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("email", { required: "Your Email is required" })}
                  type="email"
                  defaultValue={user?.email || ""}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-700 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all duration-200"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700 text-sm">
                  <svg
                    className="w-4 h-4 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Phone Number
                  <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  type="tel"
                  placeholder="e.g. 017XXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-700 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-200"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700 text-sm">
                  <svg
                    className="w-4 h-4 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Your Address
                  <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("address", {
                    required: "Please provide your address",
                  })}
                  type="text"
                  placeholder="Your full address"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-700 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-200"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-6 py-2 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Order Now
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Review */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={reviewRefe} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-gradient-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-200 shadow-2xl max-w-md">
          {/* Header Section */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-2xl text-gray-800 mb-2">
              Rate This Book
            </h3>
            <p className="text-sm text-gray-600">
              Share your thoughts with other readers
            </p>
          </div>

          {/* Rating Section */}
          <div className="bg-white rounded-2xl p-6 shadow-inner border border-amber-100">
            <form onSubmit={handerewiews}>
              <div className="flex flex-col items-center gap-4">
                <label className="text-gray-700 font-semibold text-base">
                  How would you rate it?
                </label>

                {/* Star Rating */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <label key={star} className="cursor-pointer group">
                      <input
                        type="radio"
                        name="rating"
                        value={star}
                        className="hidden peer"
                      />
                      <svg
                        className="w-10 h-10 transition-all duration-200 fill-gray-300 peer-checked:fill-amber-400 group-hover:fill-amber-300 group-hover:scale-110"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </label>
                  ))}
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Click on the stars to rate (1-5)
                </p>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn bg-gradient-to-r rounded-lg from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 mt-4 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Submit Review
                </button>
              </div>
            </form>
          </div>

          {/* Close Button */}
          <div className="modal-action mt-6">
            <form method="dialog">
              <button className="btn btn-ghost hover:bg-amber-100 border border-amber-200">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DetlicesPages;
