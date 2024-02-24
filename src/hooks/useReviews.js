import { useContext } from "react";
import { ReviewsContext } from "../contexts/ReviewsProvider";

const useReviews = () => {
  const reviewsContext = useContext(ReviewsContext);
  return reviewsContext;
};

export default useReviews;
