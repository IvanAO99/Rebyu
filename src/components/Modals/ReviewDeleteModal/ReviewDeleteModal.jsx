import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import useReviews from "../../../hooks/useReviews.js";

const ReviewDeleteModal = ({ isOpen }) => {
  const { reviewForm, hideReviewDeleteModal, handleReviewSubmit } =
    useReviews();

  return ReactDOM.createPortal(
    <Fragment>
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
            <p>Are you sure you want to DELETE this review?</p>
            <p>{reviewForm.id}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => hideReviewDeleteModal()}>
            Cancel
          </Button>
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
