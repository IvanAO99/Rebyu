import React from "react";
import ReviewsFilter from "./ReviewsFilter";
import Reviews from "./Reviews";
import useReviews from "../hooks/useReviews";

function ReviewAdministration() {
  const { handleFilter, filteredByUserAndMessage } = useReviews();
  const handleSearchChange = (event) => {
    handleFilter(event.target.value);
  };

  return (
    <div>
        {/* Esto hay que ponerlo más bonico, pero al menos va */}
      <input
        type="text"
        placeholder="Search for a user or a message..."
        onChange={handleSearchChange}
      />
      <ReviewsFilter />
      <Reviews reviews={filteredByUserAndMessage} />
    </div>
  );
}

export default ReviewAdministration;
