import React, { Fragment } from "react";

/**
 * Componente GameVideo
 *
 * Este componente envuelve un video de juego y aplica estilos de diseño.
 *
 * Props:
 * @param {ReactNode} children - Los elementos hijos del componente.
 *
 */
const GameVideo = ({ children }) => {
  return (
    <Fragment>
      <div className="w-full xl:w-3/4 h-[560px] overflow-hidden rounded-3xl shadow">
        {children}
      </div>
    </Fragment>
  );
};

export default GameVideo;
