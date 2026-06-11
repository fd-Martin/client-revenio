import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function EditBookModal() {
  const modalRef = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // THEME STATE
  const [theme, setTheme] = useState("light");
  const [darkMode, setDarkMode] = useState(theme === "dark");

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    setDarkMode(theme === "dark");
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Sample data for demonstration
  const data = {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    publisher: "Publish",
    language: "English",
    category: "Programming",
    description: "A comprehensive guide to algorithms and data structures.",
    price_mrp: 99.99,
    price_sell: 79.99,
    stock_qty: 25,
    availability_status: "In Stock",
    page_count: 730,
    weight: 1200,
    rating_avg: 4,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400"
  };

  const handleEditForm = (formData) => {
    console.log('Form submitted:', formData);
    modalRef.current?.close();
  };

  const openModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <div className={`p-8 min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-orange-50 to-amber-50'}`}>
      {/* Trigger Button */}
      <div className="flex gap-4">
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Book
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={handleThemeToggle}
          className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all ${
            darkMode 
              ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-yellow-300' 
              : 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white'
          }`}
        >
          {darkMode ? (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
              Light Mode
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              Dark Mode
            </>
          )}
        </button>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} className="modal backdrop:bg-black/60 rounded-3xl max-w-6xl w-full p-0">
        <div className={`rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden transition-colors duration-300 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Modal Header */}
          <div className={`px-6 py-4 flex items-center justify-between ${
            darkMode 
              ? 'bg-gradient-to-r from-gray-700 to-gray-600' 
              : 'bg-gradient-to-r from-orange-600 to-orange-500'
          }`}>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Edit Book Information</h3>
            </div>
            <div className="flex items-center gap-2">
              {/* Theme Toggle in Modal */}
              <button
                onClick={handleThemeToggle}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => modalRef.current?.close()}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-6 py-8 sm:px-8">
            <form onSubmit={handleSubmit(handleEditForm)} encType="multipart/form-data">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                
                {/* Left Column */}
                <div className="space-y-5">
                  {/* Book Title */}
                  <div className="group">
                    <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      Book Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("title", { required: "Title is required" })}
                      type="text"
                      defaultValue={data.title}
                      className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                      }`}
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                  </div>

                  {/* Author */}
                  <div className="group">
                    <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      Author Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("author")}
                      type="text"
                      defaultValue={data.author}
                      className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                      }`}
                    />
                  </div>

                  {/* Publisher Status */}
                  <div className="group">
                    <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Publisher Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("publisher")}
                      className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                      }`}
                      defaultValue={data.publisher}
                    >
                      <option value="" disabled>Select Status</option>
                      <option value="Publish">Publish</option>
                      <option value="UnPublish">UnPublish</option>
                    </select>
                  </div>

                  {/* Language */}
                  <div className="group">
                    <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                      </svg>
                      Language
                    </label>
                    <select
                      {...register("language")}
                      className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                      }`}
                      defaultValue={data.language}
                    >
                      <option value="" disabled>Select Language</option>
                      <option value="Bangla">Bangla</option>
                      <option value="English">English</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div className="group">
                    <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      </svg>
                      Category
                    </label>
                    <select
                      {...register("category")}
                      className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                      }`}
                      defaultValue={data.category}
                    >
                      <option value="" disabled>Select Category</option>
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
                  </div>

                  {/* Page Count */}
                  <div className="group">
                    <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      Page Count
                    </label>
                    <input
                      {...register("page_count")}
                      type="number"
                      min={1}
                      defaultValue={data.page_count}
                      className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                      }`}
                    />
                  </div>

                  {/* Weight */}
                  <div className="group">
                    <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      Weight (grams)
                    </label>
                    <input
                      {...register("weight")}
                      type="number"
                      min={0}
                      defaultValue={data.weight}
                      className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                      }`}
                    />
                  </div>

                  {/* Description */}
                  <div className="group">
                    <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register("description")}
                      defaultValue={data.description}
                      rows="4"
                      placeholder="Short summary about the book..."
                      className={`w-full px-4 py-2.5 rounded-xl border-2 transition-all outline-none resize-none ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 placeholder:text-gray-400' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 placeholder:text-gray-500'
                      }`}
                    ></textarea>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  {/* Price MRP */}
                  <div className="group">
                    <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      Price (MRP) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-medium ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>$</span>
                      <input
                        {...register("price_mrp")}
                        type="number"
                        min={0}
                        step="0.01"
                        defaultValue={data.price_mrp}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border-2 transition-all outline-none ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50' 
                            : 'bg-white border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Selling Price */}
                  <div className="group">
                    <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <svg className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text