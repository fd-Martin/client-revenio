import React from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "sonner";
import LoadingSpinner from "../../../shared/LoadingSpinner ";
import TextType from "../../../utils/TextType";

export default function WishlistCard() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: wishlist,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["whishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `customeraddyourwhishlist?email=${user?.email}`,
      );
      // console.log(res.data);
      return res.data;
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRemove = (whish) => {
    Swal.fire({
      title: "Confirm Whish List Book Delete",
      text: `Are you sure you want to delete this ${whish?.bookName}? This action cannot be undone.`,
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
          .delete(`deletWhishList/${whish._id}?email=${user?.email}`)
          .then((res) => {
            // task query propley refetch delet data
            refetch();
            // console.log("Propley Delet Now", res);
            // toast.success("Delet Now");
          })
          .catch((err) => {
            toast.warning(err?.code);
          });
        Swal.fire({
          icon: "success",
          title: "Your Whishlist Successfully Deleted",
          text: "Your Whishlist has been Deletd Proprely .",
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen  p-6">
      <div className=" mx-auto">
        <h1 className=" mb-8 text-2xl md:text-3xl leading-tight text-primary font-bold">
          <TextType
            text={`My Wishlist`}
            typingSpeed={70}
            deletingSpeed={40}
            pauseDuration={2000}
            loop={false}
            showCursor={false}
          />
        </h1>
        <h1 className="text-3xl  text-gray-800"></h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {wishlist?.map((whishData) => (
            <div
              key={whishData.bookId}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Book Image */}
              <div className="relative bg-gradient-to-br from-orange-100 to-yellow-100 p-4">
                <div className="absolute top-2 right-2 z-10">
                  <Heart className="w-5 h-5 animate-ping text-red-500 fill-red-500" />
                </div>
                <img
                  src={whishData?.bookImage}
                  className="w-full h-38 object-cover hover:scale-95  hover:transition-all rounded-lg"
                />
              </div>

              {/* Book Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-md font-bold text-gray-800 line-clamp-2 flex-1">
                    {whishData.bookName}
                  </h3>
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold ml-2">
                    {whishData.bookLanguage}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-lg font-bold text-green-600">
                    ৳{whishData.bookPrice}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500 text-xs">Pages</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {whishData.bookPages}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500 text-xs">Weight</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {whishData.bookWeight}g
                    </p>
                  </div>
                </div>

                {/* Wishlister Info */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-2 rounded-lg mb-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={whishData?.wishlisterPhoto}
                      alt={whishData?.wishlisterName}
                      className="w-8 h-8 rounded-full border-2 border-orange-300"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-800 truncate">
                        {whishData?.wishlisterName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(whishData?.wishlistingDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/detlicesPages/${whishData.bookId}`}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25v5.25m0-8.25h.008v.008H11.25V8.25zm9 3.75a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Details Page
                  </Link>
                  <button
                    onClick={() => handleRemove(whishData)}
                    className="bg-gradient-to-br from-orange-400 to-orange-600 text-white px-3 py-2 rounded-lg  transition-colors duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {wishlist?.length === 0 && (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500">
              Start adding books to your wishlist!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
