import React from "react";
import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import RouterComponent from "./routes/RouterComponent";
import Header from "./structure/Header";
import Footer from "./structure/Footer";
import UsersProvider from "./contexts/UsersProvider";
import GamesProvider from "./contexts/GamesProvider";
import ReviewsProvider from "./contexts/ReviewsProvider";
import Main from "./structure/Main";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <UsersProvider>
          <Header />
          <GamesProvider>
            <ReviewsProvider>
              <Main>
                <RouterComponent />
              </Main>
            </ReviewsProvider>
          </GamesProvider>
        </UsersProvider>
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
