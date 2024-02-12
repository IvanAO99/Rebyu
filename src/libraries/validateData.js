"use strict";

/**
 * Función que valida si un array existe y tiene elementos.
 *
 * @param {Array} array - El array que se va a validar.
 *
 * @returns {boolean} true si el array existe y tiene elementos, false en caso contrario.
 */
const validateArray = (array) => {
  return Array.isArray(array) && array.length;
};

const validateObject = (object) => {
  return Object.keys(object).length;
};

export { validateArray, validateObject };
