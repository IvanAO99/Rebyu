import React, { Fragment } from "react";

import DecorativeCounter from "../components/DecorativeCounter";
import AboutUs from "../components/AboutUs";
import Game from "../components/Game.jsx";
import Review from "../components/Review.jsx";
import GamesFilters from "../components/GameFilters.jsx";
import Games from "../components/Games.jsx";
import TopGames from "../components/TopGames.jsx";
import LatestReviews from "../components/LatestReviews.jsx";
import LatestGames from "../components/LatestGames.jsx";

const HomePage = () => {
  return (
    <Fragment>
      <div>
        <LatestGames />
        <TopGames />
        <LatestReviews />
        <Games />
        <AboutUs />
        <DecorativeCounter />
      </div>
    </Fragment>
  );
};

export default HomePage;
