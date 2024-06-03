import React from "react";

import { FaX } from "react-icons/fa6";

/**
 * Componente DeleteModal
 *
 * Este componente representa un modal de eliminación que muestra un título, contenido y botones para confirmar o
 * cancelar la eliminación. Utiliza el icono FaX de la biblioteca react-icons/fa6 para el botón de cierre. Proporciona
 * funciones para ocultar el modal (hideFunction) y realizar la eliminación (deleteFunction).
 *
 * Props:
 * @param {ReactNode} children - Contenido del modal.
 * @param {string} title - Título del modal.
 * @param {Function} hideFunction - Función para ocultar el modal.
 * @param {Function} deleteFunction - Función para realizar la eliminación.
 *
 */
const DeleteModal = ({ children, title, hideFunction, deleteFunction }) => {
  return (
    <>
      <div className="rounded-3xl bg-gray-50 dark:bg-gray-700 p-2 text-gray-900 dark:text-gray-50 shadow">
        <div className="flex flex-row justify-between items-center gap-5 px-5 py-2">
          <h1 className="text-3xl font-bold text-center">{title}</h1>
          <button
            type="button"
            className="rounded-full hover:bg-gray-100 hover:dark:bg-gray-800 p-2 text-gray-900 dark:text-gray-50 hover:shadow transition-all duration-300"
            onClick={() => hideFunction()}
          >
            <FaX size={24} />
          </button>
        </div>
        <div className="border-y-2 border-gray-100 dark:border-gray-800 px-5 py-2 text-center">
          {children}
        </div>
        <div>
          <div className="flex flex-row justify-end items-center gap-5 px-5 py-2">
            <button
              type="button"
              className="rounded-3xl bg-red-600 hover:bg-red-400 px-5 py-2 text-gray-50 shadow transition-all duration-300"
              onClick={() => {
                deleteFunction("delete");
              }}
            >
              Delete
            </button>
            <button
              type="button"
              className="rounded-3xl bg-gray-800 hover:bg-gray-600 px-5 py-2 text-gray-50 shadow transition-all duration-300"
              onClick={() => hideFunction()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
