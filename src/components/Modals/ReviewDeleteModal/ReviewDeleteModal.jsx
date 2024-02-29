import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import useReviews from "../../../hooks/useReviews.js";

/**
 * A React component for rendering a modal to confirm the deletion of a review.
 * @function ReviewDeleteModal
 * @param {object} props - The properties of the ReviewDeleteModal component.
 * @param {boolean} props.isOpen - Flag indicating whether the modal is open or not.
 * @returns {JSX.Element} The rendered component.
 */
const ReviewDeleteModal = ({ isOpen }) => {
  const { reviewForm, hideReviewDeleteModal, handleReviewSubmit } =
    useReviews();

  return ReactDOM.createPortal(
    <Fragment>
      {/* Modal for confirming review deletion */}
      <Modal
        show={isOpen}
        backdrop="static"
        keyboard={false}
        centered
        onHide={() => hideReviewDeleteModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>DELETE REVIEW</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* Confirmation message with review ID */}
            <p>Are you sure you want to DELETE this review?</p>
            <p>{reviewForm.id}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* Cancel button */}
          <Button variant="secondary" onClick={() => hideReviewDeleteModal()}>
            Cancel
          </Button>
          {/* Delete button */}
          <Button variant="danger" onClick={() => handleReviewSubmit("delete")}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>,
    document.getElementById("modal-root")
  );
};

export default ReviewDeleteModal;
