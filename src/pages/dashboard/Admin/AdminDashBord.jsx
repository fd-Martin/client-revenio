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
import { GiSpellBook } from "react-icons/gi";

import { CiDeliveryTruck } from "react-icons/ci";

import { CiClock2 } from "react-icons/ci";
import { CheckCircle2, Wallet } from "lucide-react";

import {
  Users,
  BookOpen,
  TrendingUp,
  Package,
  CheckCircle,
  Clock,
  DollarSign,
  Menu,
  OctagonAlert,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../shared/LoadingSpinner ";
import { GiBookPile } from "react-icons/gi";

import { GiBookAura } from "react-icons/gi";
import CountUp from "react-countup";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { data: admin } = useQuery({
    queryKey: ["adminDeshbordData"],
    queryFn: async () => {
      const res = await axiosSecure.get("admindeshborderdata");
      return res.data;
    },
  });
  const stats = {
    totalUsers: admin?.userCounts ?? 0,
    totalBooks: admin?.allBookCount ?? 0,
    totalRented: admin?.paymentCount ?? 0,
    totalDelivered: admin?.deliveryCount ?? 0,
    pendingDelivery: admin?.pendingBooks ?? 0,
    shipdemendCOunts: admin?.shippedCount ?? 0,
    paymentUnpaid: admin?.paymentUnpaid ?? 0,
    publishBooks: admin?.publishBooks ?? 0,
    unpublishBooks: admin?.unpublishBooks ?? 0,
    revenue: 45280,
  };

  const { data: creat } = useQuery({
    queryKey: ["registeruserData"],
    queryFn: async () => {
      const res = await axiosSecure.get("userCreatTimeALlfind");
      return res.data;
    },
  });

  // Convert creat array to chart-friendly format
  const monthlyData = creat?.map((item) => ({
    month: item.date,
    users: item.userCount,
    books: item.bookCount,
    rented: item.books,
  }));

  const categoryData = [
    { name: "Programming", value: 1250, color: "#3b82f6" }, // Blue
    { name: "Academic", value: 890, color: "#10b981" }, // Green
    { name: "Novel", value: 645, color: "#f59e0b" }, // Amber
    { name: "Story", value: 520, color: "#8b5cf6" }, // Purple

    // Previously duplicated colors — now fixed:
    { name: "Business", value: 284, color: "#ef4444" }, // Red
    { name: "Religious", value: 284, color: "#06b6d4" }, // Cyan
    { name: "Self-Help", value: 284, color: "#a855f7" }, // Violet
    { name: "Other", value: 284, color: "#14b8a6" }, // Teal
  ];

  // Delivery status
  const deliveryData = [
    { status: "Delivered", value: stats.totalDelivered, color: "#10b981" },
    { status: "Pending", value: stats.pendingDelivery, color: "#f59e0b" },
  ];

  const { data: collections } = useQuery({
    queryKey: ["resentBooksUserOrderCollections"],
    queryFn: async () => {
      const res = await axiosSecure.get("resentBooksUserOrderCollections");
      return res.data;
    },
  });

  const { data: paymentAmount } = useQuery({
    queryKey: ["tatalPaymentAllBooks"],
    queryFn: async () => {
      const res = await axiosSecure.get("tatalPaymentAllBooks");
      return res.data;
    },
  });

  // console.log(paymentAmount);

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    bgColor,
    iconColor,
  }) => (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1 truncate">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {/* {value !== undefined && value !== null && (
              <CountUp start={0} end={value} duration={2} />
            )} */}
            <CountUp
              start={0}
              end={Number(value.toLocaleString()) || 0}
              duration={5}
            />
            +
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1 truncate">{subtitle}</p>
          )}
        </div>
        <div
          className={`${bgColor} p-3 sm:p-4 rounded-full flex-shrink-0 ml-2`}
        >
          <Icon className={`${iconColor} w-6 h-6 sm:w-8 sm:h-8`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">
            Admin Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Complete statistics of your book rental business
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <StatCard
            icon={Users}
            title="Total Users"
            value={stats.totalUsers}
            subtitle="Registered Accounts"
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            icon={BookOpen}
            title="Total Books"
            value={stats.totalBooks}
            subtitle="In Collection"
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            icon={TrendingUp}
            title="Payment Success"
            value={stats.totalRented}
            subtitle={`Pending: ${stats.pendingDelivery}`}
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            icon={OctagonAlert}
            title="Payment Unpaid"
            value={stats.pendingDelivery}
            subtitle={`Pending: ${stats.pendingDelivery}`}
            bgColor="bg-red-100"
            iconColor="text-red-600"
          />
          <StatCard
            icon={CheckCircle}
            title="Delivered"
            value={stats.totalDelivered}
            subtitle={`Pending: ${stats.pendingDelivery}`}
            bgColor="bg-emerald-100"
            iconColor="text-emerald-600"
          />
          <StatCard
            icon={CiDeliveryTruck}
            title="Shipped"
            value={stats.shipdemendCOunts}
            subtitle={`Pending: ${stats.shipdemendCOunts}`}
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            icon={CiClock2}
            title="Pending"
            value={stats.pendingDelivery}
            subtitle={`Pending: ${stats.pendingDelivery}`}
            bgColor="bg-red-100"
            iconColor="text-red-600"
          />

          <StatCard
            icon={GiSpellBook}
            title="Publish Books"
            value={stats.publishBooks}
            subtitle={` UnPublish Books: ${stats.unpublishBooks}`}
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            icon={GiBookAura}
            title=" UnPublish Books"
            value={stats.unpublishBooks}
            subtitle={`Publish Books: ${stats.publishBooks}`}
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            icon={GiBookPile}
            title="Total Category"
            value={11}
            subtitle={`Category Total : ${11}`}
            bgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Monthly Growth Chart */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
              Monthly Growth
            </h2>
            <div className="w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height={250} minWidth={300}>
                <LineChart data={monthlyData}>
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
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="New Users"
                  />
                  <Line
                    type="monotone"
                    dataKey="Books"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Books"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Book Categories Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
              Book Categories
            </h2>
            <div className="w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height={250} minWidth={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Revenue and Delivery Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Monthly Revenue Bar Chart */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-5">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
              Daily Added Books
            </h2>
            <div className="w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height={250} minWidth={300}>
                <BarChart data={monthlyData}>
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
                    dataKey="books" // <-- show added books per day
                    fill="#10b981" // green color for added books
                    name="Added Books" // updated label
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-7">
            {/* Revenue Card */}
            {/* Revenue Card */}
            <div className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-xl p-6 shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
              {/* Background Pattern with Animation */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32 animate-pulse"></div>
                <div
                  className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  {/* Left Side - Main Info */}
                  <div className="flex-1">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 transition-transform duration-300 hover:scale-110">
                      <DollarSign
                        className="w-7 h-7 text-white animate-pulse"
                        strokeWidth={2.5}
                      />
                    </div>

                    {/* Label */}
                    <p className="text-white/90 text-sm font-medium mb-2 tracking-wide">
                      Total Earnings
                    </p>

                    {/* Amount with Animation */}
                    <h2 className="text-white text-4xl font-bold mb-3 transition-all duration-300 hover:scale-105">
                      ৳ {paymentAmount?.totalAmount}
                    </h2>

                    {/* Increase Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/30">
                      <TrendingUp className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-normal md:font-semibold">
                        23% increase this month
                      </span>
                    </div>
                  </div>

                  {/* Right Side - Stats */}
                  <div className="flex flex-col gap-3 ml-6">
                    {/* Total Transactions */}

                    <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[160px] flex items-center gap-3 transition-all duration-300 hover:bg-white/25">
                      {/* Icon */}
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg">
                        <Wallet className="w-5 h-5 text-white" />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <p className="text-white/80 text-xs font-medium mb-1">
                          Total Payments Customer
                        </p>
                        <p className="text-white text-2xl font-bold">
                          {paymentAmount?.totalPayment}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[160px] flex items-center gap-3 transition-all duration-300 hover:bg-white/25">
                      {/* Icon */}
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg">
                        <Users className="w-5 h-5 text-white" strokeWidth={2} />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <p className="text-white/80 text-xs font-medium mb-1">
                          Active Users
                        </p>
                        <p className="text-white text-2xl font-bold">
                          {paymentAmount?.totalUsers}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats Row */}
                <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/20">
                  <div className="text-center">
                    <p className="text-white/70 text-xs mb-1">Total Books</p>
                    <p className="text-white text-lg font-bold">
                      {paymentAmount?.totalBooks}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 text-xs mb-1">
                      Total Orders Books
                    </p>
                    <p className="text-white text-lg font-bold">
                      {paymentAmount?.totalOrders}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 text-xs mb-1">
                      This Month Sell Amount
                    </p>
                    <p className="text-white text-lg font-bold">
                      ৳ {paymentAmount?.totalAmount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements with Animation */}
              <div
                className="absolute bottom-4 right-4 w-24 h-24 border-4 border-white/10 rounded-full animate-spin"
                style={{ animationDuration: "8s" }}
              ></div>
              <div
                className="absolute top-1/2 right-8 w-2 h-2 bg-white/30 rounded-full animate-bounce"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute top-1/3 right-16 w-3 h-3 bg-white/20 rounded-full animate-bounce"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col h-full">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
              Recent Activity User
            </h2>
            <div className="space-y-2 sm:space-y-3 flex-1 overflow-y-auto">
              {collections?.map((item, index) => {
                let activity = {};

                if (item.type === "latestUser") {
                  activity = {
                    icon: Users,
                    text: `New user Names : ${item.displayName}`,
                    time: "Just now",
                    color: "text-blue-600",
                  };
                } else if (item.type === "latestBook") {
                  activity = {
                    icon: BookOpen,
                    text: `New book added name  : "${item.title}"`,
                    time: "Just now",
                    color: "text-green-600",
                  };
                } else if (item.type === "latestDeliveredOrder") {
                  activity = {
                    icon: CheckCircle,
                    text: `Delivery completed Order ID : #${item.order?._id}`,
                    time: "Just now",
                    color: "text-emerald-600",
                  };
                } else if (item.type === "latestPayment") {
                  activity = {
                    icon: DollarSign,
                    text: `Last Payment received: ৳${
                      item.payment?.amount || 0
                    }`,
                    time: "Just now",
                    color: "text-yellow-500",
                  };
                }

                return (
                  <div
                    key={index}
                    className="flex items-center p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <activity.icon
                      className={`${activity.color} w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-xs sm:text-sm font-medium truncate">
                        {activity.text}
                      </p>
                    </div>
                    <span className="text-gray-400 text-xs ml-2 flex-shrink-0">
                      {activity.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Status Pie */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col h-full">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
              Delivery or Pending All Books
            </h2>
            <div className="w-full flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ status, value }) => `${status}: ${value}`}
                  >
                    {deliveryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
      </div>
    </div>
  );
};

export default AdminDashboard;
