import React, { Fragment } from "react";

import Form from "react-bootstrap/Form";

import { FaStar } from "react-icons/fa";

import useReviews from "../../hooks/useReviews.js";

/**
 * Functional component representing the form for submitting reviews.
 *
 * @returns {JSX.Element} The JSX element for the review submission form.
 */
const ReviewForm = () => {
  // Custom hook to access review-related state and functions
  const { reviewForm, reviewFormErrors, updateReviewForm } = useReviews();

  return (
    <Fragment>
      {/* Review submission form using React Bootstrap Form */}
      <Form className="d-flex flex-column">
        {/* Form group for rating stars */}
        <Form.Group className="mb-3" controlId="stars">
          <Form.Label>Score</Form.Label>
          <div className="stars">
            {/* Render star icons based on the selected score */}
            {[...Array(5)].map((star, i) => {
              return (
                <FaStar
                  key={i}
                  color={i + 1 <= reviewForm.score ? "#ffc107" : "#e4e5e9"}
                  size={50}
                />
              );
            })}
          </div>
          {/* Range input for selecting the score */}
          <Form.Range
            name="score"
            value={reviewForm.score || 0}
            min={0}
            max={5}
            onChange={(event) => {
              updateReviewForm(event.target);
            }}
          />
        </Form.Group>
        {/* Form group for review message */}
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          {/* Textarea input for writing the review message */}
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
          {/* Display validation error message if present */}
          <Form.Control.Feedback type="invalid">
            {reviewFormErrors.message}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Form group for spoiler checkbox */}
        <Form.Group className="mb-3" controlId="spoiler">
          {/* Checkbox for indicating if the review contains spoilers */}
          <Form.Check
            name="spoiler"
            type="checkbox"
            label="Check if the review has spoilers"
            value={"true"}
            checked={reviewForm.spoiler === "true"}
            onChange={(event) => {
              updateReviewForm(event.target);
            }}
          />
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default ReviewForm;
