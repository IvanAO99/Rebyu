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
import ActiveListForm from "../components/ActiveListForm.jsx";
import useUsers from "../hooks/useUsers.js";
import NewGames from "../components/NewGames.jsx";

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
