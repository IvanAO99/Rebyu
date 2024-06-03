import React, { Fragment } from "react";

import useUsers from "../hooks/useUsers.js";

import NewGames from "../components/NewGames.jsx";
import ActiveListForm from "../components/ActiveListForm.jsx";
import Games from "../components/Games.jsx";
import TopGames from "../components/TopGames.jsx";
import LatestGames from "../components/LatestGames.jsx";
import LatestReviews from "../components/LatestReviews.jsx";
import AboutUs from "../components/AboutUs";
import DecorativeCounter from "../components/DecorativeCounter";

/**
 * Página de Inicio
 *
 * Esta página representa la página principal de la aplicación. Muestra una variedad de componentes,
 * incluyendo los juegos más recientes, juegos destacados, últimas revisiones, información sobre la empresa, etc.
 * Dependiendo de si hay una sesión activa, también puede mostrar un formulario para agregar juegos a la lista activa del usuario.
 *
 */

const HomePage = () => {
  const { isSessionUp } = useUsers();

  return (
    <Fragment>
      <div className="flex flex-col gap-5">
        <NewGames />
        {isSessionUp && <ActiveListForm onProfile={false} />}
        <Games />
        <TopGames />
        <LatestGames />
        <LatestReviews />
        <AboutUs />
        <DecorativeCounter />
      </div>
    </Fragment>
  );
};

export default HomePage;
