import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import useReviews from "../../../hooks/useReviews.js";

import ReviewForm from "../../ReviewForm/ReviewForm.jsx";

/**
 * A React component for rendering a modal containing a review form.
 * @function ReviewFormModal
 * @param {object} props - The properties of the ReviewFormModal component.
 * @param {boolean} props.isOpen - Flag indicating whether the modal is open or not.
 * @returns {JSX.Element} The rendered component.
 */
const ReviewFormModal = ({ isOpen }) => {
  const { hideReviewFormModal, updatingReview, handleReviewSubmit } =
    useReviews();

  return ReactDOM.createPortal(
    <Fragment>
      {/* Modal for adding/updating a review */}
      <Modal
        show={isOpen}
        backdrop="static"
        keyboard={false}
        centered
        onHide={() => hideReviewFormModal()}
      >
        <Modal.Header closeButton>
          {/* Modal title based on whether it's an update or addition */}
          <Modal.Title>
            {updatingReview ? "UPDATE REVIEW" : "ADD REVIEW"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            {/* Review form component */}
            <ReviewForm />
          </div>
        </Modal.Body>

        <Modal.Footer>
          {/* Cancel button */}
          <Button variant="secondary" onClick={() => hideReviewFormModal()}>
            Cancel
          </Button>
          {/* Update or Create button based on the context */}
          {updatingReview ? (
            <Button
              variant="primary"
              onClick={() => handleReviewSubmit("update")}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => handleReviewSubmit("create")}
            >
              Create
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Fragment>,
    document.getElementById("modal-root")
  );
};

export default ReviewFormModal;
