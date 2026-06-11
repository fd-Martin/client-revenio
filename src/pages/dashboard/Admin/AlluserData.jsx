import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../shared/LoadingSpinner ";
import TextType from "../../../utils/TextType";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { ShieldUser } from "lucide-react";
import { GiBookAura } from "react-icons/gi";
import { FaUserCheck } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const AlluserData = () => {
  const axioSecure = useAxiosSecure();
  const { user } = useAuth();
  // Pasitionse

  const [page, setPage] = useState(1);
  const [allUser, setAllUser] = useState(0);
  const limit = 10;
  const skip = (page - 1) * limit;
  const totalPage = Math.ceil(allUser / limit);

  const {
    data: users,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["admin", page],
    queryFn: async () => {
      const res = await axioSecure.get(
        `alluser-data?email=${user?.email}&limit=${limit}&skip=${skip}`,
      );
      // console.log(res.data);
      setAllUser(res.data.counts);
      return res?.data?.result || [];
    },
  });

  const handelDeletNow = (id) => {
    Swal.fire({
      title: "Confirm  Deletion This User",
      text: `Are you sure you want to delete this User? This action cannot be undone.`,
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
          "bg-red-500 ml-4 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl",
      },

      buttonsStyling: false,
      backdrop: `rgba(0,0,0,0.45)`,
    }).then((result) => {
      if (result.isConfirmed) {
        axioSecure
          .delete(`userDelete/${id}`)
          .then((res) => {
            refetch();
            toast.success("Delet Now");
          })
          .catch((err) => {
            toast.warning(err?.code);
          });
        Swal.fire({
          icon: "success",
          title: "User Successfully Deleted",
          text: "This User has been Deletd Proprely .",
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

  const handelUpdetRole = async (role, id) => {
    const res = await axioSecure.patch(`ubdetRoles/${id}`, {
      role: role,
    });
    if (res.data.acknowledged) {
      toast.success(`Ubdet Role in ${role}`);
      refetch();
    }
    // console.log(res.data);
  };

  const handleMakeAdmin = (id) => {
    // console.log(id);
    handelUpdetRole("admin", id);
  };

  const userHandelNow = (id) => {
    // console.log(id);
    handelUpdetRole("user", id);
  };

  const handleMakeUser = (id) => {
    // console.log(id);
    handelUpdetRole("librarian", id);
  };

  // console.log(allUser);

  if (isFetching || isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <h1 className=" text-2xl md:text-3xl leading-tight text-primary font-semibold">
        <TextType
          text={`Rigester Total User `}
          typingSpeed={70}
          deletingSpeed={40}
          pauseDuration={2000}
          loop={false}
          showCursor={false}
        />
        ({allUser})
      </h1>

      <div className=" px-6">
        <div className=" overflow-x-auto mt-10  rounded-box border border-base-300  shadow bg-base-100">
          <table className="table  ">
            <thead className=" bg-base-300">
              <tr>
                <th className="p-4">Srl</th>
                <th className="p-4">User Image</th>
                <th className="p-4">User Name </th>
                <th className="p-4">User Email</th>
                <th className="p-4">Creat Time</th>
                <th className="p-4">User Status</th>
                <th className="p-4">Admin Actions</th>
                <th className="p-4">Delete User</th>
              </tr>
            </thead>

            <tbody>
              {users.map((item, i) => (
                <tr key={i} className="hover:bg-base-200">
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={item?.photoURL}
                      className="w-15 h-15 border border-base-300 rounded-full"
                      alt="user"
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-[13px] md:text-[16px]">
                      {item.displayName}
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-2 text-[13px] md:text-[16px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 "
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <span className=" font-semibold">{item.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-orange-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {new Date(item.crestAt).toLocaleString()}
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
  text-sm font-semibold capitalize
  ${
    item.role === "admin"
      ? "bg-purple-100 text-purple-700"
      : item.role === "librarian"
        ? "bg-blue-100 text-blue-700"
        : item.role === "user"
          ? "bg-orange-100 text-orange-700"
          : "bg-gray-100 text-gray-600"
  }`}
                      >
                        {/* Role Icon */}
                        {item.role === "admin" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="M9 12l2 2 4-4" />
                          </svg>
                        )}

                        {item.role === "librarian" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M4 19h16" />
                            <path d="M4 5h16v14H4z" />
                            <path d="M9 9h6" />
                          </svg>
                        )}

                        {item.role === "user" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        )}

                        {item.role}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      {/* Make Admin */}
                      <button
                        onClick={() => handleMakeAdmin(item._id)}
                        title="Promote to Admin"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium 
               bg-purple-100 text-purple-700 rounded-lg
               hover:bg-purple-200 transition
               border border-purple-200"
                      >
                        <ShieldUser className="w-4 h-4" />
                        Admin
                      </button>

                      {/* Make User */}
                      {item.role === "librarian" ? (
                        <button
                          onClick={() => userHandelNow(item._id)}
                          title="Promote to Admin"
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium 
               bg-orange-100 text-orange-700
               hover:bg-orange-200 transition rounded-lg
               border border-orange-200"
                        >
                          <FaUserCheck className="w-4 h-4" />
                          User
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMakeUser(item._id)}
                          title="Remove Admin Access"
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium 
               bg-blue-100 text-blue-700 rounded-lg
               hover:bg-blue-200 transition
               border border-gray-200"
                        >
                          <GiBookAura className="w-4 h-4" />
                          Librarian
                        </button>
                      )}
                    </div>
                  </td>
                  <td>
                    {/* Delete Button */}
                    <button
                      onClick={() => handelDeletNow(item._id)}
                      className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition duration-300"
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

export default AlluserData;
