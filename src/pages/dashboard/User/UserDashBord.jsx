import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ShoppingCart,
  Package,
  CheckCircle,
  Clock,
  Truck,
  BookOpen,
  TrendingUp,
  Calendar,
  Link,
  CircleDollarSign,
} from "lucide-react";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { NavLink, useNavigate } from "react-router";
import LoadingSpinner from "../../../shared/LoadingSpinner ";
import CountUp from "react-countup";

const UserDashBord = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const naviget = useNavigate();
  const { data: userData, isLoading } = useQuery({
    queryKey: ["UserdashbordData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `userdashbordData?email=${user?.email}`,
      );
      return res.data;
    },
  });

  const [stats] = useState({
    totalOrders: userData?.totalOrder ?? 0,
    delivered: userData?.totalDeliveryuserBook ?? 0,
    pending: userData?.totalpendinguserBook ?? 0,
    shipped: userData?.totalshippeduserBook ?? 0,
    totalBooksRented: userData?.totalBooksRented ?? 0,
    activeRentals: 0,
  });

  // Order status distribution
  const statusData = [
    { status: "Delivered", value: stats.delivered, color: "#10b981" },
    { status: "Shipped", value: stats.shipped, color: "#3b82f6" },
    { status: "Pending", value: stats.pending, color: "#f59e0b" },
  ];

  const { data: newDatas } = useQuery({
    queryKey: ["userOrderDeliey", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`userOrderDeliey?email=${user?.email}`);
      return res.data;
    },
  });

  const orderHistory = (newDatas || [])?.map((item) => ({
    month: item?.day,
    orders: item?.totalOrders ?? 0,
  }));

  const { data: paymentChart } = useQuery({
    queryKey: ["userDeleyPaymentCOunts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `userDeleyPaymentCOunts?email=${user?.email}`,
      );
      return res.data;
    },
  });

  const paymentOrderHistory = (paymentChart || [])?.map((item) => ({
    day: item.day,
    totalPayments: item.totalPayments,
    totalAmount: item.totalAmount,
  }));

  const { data: orderCard } = useQuery({
    queryKey: ["orderUserLetest6Data", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `orderUserLetest6Data?email=${user?.email}`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    bgColor,
    iconColor,
    badge,
  }) => (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1 truncate">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
            <CountUp start={0} end={value} duration={2} /> +
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1 truncate">{subtitle}</p>
          )}
        </div>
        <div className="relative">
          <div
            className={`${bgColor} p-3 sm:p-4 rounded-full flex-shrink-0 ml-2`}
          >
            <Icon className={`${iconColor} w-6 h-6 sm:w-8 sm:h-8`} />
          </div>
          {badge && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-xl shadow-2xl border border-slate-700 backdrop-blur-sm">
          <p className="text-slate-200 font-semibold text-sm mb-2 border-b border-slate-600 pb-2">
            {payload[0].payload.day}
          </p>
          {payload.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 mt-1"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full shadow-lg"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-slate-300 text-xs font-medium">
                  {entry.name}
                </span>
              </div>
              <span className="text-white font-bold text-sm">
                {entry.name === "Amount" ? `৳ ${entry.value}` : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const gradientColors = ["url(#colorPayments)", "url(#colorAmount)"];

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">
            User Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Track your book rentals and orders
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <StatCard
            icon={ShoppingCart}
            title="Total Orders"
            value={stats?.totalOrders}
            subtitle="All time orders"
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            icon={CheckCircle}
            title="Delivered"
            value={stats?.delivered}
            subtitle="Successfully received"
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            icon={Truck}
            title="Shipped"
            value={stats.shipped}
            subtitle="On the way"
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
            badge={stats.shipped > 0 ? stats.shipped : null}
          />
          <StatCard
            icon={Clock}
            title="Pending"
            value={stats.pending}
            subtitle="Being processed"
            bgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Order History Chart */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
              Order History
            </h2>
            <div className="w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height={250} minWidth={300}>
                <BarChart data={orderHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar
                    dataKey="orders"
                    fill="#3b82f6"
                    name="Orders"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order Status Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
              Order Status
            </h2>
            <div className="w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height={250} minWidth={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ status, value }) => `${status}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Active Rentals & Quick Stats */}
        <div className="sm:gap-6 mb-6 sm:mb-8">
          {/* Active Rentals Card */}
          <div className="w-full p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-md">
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Payment Analytics
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Weekly overview of payments and revenue
              </p>
            </div>

            <div className="w-full overflow-x-auto bg-white rounded-xl p-4">
              <ResponsiveContainer width="100%" height={300} minWidth={300}>
                <BarChart
                  data={paymentOrderHistory}
                  margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                  barGap={8}
                >
                  <defs>
                    <linearGradient
                      id="colorPayments"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#4f46e5"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorAmount"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#f97316" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#ea580c"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    vertical={false}
                    strokeOpacity={0.5}
                  />

                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fill: "#64748b", fontWeight: 600 }}
                    axisLine={{ stroke: "#cbd5e1" }}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "#f1f5f9", opacity: 0.3 }}
                  />

                  <Bar
                    dataKey="totalPayments"
                    fill="url(#colorPayments)"
                    name="Payments"
                    radius={[8, 8, 0, 0]}
                    barSize={32}
                  />

                  <Bar
                    dataKey="totalAmount"
                    fill="url(#colorAmount)"
                    name="Amount"
                    radius={[8, 8, 0, 0]}
                    barSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 flex gap-4 justify-center">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg"></div>
                <span className="text-sm font-semibold text-slate-700">
                  Payments
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg"></div>
                <span className="text-sm font-semibold text-slate-700">
                  Amount
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                    Srl
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                    Book Name
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600 hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderCard.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-800">
                      {index + 1}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-800">
                      # {order._id}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-600 truncate max-w-xs">
                      {order.book?.title}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                      {new Date(order?.orderTime).toLocaleString()}
                      {/* {order.date} */}
                    </td>

                    <td>
                      <div
                        className={`flex items-center gap-2 font-semibold ${
                          order.ordered_Status === "pending"
                            ? "text-orange-500"
                            : order.ordered_Status === "shipped"
                              ? "text-blue-500"
                              : "text-green-600"
                        }`}
                      >
                        {order.ordered_Status === "pending" ? (
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
                        ) : order.ordered_Status === "shipped" ? (
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
                        {order.ordered_Status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <button
            onClick={() => naviget("/books")}
            className="bg-orange-400 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Browse Books
          </button>
          <button
            onClick={() => naviget("/deshbord/userorder")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <Package className="w-5 h-5 mr-2" />
            Yours Orders
          </button>
          <button
            onClick={() => naviget("/deshbord/paymenthistory")}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center sm:col-span-2 lg:col-span-1"
          >
            <CircleDollarSign className="w-5 h-5 mr-2" />
            Payment History
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashBord;
