import React from "react";

import { FaCheck } from "react-icons/fa6";
import { FaExclamation } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa6";

/**
 * Componente AlertIcon
 *
 * Este componente representa un icono para las notificaciones emergentes. Puede mostrar diferentes iconos
 * según el tipo de notificación (éxito, error o información). Utiliza iconos de la biblioteca react-icons/fa6
 * (FaCheck, FaExclamation y FaInfo) y aplica estilos de acuerdo al tipo de notificación.
 *
 * Props:
 * @param {string} theme - Tema de la notificación (success, error, info).
 * @param {string} type - Tipo de icono a mostrar (success, error, info).
 *
 */
const AlertIcon = ({ theme, type }) => {
  return (
    <>
      {type === "success" ? (
        <>
          <button
            type="button"
            className="shadow rounded-full bg-purple-600 p-2 text-gray-50 transition-all duration-300"
          >
            <FaCheck size={24} />
          </button>
        </>
      ) : type === "error" ? (
        <>
          <button
            type="button"
            className="shadow rounded-full bg-red-600 p-2 text-gray-50 transition-all duration-300"
          >
            <FaExclamation size={24} />
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="shadow rounded-full bg-purple-600 p-2 text-gray-50 transition-all duration-300"
          >
            <FaInfo size={24} />
          </button>
        </>
      )}
    </>
  );
};

export default AlertIcon;
