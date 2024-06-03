import React, { Fragment } from "react";

import { FaPlus } from "react-icons/fa6";

import useLists from "../hooks/useLists.js";

import ActiveListForm from "./ActiveListForm.jsx";
import List from "./List.jsx";

import { validateArray } from "../libraries/validateData.js";

/**
 * Componente Lists
 *
 * Este componente muestra una lista de listas de juegos.
 * Permite al usuario ver todas sus listas de juegos y crear nuevas listas.
 * Utiliza el hook useLists para manejar la lógica relacionada con las listas de juegos.
 *
 */
const Lists = () => {
  const { userLists, showListFormModal } = useLists();

  return (
    <Fragment>
      <div id="lists">
        <div className="flex flex-row justify-between sm:justify-stretch items-center gap-5 py-2">
          <h2 className="text-6xl font-bold">LISTS</h2>
          <button
            type="button"
            className="rounded-full bg-purple-600 hover:bg-purple-400 text-gray-50 p-2 transition-all duration-300"
            onClick={() => {
              showListFormModal(false);
            }}
          >
            <FaPlus size={24} />
          </button>
          <div className="hidden sm:block flex-grow border-y-2 border-purple-600"></div>
        </div>
        <ActiveListForm />
        <div className="shadow m-5 overflow-hidden rounded-3xl">
          {validateArray(userLists) ? (
            userLists.map((list, index) => (
              <Fragment key={index}>
                <List list={list} />
              </Fragment>
            ))
          ) : (
            <p>Lists not found</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Lists;
