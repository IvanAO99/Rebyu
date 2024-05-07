import React, { Fragment } from "react";

import DecorativeCounter from "../components/DecorativeCounter";
import AboutUs from "../components/AboutUs";
import RegistrationForm from "../components/RegistrationForm";
import AffiliateForm from "../components/AffiliateForm";
import LogInForm from "../components/LogInForm";
import Game from "../components/Game.jsx";
import Review from "../components/Review.jsx";

const HomePage = () => {
  return (
    <Fragment>
      <main>
        <LogInForm />
        <AffiliateForm />
        <RegistrationForm />
        <AboutUs />
        <DecorativeCounter />
      </main>
      <Game />
      <Review />
    </Fragment>
  );
};

export default HomePage;
