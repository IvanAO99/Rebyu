import React, { useState } from "react";
import useReviews from "../hooks/useReviews";

const ReviewsFilter = () => {
  const initialActiveOption = "all";

  const [activeOption, setActiveOption] = useState(initialActiveOption);

  const { filterReviews } = useReviews();

  const handleClick = (filterType) => {
    filterReviews(filterType);
  };

  return (
    <>
      <div
        className="flex flex-row justify-center items-center gap-5 mt-2 border-b-2 border-gray-200 px-5 pb-5 text-lg"
        onClick={(event) => {
          setActiveOption(event.target.id);
          handleClick(event.target.id);
        }}
      >
        <button type="button"></button>
        <button
          type="button"
          id="all"
          className={`border-b-2 px-5 py-2 ${
            activeOption === "all"
              ? "border-purple-600 text-gray-900 dark:text-gray-50"
              : "border-transparent hover:border-purple-600 text-gray-900/50 hover:text-gray-900 dark:text-gray-50/50 hover:dark:text-gray-50"
          } transition-all`}
        >
          All Reviews
        </button>
        <button
          type="button"
          id="positive"
          className={`border-b-2 px-5 py-2 ${
            activeOption === "positive"
              ? "border-purple-600 text-gray-900 dark:text-gray-50"
              : "border-transparent hover:border-purple-600 text-gray-900/50 hover:text-gray-900 dark:text-gray-50/50 hover:dark:text-gray-50"
          } transition-all`}
        >
          Positive Reviews
        </button>
        <button
          type="button"
          id="negative"
          className={`border-b-2 px-5 py-2 ${
            activeOption === "negative"
              ? "border-purple-600 text-gray-900 dark:text-gray-50"
              : "border-transparent hover:border-purple-600 text-gray-900/50 hover:text-gray-900 dark:text-gray-50/50 hover:dark:text-gray-50"
          } transition-all`}
        >
          Negative Reviews
        </button>
      </div>
    </>
  );
};

export default ReviewsFilter;
