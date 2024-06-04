import React from "react";

import Modal from "react-modal";

Modal.setAppElement("#modal-root");

/**
 * CustomModal Component
 *
 * This component represents a custom modal using the react-modal library.
 * It sets the root element of the application for the modal and provides
 * custom styles for the overlay and modal content. The modal can be open
 * or closed depending on the value of the isOpen prop.
 *
 * Props:
 * @param {boolean} isOpen - Indicates whether the modal is open or closed.
 * @param {ReactNode} children - Modal content.
 *
 */
const CustomModal = ({ children, isOpen }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgb(3 7 18 / 0.5)",
            zIndex: 999,
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            border: "none",
            background: "none",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;
