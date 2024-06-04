import React, { Fragment } from "react";

/**
 * Component InformativeTable
 *
 * This component displays an informative table with the data provided in the object.
 *
 * Props:
 * @param {object} object - Object containing the data to display in the table.
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
