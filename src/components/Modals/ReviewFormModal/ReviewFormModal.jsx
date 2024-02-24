import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import useReviews from "../../../hooks/useReviews.js";
import ShowObj from "../../development/ShowObj.jsx";
import useUsers from "../../../hooks/useUsers.js";

const ReviewFormModal = ({ isOpen }) => {
  const {
    reviewForm,
    reviewFormErrors,
    updateReviewForm,
    hideReviewFormModal,
    handleReviewSubmit,
  } = useReviews();

  const gamesID = [
    "e1818b8b-1913-4beb-b72f-a9643fdfe2a4",
    "e57f90b6-6dd6-40cb-bb3d-e993f9b4b078",
  ];

  return ReactDOM.createPortal(
    <Fragment>
      <Modal
        show={isOpen}
        backdrop="static"
        keyboard={false}
        centered
        onHide={() => hideReviewFormModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>NEW REVIEW</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
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
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => hideReviewFormModal()}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleReviewSubmit()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>,
    document.getElementById("modal-root")
  );
};

export default ReviewFormModal;
