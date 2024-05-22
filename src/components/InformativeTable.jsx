import React, { Fragment } from "react";

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
