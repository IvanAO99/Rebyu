import React from "react";
import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import RouterComponent from "./routes/RouterComponent";
import Header from "./structure/Header";
import Footer from "./structure/Footer";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <RouterComponent />
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
