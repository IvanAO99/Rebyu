import { useContext } from "react";

import { ReviewsContext } from "../contexts/ReviewsProvider";

/**
 * Hook useReviews
 *
 * Este hook permite acceder al contexto proporcionado por ReviewsProvider.
 * Proporciona acceso a los estados y funciones relacionadas con las reseñas.
 *
 */
const useReviews = () => {
  const reviewsContext = useContext(ReviewsContext);
  return reviewsContext;
};

export default useReviews;
