import React, { useRef, useState } from "react";
import LoadingSpinner from "../../../shared/LoadingSpinner ";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TextType from "../../../utils/TextType";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import EditeForm from "./EditeForm";

const MyBooks = () => {
  const { user } = useAuth();
  const reafernc = useRef();
  const axiosSecure = useAxiosSecure();
  // Pasitions
  const [page, setPage] = useState(1);
  const [allUser, setAllUser] = useState(0);
  const limit = 12;
  const skip = (page - 1) * limit;
  const totalPage = Math.ceil(allUser / limit);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `liberin-add-books?email=${user?.email}&limit=${limit}&skip=${skip}`,
      );
      setAllUser(res.data.counts);
      return res.data.result;
    },
  });
  const [edit, setEdit] = useState({});
  const handelEditNow = (items) => {
    setEdit(items);
    reafernc.current.showModal();
  };

  if (isLoading || isFetching || !user?.email)
    return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <h1 className=" text-2xl md:text-3xl leading-tight text-primary font-semibold">
        <TextType
          text={` My Post All Books (${allUser})`}
          typingSpeed={70}
          deletingSpeed={40}
          pauseDuration={2000}
          loop={false}
          showCursor={false}
        />
      </h1>

      <div className=" px-6">
        <div className="overflow-x-auto mt-10  rounded-box border border-base-300  shadow bg-base-100">
          <table className="table  ">
            <thead className=" bg-base-300">
              <tr>
                <th className="p-4">Srl</th>
                <th className="p-4">Image</th>
                <th className="p-4">Language</th>
                <th className="p-4">Author</th>
                <th className="p-4">Publisher</th>
                <th className="p-4">Page Count</th>
                <th className="p-4"> Sell Price</th>
                <th className="p-4">Stock Qty</th>
                <th className="p-4">Weight</th>
                <th className="p-4">Rating Avg</th>
                <th className="p-4">Creat Time</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="hover:bg-base-200">
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={item?.image}
                      className="w-13 h-20"
                      alt="book"
                    ></img>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-blue-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      {item.language}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-purple-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      {item.author}
                    </div>
                  </td>
                  <td>
                    <div
                      className={`flex items-center gap-2 ${
                        item.publisher === "Publish"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                      {item.publisher}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-indigo-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        <path d="M8 7h8M8 11h6" />
                      </svg>
                      {item.page_count}
                    </div>
                  </td>
                  <td>
                    <div className=" gap-0 not-only:">
                      <span className="w-4 h-4 text-green-600">
                        ৳ {item.price_sell}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-amber-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                      {item.stock_qty || "0"}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {item.weight || "200"}g
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-yellow-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {item.rating_avg || 0} / 5
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-gray-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {new Date(item.creatAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className=" flex  items-center gap-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => handelEditNow(item)}
                        className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold px-3 py-2 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                      </button>

                      {/* Delete Button
                      <button
                        onClick={() => handelDeletNow(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-2 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                        Delete
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edite Er kaj Baki */}
      <dialog ref={reafernc} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-6xl">
          <EditeForm edit={edit} refetch={refetch} />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="flex items-center gap-2 bg-gradient-to-br from-orange-400 to-orange-600 
             text-white font-semibold px-6 py-2 rounded-xl hover:opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Pasitions */}
      <div className="flex justify-between items-center px-6 py-4 mt-7 bg-white  border-t border-gray-200 dark:border-gray-300 rounded-b-2xl">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`flex items-center gap-2 px-4 py-1 rounded-lg font-medium transition ${
            page === 1
              ? "text-gray-400 cursor-not-allowed bg-base-300"
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
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-50 hover:via-purple-50 hover:to-blue-50"
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
              ? "text-gray-400 cursor-not-allowed bg-base-300"
              : "bg-gradient-to-br from-orange-400 to-orange-600 text-white hover:opacity-90"
          }`}
        >
          Next <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};

export default MyBooks;
{
  /* Images Upload */
}
// <div className="border-2 border-dashed border-[#C2410C] rounded-2xl p-4 text-center bg-yellow-50 cursor-pointer hover:scale-105 transition">
//   <label className="cursor-pointer w-full block">
//     <input
//       {...register("images")}
//       type="file"
//       accept="image/*"
//       multiple
//       className="hidden"
//     />
//     <p className="font-semibold hover:underline text-[#C2410C] text-xs">
//       Click here to Edit book images (minimum 1)
//     </p>
//   </label>
// </div>

// {/* Current Image Preview */}
// {data.image && (
//   <div className="mt-4">
//     <label className="font-medium text-gray-800 block mb-2">
//       Current Image
//     </label>
//     <img
//       src={data.image}
//       alt={data.title}
//       className="w-32 h-32 object-cover rounded-lg border-2 border-orange-400"
//     />
//   </div>
// )}
