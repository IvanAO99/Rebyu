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
 * Home Page
 *
 * This page represents the main page of the application.
 * It displays a variety of components, including the latest games,
 * featured games, latest reviews, company information, etc.
 * Depending on whether there is an active session,
 * it may also show a form to add games to the user's active list.
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
