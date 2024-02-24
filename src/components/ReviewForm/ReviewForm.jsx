import React, { Fragment } from "react";

import Form from "react-bootstrap/Form";

import useReviews from "../../hooks/useReviews.js";

const ReviewForm = () => {
  const { reviewForm, reviewFormErrors, updateReviewForm } = useReviews();

  const gamesID = [
    "f78a3a00-80fd-433f-a51b-855708f0da9f",
    "1cba465e-9aec-4cb7-90c4-59f42e9a3f8c",
    "bab06310-b7a7-4578-ba32-b406835cc908",
    "aeec8a55-5afb-49a7-8b82-ee613c766d17",
    "7fc06e70-9b90-435f-a4c7-63a382018975",
  ];

  return (
    <Fragment>
      <Form className="d-flex flex-column">
        <Form.Group className="mb-3" controlId="gameID">
          <Form.Label>Game ID</Form.Label>
          <Form.Select
            name="game_id"
            defaultValue={reviewForm.game_id || ""}
            onChange={(event) => updateReviewForm(event.target)}
          >
            <option value={""} disabled hidden>
              Select game ID
            </option>
            {gamesID.map((v, i) => {
              return (
                <option key={i} value={v}>
                  {v}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="score">
          <Form.Label>Score</Form.Label>
          <Form.Control
            type="number"
            name="score"
            placeholder="Enter score"
            value={reviewForm.score || ""}
            onChange={(event) => {
              updateReviewForm(event.target);
            }}
            isInvalid={reviewFormErrors.score}
          />
          <Form.Control.Feedback type="invalid">
            {reviewFormErrors.score}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            placeholder="Write a review..."
            value={reviewForm.message || ""}
            onChange={(event) => {
              updateReviewForm(event.target);
            }}
            isInvalid={reviewFormErrors.message}
          />
          <Form.Control.Feedback type="invalid">
            {reviewFormErrors.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="spoiler">
          <Form.Check
            name="spoiler"
            type="checkbox"
            label="Check if the review has spoilers"
            value={"true"}
            checked={reviewForm.spoiler === "true"}
            onChange={(event) => {
              updateReviewForm(event.target);
            }}
            /* isInvalid={signUpFormErrors.terms_services} */
          />
          {/* <Form.Control.Feedback type="invalid">
                {signUpFormErrors.terms_services}
              </Form.Control.Feedback> */}
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default ReviewForm;
