import React, { Fragment } from "react";
import useReviews from "../../hooks/useReviews.js";
import Loading from "../Loading/Loading.jsx";
import { validateArray } from "../../libraries/validateData.js";
import ShowObj from "../development/ShowObj.jsx";
import Review from "../Review/Review.jsx";

const Reviews = () => {
  const { isLoadingReviews, reviews } = useReviews();

  return (
    <Fragment>
      <div>
        {isLoadingReviews ? (
          <Fragment>
            <Loading />
          </Fragment>
        ) : (
          <Fragment>
            {validateArray(reviews) ? (
              reviews.map((review, index) => {
                return (
                  <Fragment key={index}>
                    <Review review={review} />
                  </Fragment>
                );
              })
            ) : (
              <Fragment>
                <p>ERROR</p>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Reviews;
