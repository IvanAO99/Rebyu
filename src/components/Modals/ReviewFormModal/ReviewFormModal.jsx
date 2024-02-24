import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import useReviews from "../../../hooks/useReviews.js";

import ReviewForm from "../../ReviewForm/ReviewForm.jsx";

const ReviewFormModal = ({ isOpen }) => {
  const { hideReviewFormModal, updatingReview, handleReviewSubmit } =
    useReviews();

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
          <Modal.Title>
            {updatingReview ? "UPDATE REVIEW" : "ADD REVIEW"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <ReviewForm />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => hideReviewFormModal()}>
            Cancel
          </Button>
          {updatingReview ? (
            <Fragment>
              <Button
                variant="primary"
                onClick={() => handleReviewSubmit("update")}
              >
                Update
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                variant="primary"
                onClick={() => handleReviewSubmit("create")}
              >
                Create
              </Button>
            </Fragment>
          )}
        </Modal.Footer>
      </Modal>
    </Fragment>,
    document.getElementById("modal-root")
  );
};

export default ReviewFormModal;
