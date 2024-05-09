import { useContext } from "react";

import { ReviewsContext } from "../contexts/ReviewsProvider";

/**
 * A custom React hook for accessing the ReviewsContext.
 * @returns {Object} The ReviewsContext object.
 */
const useReviews = () => {
  const reviewsContext = useContext(ReviewsContext);
  return reviewsContext;
};

export default useReviews;