import React, { Fragment } from "react";

import Loading from "./Loading.jsx";
import Review from "./Review.jsx";

import { validateArray } from "../libraries/validateData.js";

/**
 * Component Reviews
 *
 * This component displays a list of reviews.
 * It shows a loading message while the reviews are being loaded,
 * then displays the reviews if available or a message
 * indicating there are no reviews if the list is empty.
 *
 * Props:
 *   @param {boolean} loading - A boolean indicating whether reviews are being loaded.
 *   @param {Object} reviews - An array of objects representing the reviews.
 *
 */
const Reviews = ({ loading, reviews, onGamePage = false }) => {
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
                  <Review review={review} onGamePage={onGamePage} />
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
