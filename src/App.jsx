import React from "react";
import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import RouterComponent from "./routes/RouterComponent";
import Header from "./structure/Header";
import Footer from "./structure/Footer";
import DecorativeCounter from "./components/DecorativeCounter";
import AboutUs from "./components/AboutUs";
import RegistrationForm from "./components/RegistrationForm";
import AffiliateForm from "./components/AffiliateForm";
import LogInForm from "./components/LogInForm";

function App() {
  return (
    <Fragment>
      <Header />
      <LogInForm />
      <AffiliateForm />
      <RegistrationForm />
      <AboutUs />
      <DecorativeCounter />
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
      <Footer />
    </Fragment>
  );
}

export default App;
