import React, { Fragment } from "react";

import DecorativeCounter from "../components/DecorativeCounter";
import AboutUs from "../components/AboutUs";
import Game from "../components/Game.jsx";
import Review from "../components/Review.jsx";
import GamesFilters from "../components/GameFilters.jsx";
import Games from "../components/Games.jsx";

const HomePage = () => {
  return (
    <Fragment>
      <div>
        <Games />
        <AboutUs />
        <DecorativeCounter />
      </div>
    </Fragment>
  );
};

export default HomePage;
