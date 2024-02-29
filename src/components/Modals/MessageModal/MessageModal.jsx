import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Modal from "react-bootstrap/Modal";

/**
 * A React component for rendering a message modal.
 * @function MessageModal
 * @param {object} props - The properties of the MessageModal component.
 * @param {boolean} props.isOpen - Flag indicating whether the modal is open or not.
 * @returns {JSX.Element} The rendered component.
 */
const MessageModal = ({ isOpen }) => {
  return ReactDOM.createPortal(
    <Fragment>
      {/* Modal for displaying a message */}
      <Modal show={isOpen} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Confirm your email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Message content in the body of the modal */}
          Please check your email inbox to validate your email and confirm your
          Sign Up.
        </Modal.Body>
      </Modal>
    </Fragment>,
    document.getElementById("modal-root")
  );
};

export default MessageModal;
