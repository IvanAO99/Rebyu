import React from "react";

import useReviews from "../hooks/useReviews.js";

import ReviewsFilter from "./ReviewsFilter.jsx";
import Reviews from "./Reviews.jsx";

/**
 * Componente ReviewAdministration
 *
 * Este componente es responsable de administrar las revisiones de los usuarios.
 * Permite filtrar las revisiones por usuario y mensaje y mostrarlas en la interfaz.
 * También proporciona una funcionalidad de búsqueda para buscar revisiones específicas.
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
