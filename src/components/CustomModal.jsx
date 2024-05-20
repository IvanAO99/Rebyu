import React from "react";
import Modal from "react-modal";
import { FaX } from "react-icons/fa6";

const CustomModal = ({ children, isOpen = true }) => {
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
        <div className="rounded-3xl bg-gray-50 dark:bg-gray-700 shadow">
          <div className="flex flex-row justify-between items-center px-5 py-2">
            <h2 className="text-6xl font-bold">MODAL HEADER</h2>
            <button type="button" className="text-gray-900 dark:text-gray-50">
              <FaX size={24} />
            </button>
          </div>
          <div>{children}</div>
        </div>
      </Modal>
    </>
  );
};

export default CustomModal;
