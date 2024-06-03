import React, { Fragment } from "react";

import Loading from "./Loading.jsx";
import Review from "./Review.jsx";

import { validateArray } from "../libraries/validateData.js";

/**
 * Componente Reviews
 *
 * Este componente muestra una lista de revisiones.
 * Muestra un mensaje de carga mientras se cargan las revisiones,
 * luego muestra las revisiones si están disponibles o un mensaje
 * indicando que no hay revisiones si la lista está vacía.
 *
 * Props:
 *   @param {boolean} loading - Un booleano que indica si se están cargando las revisiones.
 *   @param {Object} reviews - Un array de objetos que representan las revisiones.
 *
 */
const Reviews = ({ loading, reviews }) => {
  return (
    <>
      <div className="p-5">
        {loading ? (
          <>
            <div className="flex flex-col justify-center items-center px-5 py-2">
              <Loading />
              <p className="px-5 py-2 text-purple-600 font-bold">
                Loading reviews...
              </p>
            </div>
          </>
        ) : validateArray(reviews) ? (
          <>
            <div className="flex flex-col items-center gap-5">
              {reviews.map((review) => (
                <Fragment key={review.review_id}>
                  <Review review={review} />
                </Fragment>
              ))}
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-3xl">No reviews yet.</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Reviews;
