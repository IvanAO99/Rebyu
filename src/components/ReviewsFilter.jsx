import React, { useState } from "react";

import useReviews from "../hooks/useReviews.js";

/**
 * Component ReviewsFilter
 *
 * This component provides options to filter reviews by type.
 * Filter types include "All Reviews", "Positive Reviews", and "Negative Reviews".
 * Clicking on a filter option activates it and applies the corresponding filter.
 *
 */
const ReviewsFilter = () => {
  const initialActiveOption = "all";

  const { filterReviews } = useReviews();

  const [activeOption, setActiveOption] = useState(initialActiveOption);

  const handleClick = (filterType) => {
    filterReviews(filterType);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div
          className="w-60 lg:w-full flex flex-row justify-center items-center gap-5 mt-2 border-b-2 border-gray-200 px-5 pb-5 text-lg overflow-x-scroll lg:overflow-x-auto"
          onClick={(event) => {
            setActiveOption(event.target.id);
            handleClick(event.target.id);
          }}
        >
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
      </div>
    </>
  );
};

export default ReviewsFilter;
