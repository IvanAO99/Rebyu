import React, { Fragment } from "react";

import useReviews from "../hooks/useReviews.js";

import Loading from "./Loading.jsx";
import Review from "./Review.jsx";

import { validateArray } from "../libraries/validateData.js";

const Reviews = () => {
  const { isLoadingReviews, reviewsWithLikes } = useReviews();
  return (
    <>
      <div>
        {isLoadingReviews ? (
          <>
            <div className="flex flex-col justify-center items-center px-5 py-2">
              <Loading />
              <p className="px-5 py-2 text-purple-800 font-bold">
                Loading reviews...
              </p>
            </div>
          </>
        ) : validateArray(reviewsWithLikes) ? (
          <>
            <div className="flex flex-col items-center gap-5">
              {reviewsWithLikes.map((review) => (
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
