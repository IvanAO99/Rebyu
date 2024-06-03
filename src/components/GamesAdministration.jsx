import React from "react";

import { Outlet } from "react-router-dom";

/**
 * Componente GamesAdministration
 *
 * Este componente sirve como contenedor para la administración de juegos. Renderiza el componente Outlet de react-router-dom
 * para renderizar el contenido específico de la administración de juegos definido en las rutas anidadas.
 *
 */

const GamesAdministration = () => {
  return (
    <>
      <div className="flex-grow flex flex-col">{<Outlet />}</div>
    </>
  );
};

export default GamesAdministration;
