import React from "react";

import useReviews from "../hooks/useReviews.js";

import ReviewsFilter from "./ReviewsFilter.jsx";
import Reviews from "./Reviews.jsx";

/**
 * Component ReviewAdministration
 *
 * This component is responsible for managing user reviews.
 * It allows filtering reviews by user and message and displaying them in the interface.
 * It also provides search functionality to look for specific reviews.
 *
 */
function ReviewAdministration() {
  const { handleFilter, isLoadingReviews, filteredByUserAndMessage } =
    useReviews();

  const handleSearchChange = (event) => {
    handleFilter(event.target.value);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search for a user or a message..."
        className="shadow ml-5 rounded-3xl border-none focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-100 dark:bg-gray-800 px-5 py-2 caret-purple-600"
        onChange={(event) => handleSearchChange(event)}
      />
      <ReviewsFilter />
      <Reviews loading={isLoadingReviews} reviews={filteredByUserAndMessage} />
    </div>
  );
}

export default ReviewAdministration;
