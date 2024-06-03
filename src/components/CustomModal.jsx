import React from "react";

import Modal from "react-modal";

Modal.setAppElement("#modal-root");

/**
 * Componente CustomModal
 *
 * Este componente representa un modal personalizado utilizando la biblioteca react-modal. Configura el elemento
 * raíz de la aplicación para el modal y proporciona estilos personalizados para el overlay y el contenido del
 * modal. El modal puede estar abierto o cerrado según el valor de la prop isOpen.
 *
 * Props:
 * @param {boolean} isOpen - Indica si el modal está abierto o cerrado.
 * @param {ReactNode} children - Contenido del modal.
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
