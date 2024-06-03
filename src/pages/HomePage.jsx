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
