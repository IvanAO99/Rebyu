import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Modal from "react-bootstrap/Modal";

const MessageModal = ({ isOpen }) => {
  return ReactDOM.createPortal(
    <Fragment>
      <Modal show={isOpen} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Confirm your email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please check your email inbox to validate your email and confirm your
          Sign Up.
        </Modal.Body>
      </Modal>
    </Fragment>,
    document.getElementById("modal-root")
  );
};

export default MessageModal;
