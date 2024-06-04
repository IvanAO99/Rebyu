import { useContext } from "react";

import { ReviewsContext } from "../contexts/ReviewsProvider";

/**
 * Hook useReviews
 *
 * This hook allows access to the context provided by ReviewsProvider.
 * It provides access to the states and functions related to reviews.
 *
 */
const useReviews = () => {
  const reviewsContext = useContext(ReviewsContext);
  return reviewsContext;
};

export default useReviews;
