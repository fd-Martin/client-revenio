import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  CheckCircle,
  CreditCard,
  Mail,
  DollarSign,
  Hash,
  Receipt,
  ArrowLeft,
} from "lucide-react";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState({});
  const [searchParems] = useSearchParams();
  const sessionId = searchParems.get("session_id");
  // console.log(searchParems.get("session_id"));

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`success-payment?sessionID=${sessionId}`)
        .then((res) => {
          // console.log(res.data);
          setData(res.data);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <div
        className="
  max-w-xl 
  mx-auto 
  shadow-2xl 
  rounded-3xl 
  p-5 
  md:p-8 
  mt-8 
  md:mt-12 
  border 
  border-gray-200
"
      >
        {/* Success Header */}
        <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-6">
          <CheckCircle className="text-green-600 w-7 h-7 md:w-9 md:h-9" />
          <h2 className="text-xl md:text-3xl font-bold text-gray-900">
            Payment Successful!
          </h2>
        </div>

        {/* Gradient Badge */}
        <div
          className="
    bg-gradient-to-r 
    from-green-500 
    to-emerald-600 
    text-white 
    p-2.5 
    md:p-3 
    rounded-xl 
    text-center 
    shadow-md 
    mb-5 
    md:mb-6
  "
        >
          <p className="text-xs md:text-sm font-medium">
            Your payment has been processed securely
          </p>
        </div>

        {/* Info Boxes */}
        <div className="space-y-4 md:space-y-5">
          <div className="flex items-center gap-3 bg-gray-50 p-4 border-base-300 rounded-xl border hover:bg-gray-100 transition-all">
            <DollarSign className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
            <div>
              <p className="text-gray-500 text-xs md:text-sm">Amount Paid</p>
              <p className="font-semibold text-gray-900 text-sm md:text-base">
                ৳{data?.amount}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border-base-300 border hover:bg-gray-100 transition-all">
            <Mail className="text-purple-600 w-5 h-5 md:w-6 md:h-6" />
            <div>
              <p className="text-gray-500 text-xs md:text-sm">Email</p>
              <p className="font-semibold text-gray-900 text-sm md:text-base">
                {data?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border-base-300 border hover:bg-gray-100 transition-all">
            <CreditCard className="text-pink-600 w-5 h-5 md:w-6 md:h-6" />
            <div>
              <p className="text-gray-500 text-xs md:text-sm">Payment Method</p>
              <p className="font-semibold text-gray-900 text-sm md:text-base">
                {data?.method}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border-base-300 border hover:bg-gray-100 transition-all">
            <Receipt className="text-orange-600 w-5 h-5 md:w-6 md:h-6" />
            <div>
              <p className="text-gray-500 text-xs md:text-sm">Tracking ID</p>
              <p className="font-semibold text-gray-900 text-sm md:text-base">
                {data?.trakingId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border-base-300 border hover:bg-gray-100 transition-all">
            <Hash className="text-red-600 w-5 h-5 md:w-6 md:h-6" />
            <div>
              <p className="text-gray-500 text-xs md:text-sm">Transaction ID</p>
              <p className="font-semibold text-gray-900 text-sm md:text-base">
                {data?.transactionId}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 md:mt-10 flex justify-start">
          <Link
            to="/deshbord/paymenthistory"
            className="
        flex 
        items-center 
        gap-1.5 
        md:gap-2 
        bg-gradient-to-br from-orange-400 to-orange-600
        text-white 
        px-4 
        py-2 
        md:px-5 
        md:py-2.5 
        rounded-full 
        text-xs 
        md:text-sm 
        font-medium 
        transition-all 
        shadow-md
      "
          >
            <ArrowLeft className="w-4 h-4" />
            Go Payment History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
