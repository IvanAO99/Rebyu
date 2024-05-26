import React from "react";
import useReviews from "../hooks/useReviews";

const ReviewsFilter = ({ activeOption, setActiveOption }) => {
  const { filterReviews } = useReviews();

  const handleClick = (filterType) => {
    filterReviews(filterType);
  };

  return (
    <div
      className="flex gap-8 text-lg justify-center items-center p-5 border-b border-gray-200"
      onClick={(e) => {
        handleClick(e.target.id);
      }}
    >
      <button
        className={`text-gray-600 dark:text-gray-100 focus:outline-none border-b-2 border-transparent hover:border-purple-600 dark:hover:border-purple-400 ${
          activeOption === "all"
            ? "border-purple-600 dark:border-purple-400"
            : ""
        }`}
        id="all"
      >
        All Reviews
      </button>
      <button
        className={`text-gray-600 dark:text-gray-400 focus:outline-none border-b-2 border-transparent hover:border-purple-600 dark:hover:border-purple-400 ${
          activeOption === "positive"
            ? "border-purple-600 dark:border-purple-400"
            : ""
        }`}
        id="positive"
      >
        Positive Reviews
      </button>
      <button
        className={`text-gray-600 dark:text-gray-400 focus:outline-none border-b-2 border-transparent hover:border-purple-600 dark:hover:border-purple-400 ${
          activeOption === "negative"
            ? "border-purple-600 dark:border-purple-400"
            : ""
        }`}
        id="negative"
      >
        Negative Reviews
      </button>
    </div>
  );
};

export default ReviewsFilter;
