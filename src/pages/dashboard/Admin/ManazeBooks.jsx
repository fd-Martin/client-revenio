import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../shared/LoadingSpinner ";
import Swal from "sweetalert2";
import { toast } from "sonner";
import useAuth from "../../../hooks/useAuth";
import TextType from "../../../utils/TextType";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const ManazeBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Pasitionse
  const [page, setPage] = useState(1);
  const [allUser, setAllUser] = useState(0);
  const limit = 10;
  const skip = (page - 1) * limit;
  const totalPage = Math.ceil(allUser / limit);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["allbooksdatafind", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `allbooksdatafind?email=${user?.email}&limit=${limit}&skip=${skip}`,
      );
      // console.log(res.data);
      setAllUser(res.data.counts);
      return res.data.result || [];
    },
  });
  // console.log(data);

  const handelDeletNow = (items) => {
    // console.log(items);
    Swal.fire({
      title: `Confirm Delete ${items?.title} This Book`,
      text: `Are you sure you want to delete this book ? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, Cancel",

      customClass: {
        popup: "rounded-2xl shadow-xl",
        title: "text-lg font-semibold text-gray-800",
        htmlContainer: "text-gray-600",
        actions: "flex gap-3 justify-end",
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl",
        cancelButton:
          "bg-gradient-to-br from-orange-400 to-orange-600 text-white hover:opacity-90 font-semibold px-6 py-2 rounded-xl",
      },

      buttonsStyling: false,
      backdrop: `rgba(0,0,0,0.45)`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`deletLiberyanBooks/${items?._id}`)
          .then((res) => {
            refetch();
            toast.success("Delet Now");
          })
          .catch((err) => {
            toast.warning(err?.code);
          });
        Swal.fire({
          icon: "success",
          title: "Book Successfully Deleted",
          text: "Your Book has been Deletd Proprely .",
          confirmButtonText: "OK",
          customClass: {
            popup: "rounded-2xl shadow-lg",
            title: "text-lg font-bold text-green-700",
            htmlContainer: "text-gray-700",
            confirmButton:
              "bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl",
          },
          buttonsStyling: false,
        });
      }
    });
  };

  const handelALlStatuse = async (publisher, id) => {
    // console.log(publisher, id);
    const res = await axiosSecure.patch(`updeatAdminAcrions/${id}`, {
      publisher: publisher,
    });
    toast.success(`Succes Publisher Statuse in ${publisher}`);
    refetch();
    // console.log(res.data);
  };

  const handelpublish = (id) => {
    handelALlStatuse("Publish", id);
    // console.log("This is Publish Button", id);
  };
  const handelUnpublish = (id) => {
    handelALlStatuse("UnPublish", id);

    // console.log("This is UnPublish Button", id);
  };

  if (isFetching || isLoading) return <LoadingSpinner />;
  return (
    <div>
      <h1 className=" text-2xl md:text-3xl leading-tight text-primary font-semibold">
        <TextType
          text={` All Books (${allUser})`}
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
                <th className="p-4">Sell Price</th>
                <th className="p-4">Category</th>
                <th className="p-4">Availability Status</th>
                <th className="p-4">Stock Qty</th>
                <th className="p-4">Weight</th>
                {/* <th className="p-4">Rating Avg</th> */}
                <th className="p-4">Creat Time</th>
                <th className="p-4">Actions</th>
                <th className="p-4">Admin Set</th>
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

                  {/* Changes */}
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
                      </svg>
                      <span className="text-indigo-600 font-medium">
                        {item.category}
                      </span>
                    </div>
                  </td>

                  {/* Availability Status */}
                  <td>
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                          item.availability_status === "In Stock"
                            ? "bg-green-100 text-green-600"
                            : item.availability_status === "Out Of Stock"
                              ? "bg-red-100 text-red-600"
                              : "bg-red-100 text-red-600"
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
                          {item.availability_status === "available" ? (
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" />
                          ) : item.availability_status === "borrowed" ? (
                            <>
                              <circle cx="12" cy="12" r="10" />
                              <line x1="15" y1="9" x2="9" y2="15" />
                              <line x1="9" y1="9" x2="15" y2="15" />
                            </>
                          ) : (
                            <>
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="12" />
                              <line x1="12" y1="16" x2="12.01" y2="16" />
                            </>
                          )}
                        </svg>
                        {item.availability_status}
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
                  {/* <td>
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
                  </td> */}
                  <td>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-600"
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
                  <td>
                    <div className=" flex  items-center gap-2">
                      {/* Delete Button */}
                      <button
                        onClick={() => handelDeletNow(item)}
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
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                  <td className=" ">
                    <div className="flex flex-col gap-1">
                      {item.publisher === "Publish" ? (
                        <button
                          onClick={() => handelUnpublish(item._id)}
                          className="flex items-center gap-2  px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md transition"
                        >
                          {/* X Mark SVG */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Unpublish
                        </button>
                      ) : (
                        <button
                          onClick={() => handelpublish(item._id)}
                          className="flex items-center gap-2  px-3 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md transition"
                        >
                          {/* Checkmark SVG */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Publish
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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

export default ManazeBooks;
