import React, { Fragment } from "react";
import useReviews from "../../hooks/useReviews.js";
import Loading from "../Loading/Loading.jsx";
import { validateArray } from "../../libraries/validateData.js";
import ShowObj from "../development/ShowObj.jsx";
import Review from "../Review/Review.jsx";
import { Col, Row } from "react-bootstrap";

const Reviews = () => {
  const { isLoadingReviews, reviews } = useReviews();

  return (
    <Fragment>
      <Row className="g-2">
        {isLoadingReviews ? (
          <Fragment>
            <Col>
              <Loading />
            </Col>
          </Fragment>
        ) : (
          <Fragment>
            {validateArray(reviews) ? (
              reviews.map((review, index) => {
                return (
                  <Fragment key={index}>
                    <Col xs={12}>
                      <Review review={review} />
                    </Col>
                  </Fragment>
                );
              })
            ) : (
              <Fragment>
                <Col>
                  <p>ERROR</p>
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
