import React from "react";

const ReviewCard = ({ review }) => {
  // console.log(review);

  return (
    <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-orange-200 hover:scale-105">
      {/* Card Content */}
      <div className="p-4">
        {/* Book Name with Icon - Header */}
        <div className="flex items-start gap-2 mb-4 pb-2 border-b-2 border-amber-200">
          <div className="bg-orange-500 p-2 rounded-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3
              className="font-bold text-base text-gray-800 line-clamp-2 leading-tight"
              title={review?.bookName}
            >
              {review?.bookName}
            </h3>
          </div>
        </div>

        {/* Reviewer Info Section */}
        <div className="bg-white rounded-xl p-4 shadow-inner border border-amber-100 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <img
                src={review?.reviewerPhoto}
                alt={review?.reviewerName}
                className="w-12 h-12 rounded-full border-2 border-orange-400 shadow-lg flex-shrink-0 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-amber-600 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <p className="text-sm font-bold text-gray-800 truncate">
                  {review?.reviewerName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-gray-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-xs text-gray-600 truncate">
                  {review?.reviewerEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Star Rating Display */}
          <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-3">
            <span className="text-xs font-semibold text-gray-700">Rating:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 transition-all ${
                    star <= review?.reviewerRating
                      ? "fill-amber-500 drop-shadow-lg"
                      : "fill-gray-300"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="ml-2 text-sm font-bold text-amber-600">
                {review?.reviewerRating}/5
              </span>
            </div>
          </div>
        </div>

        {/* Review Date */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600 bg-gradient-to-r from-gray-50 to-amber-50 p-2 rounded-lg border border-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-amber-600 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="font-medium">
            Reviewed on{" "}
            {new Date(review?.reviewDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
