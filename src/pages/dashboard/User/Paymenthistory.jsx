import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TextType from "../../../utils/TextType";
import LoadingSpinner from "../../../shared/LoadingSpinner ";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Pasitions
  const [page, setPage] = useState(1);
  const [allUser, setAllUser] = useState(0);
  const limit = 12;
  const skip = (page - 1) * limit;
  const totalPage = Math.ceil(allUser / limit);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `paymentChack?email=${user?.email}&limit=${limit}&skip=${skip}`,
      );
      setAllUser(res.data.counts || []);
      return res?.data?.result || [];
    },
  });
  // console.log(data);

  if (isLoading || isFetching || !user?.email)
    return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <h1 className=" text-2xl md:text-3xl leading-tight text-primary font-semibold">
        <TextType
          text={` Payment History`}
          typingSpeed={70}
          deletingSpeed={40}
          pauseDuration={2000}
          loop={false}
          showCursor={false}
        />
      </h1>

      <div className="mt-10 w-full overflow-x-auto">
        <div className="min-w-[1200px] bg-white shadow-6xl rounded-2xl border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-100 border-b border-gray-300">
            <table className="table w-full">
              <thead className=" bg-base-300">
                <tr>
                  <th className="p-4">Srl</th>
                  <th className="p-4 ">Book Name</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Currency</th>
                  <th className="p-4">Customer Email</th>
                  <th className="p-4">Tracking ID</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Payment Status</th>
                  <th className="p-4">Paid At</th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Table Body */}
          <div className="max-h-[600px] overflow-y-auto">
            <table className="table w-full">
              <tbody>
                {data.map((item, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 transition-all border-b border-gray-100"
                  >
                    {/* Serial */}
                    <td className="p-4 font-medium text-gray-700">{i + 1}</td>

                    {/* Book Name */}
                    <td className="p-4">
                      <div className="flex items-center gap-2 font-semibold text-gray-800">
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
                        {item?.bookName}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="p-4">
                      <div className=" gap-0 not-only:">
                        <span className="w-4 h-4 text-green-600">
                          ৳ {item?.amount}
                        </span>
                      </div>
                    </td>

                    {/* Currency */}
                    <td className="p-4">
                      <div className="flex items-center gap-2 uppercase text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-blue-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M2 12h20" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        {item?.currency}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-700">
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
                        {item?.customerEmail}
                      </div>
                    </td>

                    {/* Tracking ID */}
                    <td className="p-4">
                      <div className="flex items-center gap-2 font-mono text-blue-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-blue-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        {item?.trakingId}
                      </div>
                    </td>

                    {/* Transaction */}
                    <td className="p-4">
                      <div className="flex items-center gap-2 font-mono text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-indigo-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="12" x2="14" y2="14" />
                          <polyline points="22 4 12 14 9 11" />
                        </svg>
                        {item?.transactionId}
                      </div>
                    </td>

                    {/* Payment Status */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {item.paymentStatus === "paid" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-green-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-red-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                          </svg>
                        )}
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold
            ${
              item.paymentStatus === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
                        >
                          {item.paymentStatus}
                        </span>
                      </div>
                    </td>

                    {/* Paid At */}
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
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
                        {new Date(item?.paidAt).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default PaymentHistory;
