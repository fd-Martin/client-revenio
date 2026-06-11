import React, { useState } from "react";
import TextType from "../../../utils/TextType";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../shared/LoadingSpinner ";
import { FiCreditCard } from "react-icons/fi";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const UserOrderTable = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // Pasitions
  const [page, setPage] = useState(1);
  const [allUser, setAllUser] = useState(0);
  const limit = 12;
  const skip = (page - 1) * limit;
  const totalPage = Math.ceil(allUser / limit);

  const {
    data: orders,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `orderlist?email=${user?.email}&limit=${limit}&skip=${skip}`,
      );
      // console.log(res.data);

      setAllUser(res.data.counts || []);
      return res?.data?.result || [];
    },
  });

  // console.log(orders);
  // console.log(user?.email);

  const handelcancel = (id) => {
    Swal.fire({
      title: "Confirm Book Deletion",
      text: `Are you sure you want to delete this book? This action cannot be undone.`,
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
          "bg-red-500 ml-4 bg-gradient-to-br from-orange-400 to-orange-600 text-white  font-semibold px-6 py-2 rounded-xl",
      },

      buttonsStyling: false,
      backdrop: `rgba(0,0,0,0.45)`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`deletbook/${id}`)
          .then((res) => {
            // task query propley refetch delet data
            refetch();
            // console.log("Propley Delet Now", res);
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

  const handelPaymentSession = (orderData) => {
    // console.log("Order Books", orderData);

    const bookInfo = {
      customerName: orderData.name,
      bookID: orderData?._id,
      customerEmail: orderData.email,
      customerAddress: orderData.address,
      customerPhoneNumber: orderData.phoneNumber,
      trakingId: orderData?.trakingId,

      // Book Mapping
      bookTitle: orderData.book.title,
      bookImage: orderData.book.image,
      bookAuthor: orderData.book.author,
      bookPrice: orderData.book.price_sell,

      //  Changes korci ai khna actay
      sellerName: orderData?.book?.sellerInfo?.sellerName,
      sellerEmail: orderData?.book?.sellerInfo?.sellerEmail,

      // Status
      orderStatus: orderData.ordered_Status,
      paymentStatus: orderData.payment_status,
    };

    axiosSecure.post(`creat-payment-session`, bookInfo).then((res) => {
      window.location.assign(res.data.url);
      // console.log(res);
    });
  };
  if (isLoading || isFetching || !user?.email) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div>
      <h1 className=" text-2xl md:text-3xl leading-tight text-primary font-semibold">
        <TextType
          text={` My All Order List`}
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
                <th className="p-4">Buyer Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Address</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Book Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Ordered Status</th>
                {/* <th className="p-4">Delivery Time</th> */}
                <th className="p-4">Payment Status</th>
                <th className="p-4">Order Time</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((item, i) => (
                <tr key={i} className="hover:bg-base-200">
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={item?.book?.image}
                      className="w-10 h-15"
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
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {item.address}
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
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      0{item.phoneNumber}
                    </div>
                  </td>

                  {/* Book Info */}
                  <td>
                    <div
                      className="flex items-center gap-2 text-wrap
"
                    >
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
                      {item.book?.title}
                    </div>
                  </td>
                  <td>
                    <div className=" gap-0 ">
                      <span className="w-4 h-4 text-green-600 flex items-center">
                        {`৳ ${item.book?.price_sell}`}
                      </span>
                    </div>
                  </td>

                  {/* Order + Payment */}

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

                  <td
                    className={`font-semibold ${
                      item.payment_status === "unpaid"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {item.payment_status === "unpaid" ? (
                      <button
                        onClick={() => handelPaymentSession(item)}
                        className="bg-green-500 text-white font-semibold px-3 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-green-600 hover:shadow-lg transition duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="1"
                            y="4"
                            width="22"
                            height="16"
                            rx="2"
                            ry="2"
                          />
                          <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                        Pay Now
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
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
                        {item.payment_status}
                      </div>
                    )}
                  </td>

                  {/* Order Time */}
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

                  <td
                    className={`font-semibold ${
                      item.payment_status === "unpaid"
                        ? "text-red-500"
                        : "text-red-600"
                    }`}
                  >
                    {item.payment_status === "unpaid" ? (
                      <button
                        onClick={() => handelcancel(item._id)}
                        className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md  hover:shadow-lg transition duration-300 flex items-center gap-2"
                      >
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
                        Cancel
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                        No Try
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

export default UserOrderTable;
