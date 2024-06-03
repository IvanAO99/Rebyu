import React from "react";

import { FaX } from "react-icons/fa6";

/**
 * Componente AlertCloseIcon
 *
 * Este componente representa un icono de cierre personalizado para las notificaciones emergentes. Utiliza el
 * icono FaX de la biblioteca react-icons/fa6 y se activa al hacer clic para cerrar la notificación asociada.
 *
 * Props:
 * @param {Function} closeToast - Función para cerrar la notificación asociada.
 *
 */
const AlertCloseIcon = ({ closeToast }) => {
  return (
    <>
      <button
        type="button"
        className="hover:shadow rounded-full hover:bg-gray-200 hover:dark:bg-gray-900 p-2 text-gray-900 dark:text-gray-50 transition-all duration-300"
        onClick={() => closeToast()}
      >
        <FaX size={24} />
      </button>
    </>
  );
};

export default AlertCloseIcon;
