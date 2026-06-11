import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../shared/LoadingSpinner ";
import TextType from "../../../utils/TextType";
import { toast } from "sonner";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useAuth from "../../../hooks/useAuth";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const OrderAllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [allUser, setAllUser] = useState(0);
  const limit = 12;
  const skip = (page - 1) * limit;
  const totalPage = Math.ceil(allUser / limit);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["totalorderbooks", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `allcustomer-order?email=${user?.email}&limit=${limit}&skip=${skip}`,
      );
      setAllUser(res.data.counts || []);
      return res.data.result || [];
    },
  });

  // console.log(data);

  const handelUpdetNow = (status, id) => {
    axiosSecure.patch(`updetOrder/${id}?status=${status}`).then((res) => {
      refetch();
      // console.log(res.data);
    });
  };

  const handelDeliveryNow = (id) => {
    // console.log(id);

    handelUpdetNow("delivered", id);
    toast.success("Book Deliverd Successfully");
  };

  const handelShipedNow = (id) => {
    // console.log(id);

    handelUpdetNow("shipped", id);
    toast.success("Book Shipped Successfully");
  };

  if (isLoading || isFetching) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <h1 className=" text-2xl md:text-3xl leading-tight text-primary font-semibold">
        <TextType
          text={`Curstomer Order Info (${allUser || []})`}
          typingSpeed={70}
          deletingSpeed={40}
          pauseDuration={2000}
          loop={false}
          showCursor={false}
        />
      </h1>

      <div className=" px-6">
        <div className=" overflow-x-auto mt-10  rounded-box border border-base-300  shadow bg-base-100">
          <table className="table  ">
            <thead className=" bg-base-300">
              <tr>
                <th className="p-4">Srl</th>
                <th className="p-4">Book Image</th>
                <th className="p-4">Book Name </th>
                <th className="p-4">Book Price</th>
                <th className="p-4">Language</th>

                <th className="p-4">Customer Name</th>
                <th className="p-4">Customer Email</th>
                <th className="p-4">Customer Phone</th>

                <th className="p-4">Ordered Status</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4">Order Time</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="hover:bg-base-200">
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={item?.book?.image}
                      className="w-13 h-20"
                      alt="book"
                    ></img>
                  </td>

                  <td>
                    <div className="flex items-center gap-2 text-clip ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-purple-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                      {item.book.title}
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-semibold">
                        ৳ {item.book.price_sell}
                      </span>
                    </div>
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
                      {item.book.language}
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
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      {item.name}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-red-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      {item.email}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-green-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      {item.phoneNumber}
                    </div>
                  </td>

                  <td>
                    <div
                      className={`flex items-center gap-2 font-semibold ${
                        item.ordered_Status === "pending"
                          ? "text-orange-500"
                          : item.ordered_Status === "shipped"
                            ? "text-blue-500"
                            : "text-green-600"
                      }`}
                    >
                      {item.ordered_Status === "pending" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      ) : item.ordered_Status === "shipped" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="1" y="3" width="15" height="13" />
                          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                          <circle cx="5.5" cy="18.5" r="2.5" />
                          <circle cx="18.5" cy="18.5" r="2.5" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      )}
                      {item.ordered_Status}
                    </div>
                  </td>

                  <td>
                    <div
                      className={`flex items-center gap-2 font-semibold ${
                        item.payment_status === "unpaid"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {item.payment_status === "unpaid" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      {item.payment_status}
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
                      {new Date(item.orderTime).toLocaleString()}
                    </div>
                  </td>

                  <td className="p-4">
                    {item.payment_status === "unpaid" ? (
                      <span className=" text-red-500 font-semibold flex items-center gap-2">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>{" "}
                        Not pay
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        {item.ordered_Status === "pending" ? (
                          <button
                            onClick={() => handelShipedNow(item._id)}
                            className="bg-orange-500 hover:bg-[#cd5728] text-white font-semibold px-3 py-2 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition duration-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect x="1" y="3" width="15" height="13" />
                              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                              <circle cx="5.5" cy="18.5" r="2.5" />
                              <circle cx="18.5" cy="18.5" r="2.5" />
                            </svg>
                            Shipped
                          </button>
                        ) : item.ordered_Status === "shipped" ? (
                          <button
                            onClick={() => handelDeliveryNow(item._id)}
                            className="bg-green-600 hover:bg-green-600 text-white font-semibold px-3 py-2 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition duration-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            Delivered
                          </button>
                        ) : (
                          <span className="text-green-500">Compleate</span>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pasitions */}
      {data.length < 11 ? (
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
      ) : (
        " "
      )}
    </div>
  );
};

export default OrderAllBooks;
