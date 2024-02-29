import React, { Fragment } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import useReviews from "../../hooks/useReviews.js";

import Loading from "../Loading/Loading.jsx";
import Review from "../Review/Review.jsx";

import { validateArray } from "../../libraries/validateData.js";

/**
 * Functional component representing the list of reviews.
 *
 * @returns {JSX.Element} The JSX element for the list of reviews.
 */
const Reviews = () => {
  // Custom hook to access review-related state and functions
  const { isLoadingReviews, reviews } = useReviews();

  return (
    <Fragment>
      {/* Row component to organize reviews in a grid */}
      <Row className="g-2">
        {/* Check if reviews are still loading */}
        {isLoadingReviews ? (
          <Fragment>
            {/* Display loading spinner while reviews are loading */}
            <Col>
              <Loading />
            </Col>
          </Fragment>
        ) : (
          <Fragment>
            {/* Check if there are reviews available */}
            {validateArray(reviews) ? (
              // Map through reviews and render Review component for each
              reviews.map((review, index) => {
                return (
                  <Fragment key={index}>
                    <Col xs={12}>
                      {/* Render individual Review component */}
                      <Review review={review} />
                    </Col>
                  </Fragment>
                );
              })
            ) : (
              <Fragment>
                {/* Display error message if there are no reviews */}
                <Col>
                  <p>OOPS...NO REVIEWS HERE</p>
                </Col>
              </Fragment>
            )}
          </Fragment>
        )}
      </Row>
    </Fragment>
  );
};

export default Reviews;
