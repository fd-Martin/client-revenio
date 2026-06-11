import React from "react";
import { useForm } from "react-hook-form";
import { imagesBB } from "../../../features/imagesUp";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "sonner";
import TextType from "../../../utils/TextType";
import { GiSpellBook } from "react-icons/gi";
import { useNavigate } from "react-router";

const AddBookLibery = () => {
  const naviget = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const handleBook = async (book) => {
    // console.log("ADdd");
    //
    const bookImage = book.images[0];
    const photo = await imagesBB(bookImage);
    const savedDatabase = {
      author: book.author,
      availability_status: book.availability_status,
      category: book.category,
      description: book.description,
      image: photo,
      language: book.language,
      page_count: book.page_count,
      price_mrp: book.price_mrp,
      price_sell: book.price_sell,
      publisher: book.publisher,
      rating_avg: Number(book.rating_avg),
      return_policy: book.return_policy,
      stock_qty: book.stock_qty,
      title: book.title,
      weight: Number(book.weight),
      sellerInfo: {
        sellerName: user?.displayName,
        sellerEmail: user?.email,
        sellerPhoto: user?.photoURL,
      },
    };

    axiosSecure.post("book", savedDatabase).then((res) => {
      toast.success("Books Creat Successfully");
      naviget("/deshbord/myBooks");
      // console.log(res.data);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-5xl lg:text-6xl">📚</span>
          </div>
          <h1 className="text-3xl sm:text-4xl  font-bold bg-gradient-to-r from-orange-700 via-orange-500 to-orange-400 bg-clip-text text-transparent mb-4">
            Add New Book for Sale
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Fill in the complete book details below to list your book
          </p>
          <div className="mt-6 h-1.5 w-24 mx-auto rounded-full bg-gradient-to-r from-orange-700 to-orange-400"></div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Book Title */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Book Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("title", {
                      required: "Book title is required",
                    })}
                    type="text"
                    placeholder="Introduction to Algorithms"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Author */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("author", {
                      required: "Author name is required",
                    })}
                    type="text"
                    placeholder="Thomas H. Cormen"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                  />
                  {errors.author && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.author.message}
                    </p>
                  )}
                </div>

                {/* Publisher Status */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Publisher Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("publisher", {
                      required: "Please Set Book Status",
                    })}
                    className="select h-13 w-full px-4  rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Book Status
                    </option>
                    <option value="Publish">Publish</option>
                    <option value="UnPublish">UnPublish</option>
                  </select>
                  {errors.publisher && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.publisher.message}
                    </p>
                  )}
                </div>

                {/* Language */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("language", {
                      required: "Language is required",
                    })}
                    className="w-full px-4 select h-13 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Language
                    </option>
                    <option value="Bangla">Bangla</option>
                    <option value="English">English</option>
                  </select>
                  {errors.language && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.language.message}
                    </p>
                  )}
                </div>

                {/* Rating */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border-2 border-orange-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Average Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label key={star} className="cursor-pointer">
                        <input
                          type="radio"
                          value={star}
                          {...register("rating_avg")}
                          className="sr-only peer"
                        />
                        <svg
                          className="w-8 h-8 text-gray-300 peer-checked:text-amber-400 hover:text-amber-300 transition-colors"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Select a rating from 1 to 5 stars
                  </p>
                </div>

                {/* Category */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="select h-13 w-full px-4  rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="Programming">Programming</option>
                    <option value="Academic">Academic</option>
                    <option value="Novel">Novel</option>
                    <option value="Story">Story</option>
                    <option value="Business">Business</option>
                    <option value="Religious">Religious</option>
                    <option value="Self-Help">Self-Help</option>
                    <option value="History">History</option>
                    <option value="Poetry">Poetry</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    placeholder="Short summary about the book..."
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none resize-none"
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Page Count */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Page Count <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("page_count", {
                      required: "Page count is required",
                      valueAsNumber: true,
                    })}
                    type="number"
                    min={1}
                    placeholder="730"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                  />
                  {errors.page_count && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.page_count.message}
                    </p>
                  )}
                </div>

                {/* Weight */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Weight (grams)
                  </label>
                  <input
                    {...register("weight", {
                      required: "Please Provide Book Weight",
                    })}
                    type="number"
                    min={0}
                    step={0.01}
                    placeholder="e.g. 500"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.weight.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Price MRP */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      $
                    </span>
                    <input
                      {...register("price_mrp", {
                        required: "MRP price is required",
                        valueAsNumber: true,
                      })}
                      type="number"
                      min={0}
                      placeholder="Set Price"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    />
                  </div>
                  {errors.price_mrp && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.price_mrp.message}
                    </p>
                  )}
                </div>

                {/* Selling Price */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Selling Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      $
                    </span>
                    <input
                      {...register("price_sell", {
                        required: "Selling price is required",
                        valueAsNumber: true,
                      })}
                      type="number"
                      min={0}
                      placeholder="Selling price"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    />
                  </div>
                  {errors.price_sell && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.price_sell.message}
                    </p>
                  )}
                </div>

                {/* Stock Quantity */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("stock_qty", {
                      required: "Stock quantity is required",
                      valueAsNumber: true,
                    })}
                    type="number"
                    min={0}
                    placeholder="12"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                  />
                  {errors.stock_qty && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.stock_qty.message}
                    </p>
                  )}
                </div>

                {/* Availability Status */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("availability_status", {
                      required: "Availability status is required",
                    })}
                    className="select h-13 w-full seclet px-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                  {errors.availability_status && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.availability_status.message}
                    </p>
                  )}
                </div>

                {/* Return Policy */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Return Policy
                  </label>
                  <textarea
                    {...register("return_policy")}
                    defaultValue="Customers can return the book within 7 days of receiving it"
                    readOnly
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-600 outline-none resize-none"
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Book Images <span className="text-red-500">*</span>
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-orange-300 rounded-xl cursor-pointer bg-gradient-to-br from-orange-50 to-amber-50 hover:bg-orange-100 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-12 h-12 mb-3 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-orange-700 font-semibold">
                        Click to upload book images
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG (MIN. 1 image)
                      </p>
                    </div>
                    <input
                      {...register("images", { required: true })}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                  </label>
                  {errors.images && (
                    <p className="text-red-500 text-sm mt-1.5">
                      Please upload at least one image
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit(handleBook)}
                  type="button"
                  className="group  w-full mt-8 justify-center flex items-center gap-2 py-2 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <GiSpellBook className="group-hover:animate-bounce w-5 h-5" />
                  Publish Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookLibery;
