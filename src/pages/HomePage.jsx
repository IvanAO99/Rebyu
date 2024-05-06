import React, { Fragment } from "react";

import Game from "../components/Game.jsx";
import Review from "../components/Review.jsx";

const HomePage = () => {
  return (
    <Fragment>
      <div>HomePage</div>
      <Game />
      <Review />
    </Fragment>
  );
};

export default HomePage;
