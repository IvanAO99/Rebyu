"use strict";

/**
 * Function that validates if an array exists and has elements.
 *
 * @param {Array} array - The array to be validated.
 *
 * @returns {boolean} true if the array exists and has elements, false otherwise.
 */
const validateArray = (array) => {
  return Array.isArray(array) && array.length > 0;
};

/**
 * Function that validates if an object exists and has properties.
 *
 * @param {Object} object - The object to be validated.
 *
 * @returns {boolean} true if the object exists and has properties, false otherwise.
 */
const validateObject = (object) => {
  return Object.keys(object).length > 0;
};

/**
 * Checks if the given URL is valid.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - True if the URL is valid, otherwise false.
 */
const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export { validateArray, validateObject, isValidURL };
