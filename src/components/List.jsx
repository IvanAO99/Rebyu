import React, { Fragment, useState } from "react";
import { FaAngleDown, FaAngleRight, FaPen, FaTrash } from "react-icons/fa6";
import Game from "./Game";

const List = () => {
  const [isOpen, setIsOpen] = useState(false);

  const games = [1, 2, 3, 4, 5];

  return (
    <Fragment>
      <div className="[&:not(:last-child)]:border-b-2">
        <div
          className="flex flex-row justify-between items-center px-5 py-2 hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-row justify-start items-center gap-5">
            {isOpen ? <FaAngleDown size={24} /> : <FaAngleRight size={24} />}
            <h3>TITLE</h3>
          </div>
          <div>
            <button type="button" className="mr-5 text-purple-800">
              <FaPen size={24} />
            </button>
            <button type="button" className="text-red-600">
              <FaTrash size={24} />
            </button>
          </div>
        </div>
        <div className={`${isOpen ? "block" : "hidden"} border-t-2 px-5 py-2`}>
          <div className="grid grid-cols-4">
            {games.map((game, index) => (
              <Fragment key={index}>
                <Game />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default List;
