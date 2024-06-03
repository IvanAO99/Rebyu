import React, { Fragment } from "react";

/**
 * Componente InformativeTable
 *
 * Este componente muestra una tabla informativa con los datos proporcionados en el objeto.
 *
 * Props:
 * @param {object} object - Objeto que contiene los datos a mostrar en la tabla.
 */

const InformativeTable = ({ object }) => {
  return (
    <>
      <div className="flex flex-row justify-center items-center p-5">
        <table className="">
          <tbody className="text-center">
            {Object.entries(object).map(([key, value]) => (
              <Fragment key={key}>
                <tr className="">
                  <td className="p-2 uppercase text-right text-xl font-bold text-purple-600">
                    {key.split("_").join(" ")}
                  </td>
                  <td className="p-2">{value}</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InformativeTable;
